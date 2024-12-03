import React from 'react';

const TemplateDownloads = () => {
  return (
    <div className="template-downloads">
      <h2>Thesis Templates</h2>
      <p>Please use one of the following templates for your thesis submission:</p>
      <ul>
        <li><a href="https://www.ieee.org/content/dam/ieee-org/ieee/web/org/conferences/Conference-template-A4.doc" target='blank'>Download Word Template</a></li>
        <li><a href="https://ctan.math.illinois.edu/macros/latex/contrib/IEEEtran/IEEEtran_HOWTO.pdf" target='blank'>Download LaTeX Template</a></li>
      </ul>
    </div>
  );
};

export default TemplateDownloads;
