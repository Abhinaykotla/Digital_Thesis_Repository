import React, { useEffect, useState } from 'react';
import StatisticsCharts from './StatisticsCharts';
import StatisticsTable from './StatisticsTable';

const StatisticsDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    fetch('http://localhost:3000/api/thesisstatistics?user_id='+user_id)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="statistics-dashboard">
      <h1>Statistics Dashboard</h1>
      <StatisticsCharts />
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Downloads</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.stat_id}>
              <td>{item.title}</td>
              <td>{item.views}</td>
              <td>{item.downloads}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsDashboard;
