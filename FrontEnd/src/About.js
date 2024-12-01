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
            <h3>Shriisudhan</h3>
            <p>Project Lead</p>
            <p>Sudhan is dedicated to improving educational outcomes through innovative technology solutions.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Ananya</h3>
            <p>Lead Developer</p>
            <p>Ananya specializes in frontend development and user experience, ensuring our platform is user-friendly.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Abhinay</h3>
            <p>Community Manager</p>
            <p>Abhinay fosters community engagement and supports users to enhance their experience on our platform.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Abhinay</h3>
            <p>Community Manager</p>
            <p>Abhinay fosters community engagement and supports users to enhance their experience on our platform.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Yogesh</h3>
            <p>Community Manager</p>
            <p>yogesh fosters community engagement and supports users to enhance their experience on our platform.</p>
          </div>
          <div className="team-member col-6">
            <img src="./user.png" alt="Team Member" />
            <h3>Harsha</h3>
            <p>Community Manager</p>
            <p>harsha fosters community engagement and supports users to enhance their experience on our platform.</p>
          </div>
        </div>
      </section>
      <div className='row'>
        <div className='col-6'>
      <section className="history-section card">
        <h2>History & Development</h2>
        <p className='text-justify'>
          Our project was initiated in 2024, inspired by the challenges faced by students during thesis submission and review processes. Through continuous feedback and collaboration, we've evolved into a platform that not only streamlines submissions but also encourages peer review and constructive feedback.
        <p>Phase 1 : Reports and  Prototype of the Project</p>
        <p> Phase 2 : Front-End  Development</p>
        </p>
      </section>
      </div>
      <div className='col-6'>
      <section className="contact-section card">
        <h2>Contact Us</h2>
        <p>If you have any questions, suggestions, or feedback, feel free to reach out!</p>
        <p>Email: <a href="mailto:info@utacloud.com">info@thesisproject.com</a></p>
        
      </section>
      </div>
      </div>
    </div>
  );
};

export default About;
