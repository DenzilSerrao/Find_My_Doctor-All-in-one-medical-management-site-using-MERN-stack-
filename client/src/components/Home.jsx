import React from 'react';
import './Home.css';

function App() {
  return (
    <div>
      <header>
        <div className="logo">
          <i className="fa-solid fa-map-location"></i>
          <h1>Hospital Directory</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/login">Log In</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="content">
          <h2>Finding Nearby Hospitals</h2>
          <p>Easily search for hospitals near your location and filter results by proximity, available doctors, or specific doctor expertise.</p>
          <form action="/consultation">
            <button type="submit">Search Hospitals</button>
          </form>
        </div>
        <div className="image">
          <img src="hospital-building.jpg" alt="Hospital Building" />
        </div>
      </main>
      <section className="filter-section">
        <h3>Hospital Search</h3>
        <h2>Find and Filter Hospitals and Doctors</h2>
        <div className="filters">
          <div className="filter-card">
            <h4>Closest Proximity</h4>
            <p>Filter hospitals by closest proximity to your location</p>
            <a href="#">Filter by Proximity</a>
          </div>
          <div className="filter-card">
            <h4>Available Doctors</h4>
            <p>View hospitals based on the availability of doctors</p>
            <a href="#">View Available Doctors</a>
          </div>
          <div className="filter-card">
            <h4>Specific Doctor Expertise</h4>
            <p>Filter hospitals by the type of doctor needed</p>
            <a href="#">Filter by Doctor Expertise</a>
          </div>
          <div className="filter-card">
            <h4>Available Doctors in Hospital</h4>
            <p>View all doctors currently available in a certain hospital</p>
            <a href="#">View Hospital Doctors</a>
          </div>
        </div>
      </section>
      <footer>
        <p>A website designed to help users easily find hospitals nearby, allowing for filtering by closest proximity, available doctors, and specific doctor expertise. It also offers a menu to display all currently available doctors in a chosen hospital.</p>
      </footer>
    </div>
  );
}

export default App;
