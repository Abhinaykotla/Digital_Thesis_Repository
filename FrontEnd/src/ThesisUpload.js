import React, { useState } from 'react';

const ThesisUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="thesis-upload">
      <h2>Upload Thesis Document</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} accept=".pdf" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ThesisUpload;
