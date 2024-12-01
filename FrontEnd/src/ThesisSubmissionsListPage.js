import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThesisSubmissionsListPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const author_id = localStorage.getItem('user_id');

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
        setError('An error occurred while fetching submissions.');
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);
  return (
    <div className="container submissions-table-page">
      <h1>Track Submissions</h1>

      {error && <p className="error">{error}</p>}

      {submissions.length > 0 ? (
        <div className="submissions-table card">
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

export default ThesisSubmissionsListPage;
