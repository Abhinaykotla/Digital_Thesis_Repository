import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatisticsCharts from './StatisticsCharts';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState([]);

  const user_id = localStorage.getItem('user_id');
  const user_role = localStorage.getItem('role');

  useEffect(() => {
    if (user_role !== 'admin') {
      return;
    }

    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
        setLoading(false);
      });

    fetch('http://localhost:3000/api/thesisstatistics?user_id=' + user_id)
      .then((response) => response.json())
      .then((result) => {
        setStatistics(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
        setLoading(false);
      });

  }, [user_role]);

  if (user_role !== 'admin') {
    return <p>No Access</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="row">
          <h1 className="mt-3">Admin Dashboard</h1>
          <div className="col-12">
            <div className="card justify-center">
              <div className='card-header'>
                <h4 className='card-tile'>Users</h4>
              </div>
              <div className='card-body'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Phone</th>
                      <th>Registed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.user_id}>
                        <td>{item.first_name}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.phone}</td>
                        <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='card'>
              <div className='card-header'>
                <h2 className='card-tile'>Statistics</h2>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-6'>
                    <StatisticsCharts />
                  </div>
                  <div className='col-6'>
                    <table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Views</th>
                          <th>Downloads</th>
                        </tr>
                      </thead>
                      <tbody>
                        {statistics.map((item) => (
                          <tr key={item.stat_id}>
                            <td>{item.title}</td>
                            <td>{item.views}</td>
                            <td>{item.downloads}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
