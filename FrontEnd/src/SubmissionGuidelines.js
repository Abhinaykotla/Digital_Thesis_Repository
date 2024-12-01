import React from 'react';

const SubmissionGuidelines = () => {
  return (
    <div className="submission-guidelines">
      <h2>Thesis Submission Guidelines</h2>
      <p>Please ensure that your thesis adheres to the following guidelines before submitting:</p>
      <ul>
        <li>Use the provided thesis templates.</li>
        <li>Follow the citation format as outlined in the document.</li>
        <li>The thesis should be submitted in PDF format.</li>
        <li>Ensure the document size does not exceed 10MB.</li>
      </ul>
      <a href="/guidelines.pdf" download>Download Guidelines Document</a>
    </div>
  );
};

export default SubmissionGuidelines;
