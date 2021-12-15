import React, { useState, useMemo } from 'react';

import listOfMonths from '../../utils/months';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartComponent from '../../components/PieChart';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';
import opsImg from '../../assets/ops.svg';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import { Container, Content } from './style';

const years = [
  {value: 2021, label: 2021},
  {value: 2020, label: 2020},
  {value: 2019, label: 2019},
  {value: 2018, label: 2018},
];

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth()+1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, []);

  // const years = useMemo(() => {
  //   let uniqueYears: number[] = [];
  
  //   [...gains, ...expenses].forEach(item => {
  //     const date = new Date(item.date);
  //     const year = date.getFullYear();
  
  //     if (!uniqueYears.includes(year)) {
  //       uniqueYears.push(year);
  //     }
  
  //     return uniqueYears.map(year => {
  //       return {
  //         value: year,
  //         label: year
  //       }
  //     })
  
  //   })
  // }, [])

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === Number(monthSelected) && year === Number(yearSelected)) {
        total += Number(item.amount);
      }
    });
    return total;

  },[monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === Number(monthSelected) && year === Number(yearSelected)) {
        total += Number(item.amount);
      }
    });
    return total;

  },[monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title:"Que triste! ",
        description:"Neste mês, você gastou mais do que deveria.",
        footerText:"Verifique seus gastos. Tente cortar despesas desnecessárias.",
        icon: sadImg,
      }
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title:"Ops! ",
        description:"Neste mês, não há registros de entradas ou saídas.",
        footerText:"Nenhum registro para mostrar.",
        icon: opsImg,
      }
    } else if (totalBalance === 0) {
      return {
        title:"Ufa! ",
        description:"Neste mês, você gastou exatamente o que ganhou.",
        footerText:"Verifique seus gastos. Tente cortar despesas desnecessárias.",
        icon: grinningImg,
      }
    } else {
      return {
        title:"Muito bem! ",
        description:"Sua carteira está positiva!",
        footerText:"Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      }
    }
  }, [totalBalance, totalExpenses, totalGains]);

  const relactionExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;
    const gainsPercent = Number(((totalGains / total) * 100).toFixed(1));
    const expensesPercent = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: gainsPercent ? gainsPercent : 0,
        color: '#F7931B'
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: expensesPercent ? expensesPercent : 0,
        color: '#E44C4E'
      }
    ];

    return data;

  }, [totalExpenses, totalGains]);

  const relationExpensesRecurentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
    .filter((expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return month === Number(monthSelected) && year === Number(yearSelected);
    })
    .forEach((expense) => {
      if (expense.frequency === 'recorrente') {
        return amountRecurrent += Number(expense.amount);
      }
      if (expense.frequency === 'eventual') {
        return amountEventual += Number(expense.amount);
      }
    });

    const total = amountRecurrent + amountEventual;
    const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));
   
    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent : recurrentPercent ? recurrentPercent : 0,
        color:'#F7931B'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent : eventualPercent ? eventualPercent : 0,
        color:'#E44C4E'
      },
  ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
    .filter((gain) => {
      const date = new Date(gain.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return month === Number(monthSelected) && year === Number(yearSelected);
    })
    .forEach((gain) => {
      if (gain.frequency === 'recorrente') {
        return amountRecurrent += Number(gain.amount);
      }
      if (gain.frequency === 'eventual') {
        return amountEventual += Number(gain.amount);
      }
    });

    const total = amountRecurrent + amountEventual;
    const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent : recurrentPercent ? recurrentPercent : 0,
        color:'#F7931B'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent : eventualPercent ? eventualPercent : 0,
        color:'#E44C4E'
      },
  ];
  }, [monthSelected, yearSelected]);

  const historyData = useMemo(() => {
    return listOfMonths.map((_, month) => {
        
        let amountEntry = 0;
        gains.forEach(gain => {
            const date = new Date(gain.date);
            const gainMonth = date.getMonth();
            const gainYear = date.getFullYear();

            if(gainMonth === month && Number(gainYear) === Number(yearSelected)){
                try{
                    amountEntry += Number(gain.amount);
                }catch{
                    throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                }
            }
        });

        let amountOutput = 0;
        expenses.forEach(expense => {
            const date = new Date(expense.date);
            const expenseMonth = date.getMonth();
            const expenseYear = date.getFullYear();

            if(expenseMonth === month && Number(expenseYear) === Number(yearSelected)){
                try{
                    amountOutput += Number(expense.amount);
                }catch{
                    throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                }
            }
        });

        return {
            monthNumber: month,
            month: listOfMonths[month].substr(0, 3),
            amountEntry,
            amountOutput
        }
    })
    .filter(item => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return (
        (Number(yearSelected) === currentYear && item.monthNumber <= currentMonth) ||
        (Number(yearSelected) < currentYear)
      );
    });
  }, [yearSelected]);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
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

      <Content>
        <WalletBox 
          title="saldo"
          amount={totalBalance}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="dollar"
          color="#4E41F0"
        />

        <WalletBox 
          title="entradas"
          amount={totalGains}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#F7931B"
        />

        <WalletBox 
          title="saídas"
          amount={totalExpenses}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#E44C4E"
        />

        <MessageBox 
          title={message.title} 
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartComponent data={relactionExpensesVersusGains} />
        
        <HistoryBox data={historyData} lineColorAmountEntry="#F7931B" lineColorAmountOutput="#E44C4E" />

        <BarChartBox title="Saídas" data={relationExpensesRecurentVersusEventual} />
        <BarChartBox title="Entradas" data={relationGainsRecurentVersusEventual} />

      </Content>
    </Container>
  );
}

export default Dashboard;