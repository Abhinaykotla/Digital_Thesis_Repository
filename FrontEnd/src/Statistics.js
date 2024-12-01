import React from 'react';
import StatisticsCharts from './StatisticsCharts';
import StatisticsTable from './StatisticsTable';

const Statistics = () => {
  return (
    <div className="statistics-dashboard">
      <h1>Statistics Dashboard</h1>
      <StatisticsTable />
    </div>
  );
};

export default Statistics;
