import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Our Thesis Project</h1>
      </header>

      <section className="mission-section">
        <h2>Mission Statement</h2>
        <p>
          Our mission is to facilitate academic excellence by providing a robust platform for thesis submissions and peer reviews. We aim to enhance the quality of research and promote collaboration among students, educators, and researchers.
        </p>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members row">
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Abhinay</h3>
            <p>Full Stack Developer</p>
            <p>Abhinay worked on both the frontend and backend, designing the user interface, developing API endpoints, and implementing critical platform functionality.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Shriisudhan</h3>
            <p>Project Lead & Data Analyst</p>
            <p>Shriisudhan led the project and provided insights by analyzing usage data, generating statistics, and improving the user experience through data-driven decisions.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Ananya</h3>
            <p>Frontend Developer</p>
            <p>Ananya specialized in creating intuitive interfaces, implementing search functionality, and ensuring a seamless user experience across devices.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Yogesh</h3>
            <p>Back-End Developer</p>
            <p>Yogesh focused on setting up the server, database, and APIs, handling authentication, and managing the backend infrastructure.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Harsha</h3>
            <p>Database Administrator</p>
            <p>Harsha designed and managed the database, optimized queries for performance, and ensured the security and integrity of the repository's data.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Could be you!</h3>
            <p> Join our team and contribute to the growth of academic excellence!</p>
            <p> Contact us to learn more about opportunities and collaborations.</p>
          </div>
        </div>
      </section>
      <div className='row'>
        <div className='col-6'>
          <section className="history-section card">
            <h2>History & Development</h2>
            <p className='text-justify'>
              Our project began in 2024, inspired by the challenges faced by students during thesis submission and review processes. With a focus on addressing these pain points, we have evolved through collaborative efforts and feedback to create a comprehensive platform that simplifies submissions and fosters peer engagement.
            </p>
            <p><strong>Phase 1:</strong> Initial reports and project prototype development.</p>
            <p><strong>Phase 2:</strong> Front-end development, focusing on user interface and responsive design.</p>
            <p><strong>Phase 3:</strong> Back-end implementation, including database setup, API development, and user authentication.</p>
          </section>
        </div>
        <div className='col-6'>
          <section className="contact-section card">
            <h2>Contact Us</h2>
            <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>
            <p>Email: <a href="mailto:info@thesisproject.com">info@thesisproject.com</a></p>
          </section>
        </div>
      </div>

    </div>
  );
};

export default About;
