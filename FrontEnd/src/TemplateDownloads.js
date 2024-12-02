import React from 'react';

const TemplateDownloads = () => {
  return (
    <div className="template-downloads">
      <h2>Thesis Templates</h2>
      <p>Please use one of the following templates for your thesis submission:</p>
      <ul>
        <li><a href="/templates/thesis-template.docx" download>Download Word Template</a></li>
        <li><a href="/templates/thesis-template-latex.zip" download>Download LaTeX Template</a></li>
      </ul>
    </div>
  );
};

export default TemplateDownloads;