import React from 'react';
import './chart.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <section className="chart-section">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#567db8" />
          <Line type="monotone" dataKey={dataKey} stroke="#567db8" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#f0f0f0" />}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Chart;
