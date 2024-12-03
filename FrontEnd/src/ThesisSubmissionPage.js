import React, { useState, useEffect } from 'react';

const ThesisSubmissionPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [thesisId, setThesisId] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const author_id = localStorage.getItem('user_id');
  useEffect(() => {
    const storedSubmissions = JSON.parse(localStorage.getItem('thesisSubmissions')) || [];
    setSubmissions(storedSubmissions);
  }, []);

  const handleThesisSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append('author_id', author_id);
    try {
      const response = await fetch('http://localhost:3000/api/thesisSubmission', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();

      const newSubmission = {
        thesisId: result.thesisId,
        title: formData.get('thesisTitle'),
        author: formData.get('authorName'),
        year: formData.get('year'),
        email: formData.get('email'),
        keywords: formData.get('keywords'),
        fileName: formData.get('uploadFile')?.name || 'Uploaded File',
        abstract: formData.get('abstract'),
        topic: formData.get('topic'),
      };

      const updatedSubmissions = [...submissions, newSubmission];
      localStorage.setItem('thesisSubmissions', JSON.stringify(updatedSubmissions));

      setSubmissions(updatedSubmissions);
      setThesisId(result.thesisId);
      setSubmitted(true);
      setError(null);
      event.target.reset();
    } catch (apiError) {
      console.error('Error submitting thesis:', apiError);
      setError('An error occurred while submitting your thesis. Please try again.');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="container">
      <h1>Submit Your Thesis</h1>

      {!submitted ? (
        <form onSubmit={handleThesisSubmit} className="thesis-submission-form" encType="multipart/form-data">
          <div>
            <label>Thesis Title:</label>
            <input type="text" name="thesisTitle" required />
          </div>
          <div>
            <label>Topic</label>
            <input type="text" name="topic" required />
          </div>
          <div>
            <label>Author Name:</label>
            <input type="text" name="authorName" required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Keywords:</label>
            <input type="text" name="keywords" required />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="text"
              name="year"
              required
              value={currentYear}
              readOnly

            />
          </div>
          <div>
            <label>Abstract</label>
            <textarea name="abstract" className='form-control' required></textarea>
          </div>
          <div>
            <label>Upload File:</label>
            <input type="file" name="uploadFile" accept=".pdf,.doc,.docx" required />
          </div>
          <button type="submit">Submit Thesis</button>
        </form>
      ) : (
        <div>
          <h2>Thesis Submitted Successfully!</h2>
          <p>Your thesis ID: <strong>{thesisId}</strong></p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {submissions.length > 0 && (
        <div className="submissions-table">
          <h2>Submitted Theses</h2>
          <table>
            <thead>
              <tr>
                <th>Thesis ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Email</th>
                <th>Keywords</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td>{submission.thesisId}</td>
                  <td>{submission.title}</td>
                  <td>{submission.author}</td>
                  <td>{submission.year}</td>
                  <td>{submission.email}</td>
                  <td>{submission.keywords}</td>
                  <td>{submission.fileName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ThesisSubmissionPage;