import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted');
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We are here to assist you. Please fill out the form below to get in touch.</p>
      </header>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
<hr></hr>
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How can I reset my password?</h3>
          <p>You can reset your password by clicking on the 'Forgot Password' link on the login page.</p>
        </div>
        <div className="faq-item">
          <h3>Where can I find project documentation?</h3>
          <p>Project documentation is available in the 'Documentation' section of our website.</p>
        </div>
        <div className="faq-item">
          <h3>What is the response time for support inquiries?</h3>
          <p>We typically respond to support inquiries within 24-48 hours.</p>
        </div>
      </section>
<hr></hr>
      <section className="contact-info-section">
        <h2>Contact Information</h2>
        <p>If you need immediate assistance, please reach out to us at:</p>
        <p>Email: <a href="mailto:info@utacloud.com">info@utacloud.com</a></p>
        <p>Follow us on social media for updates:</p>
        <p>
          <a href="https://twitter.com/thesisproject" target="_blank" rel="noopener noreferrer">Twitter</a> | 
          <a href="https://facebook.com/thesisproject" target="_blank" rel="noopener noreferrer"> Facebook</a> | 
          <a href="https://instagram.com/thesisproject" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
      </section>
    </div>
  );
};

export default Contact;
