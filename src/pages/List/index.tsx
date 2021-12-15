import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

import { Container, Content, Filters } from './style';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth()+1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
  const [selectedFrequency, setSelectedFrequency] = useState<string[]>(['recorrente', 'eventual']);

  const { type } = useParams();

  const pageData = useMemo(() => {
    if (type === 'entry-balance') {
      return {
        title: 'Entradas',
        lineColor: '#4E41F0',
        data: gains
      } 
    } else {
      return {
        title: 'Saídas',
        lineColor: '#E44C4E',
        data: expenses
      }
    }
  }, [type]);
  
  const years = [
    {value: 2021, label: 2021},
    {value: 2020, label: 2020},
    {value: 2019, label: 2019},
    {value: 2018, label: 2018},
  ];

  // const years = useMemo(() => {
  //   let uniqueYears: number[] = [];

  //   listData.forEach(item => {
  //     const date = new Date(item.date);
  //     const year = date.getFullYear();

  //     if (!uniqueYears.includes(year)) {
  //       uniqueYears.push(year);
  //     }

  //     return uniqueYears.map(year => {
  //       return {
  //         value: year,
  //         label: year,
  //       }
  //     });
  //   });
  // }, [listData]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, []);
  
  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(item => item === frequency);
   
    if (alreadySelected >= 0) {
     const filtered = selectedFrequency.filter(item => item !== frequency);
     setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency([...selectedFrequency, frequency]);
    }
  }

  useEffect(() => {
    const filteredData = pageData.data.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
     }); 

     const formattedDate = filteredData.map(item => {
  
      return {
        id: uuidv4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      }
    })
    setData(formattedDate);
  }, [pageData, monthSelected, yearSelected, selectedFrequency]);
  
  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => setMonthSelected(e.target.value)}
          defaultValue={monthSelected} 
        />
        <SelectInput
          options={years}
          onChange={(e) => setYearSelected(e.target.value)}
          defaultValue={yearSelected}  
        />
      </ContentHeader>
      
      <Filters>
        <button 
          type="button" 
          className={
            `tag-filter tag-filter-recurrent ${selectedFrequency.includes('recorrente') && 'tag-actived'}`
          }
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button 
          type="button"
          className={
            `tag-filter tag-filter-eventual ${selectedFrequency.includes('eventual') && 'tag-actived'}`
          }
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>
      
      <Content>
          {
            data.length ===0 ? <div>Sem registros</div> : 
            data.map((item) => (
                <HistoryFinanceCard  
                  key={item.id}
                  tagColor={item.tagColor}
                  title={item.description}
                  subtitle={item.dateFormatted}
                  amount={item.amountFormatted}
                />
              ))
           }
      </Content>
    </Container>
  );
}

export default List;