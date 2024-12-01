import React, { useState } from 'react';

const ThesisSubmissionForm = () => {
  const author_id = localStorage.getItem('user_id');
  const [thesisDetails, setThesisDetails] = useState({
    title: '',
    author: '',
    year: '',
    abstract: '',
    email: '',
    keywords: '',
    author_id: author_id,
  });

  const [file, setFile] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleChange = (e) => {
    setThesisDetails({
      ...thesisDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a thesis document.');
      return;
    }

    const formData = new FormData();
    formData.append('thesisTitle', thesisDetails.title);
    formData.append('authorName', thesisDetails.author);
    formData.append('email', thesisDetails.email);
    formData.append('keywords', thesisDetails.keywords);
    formData.append('year', thesisDetails.year);
    formData.append('author_id', thesisDetails.author_id);
    formData.append('abstract', thesisDetails.abstract);
    formData.append('thesisDocument', file);

    try {
      const response = await fetch('http://localhost:3000/api/thesisSubmission', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setSubmissionResult({
          success: true,
          trackingId: result.thesisId,
        });
      } else {
        setSubmissionResult({
          success: false,
          message: result.error || 'Submission failed',
        });
      }
    } catch (error) {
      console.error('Error submitting thesis:', error);
      setSubmissionResult({
        success: false,
        message: 'An error occurred while submitting your thesis. Please try again.',
      });
    }
  };

  return (
    <div className="thesis-submission-form">
      <h2>Submit Your Thesis</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Thesis Title"
          value={thesisDetails.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={thesisDetails.author}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Author Email"
          value={thesisDetails.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="keywords"
          placeholder="Keywords"
          value={thesisDetails.keywords}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year of Submission"
          value={thesisDetails.year}
          onChange={handleChange}
          required
        />
        <textarea
          name="abstract"
          placeholder="Abstract"
          value={thesisDetails.abstract}
          onChange={handleChange}
          required
        />
        
        <input
          type="file"
          name="uploadFile"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Submit Thesis</button>
      </form>

      {/* Display submission result */}
      {submissionResult && (
        <div className="submission-result">
          {submissionResult.success ? (
            <p>
              Thesis submitted successfully! Your tracking ID is: <strong>{submissionResult.trackingId}</strong>
            </p>
          ) : (
            <p>Error: {submissionResult.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ThesisSubmissionForm;
