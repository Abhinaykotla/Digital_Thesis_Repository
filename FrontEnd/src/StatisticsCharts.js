import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsCharts = () => {
  const [statisticsData, setStatisticsData] = useState([]);

  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/thesisstatistics?user_id='+user_id);
        const data = await response.json();

        if (data) {
          const formattedData = data.data.map((thesis) => ({
            id: thesis.thesis_id,
            title: thesis.title,
            views: thesis.views,
            downloads: thesis.downloads,
          }));
          setStatisticsData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching statistics data:', error);
      }
    };

    fetchStatistics();
  }, []);

  const data = {
    labels: statisticsData.map((thesis) => thesis.title),
    datasets: [
      {
        label: 'Views',
        data: statisticsData.map((thesis) => thesis.views),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Downloads',
        data: statisticsData.map((thesis) => thesis.downloads),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Thesis Statistics</h2>
      {statisticsData.length > 0 ? (
        <Bar data={data} options={{ responsive: true }} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default StatisticsCharts;
