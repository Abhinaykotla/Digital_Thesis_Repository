import React from 'react';
import { statisticsData } from './StatisticsData';

const StatisticsTable = () => {
  return (
    <div className="statistics-table">
      <h2>Thesis Statistics Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Downloads</th>
          </tr>
        </thead>
        <tbody>
          {statisticsData.map((thesis) => (
            <tr key={thesis.id}>
              <td>{thesis.title}</td>
              <td>{thesis.views}</td>
              <td>{thesis.downloads}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;
