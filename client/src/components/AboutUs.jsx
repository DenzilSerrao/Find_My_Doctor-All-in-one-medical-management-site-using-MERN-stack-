import React from 'react';
import './AboutUs.css'; // Adjust the path if needed
import Header from './Header';

const AboutUs = () => {
  return (
    <div>
      <Header />
      <h2>Presented to you by Tech Savvy</h2>
      <section id="team">
        <div className="team-member">
          <img src="Shreesha.jpg" alt="Team Member 1" />
          <h3>Shreesha</h3>
        </div>
        <div className="team-member">
          <img src="Nisarga.jpg" alt="Team Member 2" />
          <h3>Nisarga Shetty</h3>
        </div>
        <div className="team-member">
          <img src="Denzil Serrao.jpg" alt="Team Member 3" />
          <h3>Denzil Serrao</h3>
        </div>
        <div className="team-member">
          <img src="Ashitha.jpg" alt="Team Member 4" />
          <h3>Ashitha</h3>
        </div>
      </section>
      <footer>
        <p>&copy; 2024 TECH SAVVY. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
