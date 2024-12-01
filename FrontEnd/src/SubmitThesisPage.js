import React, { useState, useEffect } from 'react';
import SubmissionGuidelines from './SubmissionGuidelines';
import TemplateDownloads from './TemplateDownloads';
import ThesisSubmissionForm from './ThesisSubmissionForm';
import ThesisUpload from './ThesisUpload';
import ConfirmationTracking from './ConfirmationTracking';
import { Link } from 'react-router-dom';

const SubmitThesisPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const storedSubmissions = JSON.parse(localStorage.getItem('thesisSubmissions')) || [];
    setSubmissions(storedSubmissions);
  }, []);

  const handleThesisSubmit = async (details, file) => {
    const formData = new FormData();
    formData.append('thesisTitle', details.title);
    formData.append('authorName', details.author);
    formData.append('email', details.email);
    formData.append('keywords', details.keywords);
    formData.append('year', details.year);
    formData.append('author_id', details.author_id); // Add author ID if available
    formData.append('uploadFile', file); // Add the uploaded file

    try {
      const response = await fetch('http://localhost:3000/api/thesisSubmission', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        const newSubmission = {
          ...details,
          trackingId: result.thesisId,
        };

        const updatedSubmissions = [...submissions, newSubmission];
        localStorage.setItem('thesisSubmissions', JSON.stringify(updatedSubmissions));
        setSubmissions(updatedSubmissions);

        setTrackingId(result.thesisId);
        setSubmitted(true);
      } else {
        alert(result.error || 'Failed to submit thesis');
      }
    } catch (error) {
      console.error('Error submitting thesis:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleFileUpload = (file) => {
    alert('File uploaded'); // This function can be omitted as file upload is handled in `handleThesisSubmit`
  };

  return (
    <div className="submit-thesis-page">
      <h1>Submit Your Thesis</h1>
      <div className="row">
        <button type="submit" className="col-6">
          <Link to="/thesis">Submit Thesis</Link>
        </button>
        <button type="submit" className="col-6">
          <Link to="/thesistable">Thesis Submissions</Link>
        </button>
      </div>
      <SubmissionGuidelines />
      <TemplateDownloads />
      
      {!submitted ? (
        <>
          {/* <ThesisSubmissionForm onSubmit={handleThesisSubmit} /> */}
          {/* <ThesisUpload onFileUpload={handleFileUpload} /> */}
        </>
      ) : (
        <ConfirmationTracking trackingId={trackingId} />
      )}

      {/* Display the submissions in a table */}
      {submissions.length > 0 && (
        <div className="submissions-table">
          <h2>Submitted Theses</h2>
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Abstract</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td>{submission.trackingId}</td>
                  <td>{submission.title}</td>
                  <td>{submission.author}</td>
                  <td>{submission.year}</td>
                  <td>{submission.abstract}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmitThesisPage;
