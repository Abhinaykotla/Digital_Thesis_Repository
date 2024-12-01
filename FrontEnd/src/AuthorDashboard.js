import React, { useEffect, useState } from 'react';
import StatisticsCharts from './StatisticsCharts';
import StatisticsTable from './StatisticsTable';
import { Link } from 'react-router-dom';

const AuthorDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const author_id = localStorage.getItem('user_id');
  useEffect(() => {
    fetch('http://localhost:3000/api/thesisstatistics?user_id='+author_id)
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
  // const author_id = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/theses?author='+author_id);
        if (!response.ok) {
          throw new Error(`Failed to fetch submissions: ${response.statusText}`);
        }

        const data = await response.json();
        setSubmissions(data.theses);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="statistics-dashboard">
      <h1>Author Dashboard</h1>
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


      {submissions.length > 0 ? (
        <div className="submissions-table card">
          <h2>Theses Submissions</h2>
          <table>
            <thead>
              <tr>
                {/* <th>Tracking ID</th> */}
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                {/* <th>Abstract</th> */}
                <th>Add Comments</th> {/* Add a new column for actions */}
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  {/* <td>{submission.trackingId}</td> */}
                  <td>{submission.title}</td>
                  <td>{submission.author}</td>
                  <td>{submission.year}</td>
                  {/* <td>{submission.abstract}</td> */}
                  <td>
                    <Link to={`/peerreview/${submission.thesis_id}`}>Add Comment</Link> {/* Link to Peer Review page */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No theses have been submitted yet.</p>
      )}


    </div>
  );
};

export default AuthorDashboard;
