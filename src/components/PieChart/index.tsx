import React from 'react';

import { Container, SideLeft, LegendContainer, Legend, SideRight } from './style';

import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

interface IPieChartComponentPros {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChartComponent: React.FC<IPieChartComponentPros> = ({ data }) => (
  <Container>
    <SideLeft>
      <LegendContainer>
        <h2>Relação</h2>
          { 
          data.map(indicator => (
            <Legend key={indicator.name} color={indicator.color}>
              <div>{indicator.percent}%</div>
              <span>{indicator.name}</span>
            </Legend>
          ))
        }
      </LegendContainer>
    </SideLeft>

    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data}dataKey="percent">
            {
              data.map((indicator) => (
                <Cell key={indicator.name} fill={indicator.color} />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PieChartComponent;
