import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header'; // Import the Header component
import Login from './components/Login';
import Register from './components/Register';
import AboutUs from './components/AboutUs';
// import ContactUs from './components/ContactUs';
import Consultation from './components/Consultation';
import Profile from './components/profile';
import DoctorRegistration from './components/DoctorRegistration';
// import ClosestProximity from './components/ClosestProximity';
// import AvailableDoctors from './components/AvailableDoctors';
// import DoctorExpertise from './components/DoctorExpertise';
// import HospitalDoctors from './components/HospitalDoctors';

function Home() {
  const navigate = useNavigate(); // Define the navigate function here

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/consultation');
  };

  return (
    <div className="page">
      <Header />
      <main>
        <div className="content">
          <h2>Finding Nearby Hospitals</h2>
          <p>Easily search for hospitals near your location and filter results by proximity, available doctors, or specific doctor expertise.</p>
          <form onSubmit={handleSearchSubmit}>
            <button type="submit">Search Hospitals</button>
          </form>
        </div>
        <div className="image">
          <img src="hospital-building.jpg" alt="Hospital Building" />
        </div>
      </main>
      <section className="filter-section">
        <div className='filter-headings'>
          <h3>Hospital Search</h3>
          <h2>Find and Filter Hospitals and Doctors</h2>
        </div>
        <div className="filters">
          <div className="filter-card">
            <h4>Closest Proximity</h4>
            <p>Filter hospitals by closest proximity to your location</p>
            <button onClick={() => navigate('/closest-proximity')}>Filter by Proximity</button>
          </div>
          <div className="filter-card">
            <h4>Available Doctors</h4>
            <p>View hospitals based on the availability of doctors</p>
            <button onClick={() => navigate('/available-doctors')}>View Available Doctors</button>
          </div>
          <div className="filter-card">
            <h4>Specific Doctor Expertise</h4>
            <p>Filter hospitals by the type of doctor needed</p>
            <button onClick={() => navigate('/doctor-expertise')}>Filter by Doctor Expertise</button>
          </div>
          <div className="filter-card">
            <h4>Available Doctors in Hospital</h4>
            <p>View all doctors currently available in a certain hospital</p>
            <button onClick={() => navigate('/hospital-doctors')}>View Hospital Doctors</button>
          </div>
        </div>
      </section>
      <footer>
        <p>A website designed to help users easily find hospitals nearby, allowing for filtering by closest proximity, available doctors, and specific doctor expertise. It also offers a menu to display all currently available doctors in a chosen hospital.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/aboutus" element={<AboutUs />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/consultation" element={<Consultation />} />
      {/* <Route path="/closest-proximity" element={<ClosestProximity />} />
      <Route path="/available-doctors" element={<AvailableDoctors />} />
      <Route path="/doctor-expertise" element={<DoctorExpertise />} />
      <Route path="/hospital-doctors" element={<HospitalDoctors />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/DoctorRegistration" element={<DoctorRegistration />} />
    </Routes>
  );
}

export default App;
