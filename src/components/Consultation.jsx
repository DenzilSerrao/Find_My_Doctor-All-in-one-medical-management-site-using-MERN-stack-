import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Consultation.css';

const Consultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('availability');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/doctors'); // Fetch all doctors
        setDoctors(response.data || []); // Update state with all doctors data
        setFilteredDoctors(response.data || []);
      } catch (error) {
        console.error('There was an error fetching the doctors!', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Filter doctors based on search query and filter
    const applyFilter = () => {
      let results = doctors;

      if (searchQuery) {
        switch (searchFilter) {
          case 'availability':
            results = results.filter(doctor => doctor.Availability.toString().toLowerCase().includes(searchQuery.toLowerCase()));
            break;
          case 'doctor-name':
            results = results.filter(doctor =>
              doctor.Doctor_Name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            break;
          case 'specialization':
            results = results.filter(doctor =>
              doctor.Specialization.toLowerCase().includes(searchQuery.toLowerCase())
            );
            break;
          case 'hospital-name':
            results = results.filter(doctor =>
              doctor.Hospital_Name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            break;
          case 'closest-doctor':
            // Placeholder for closest doctor logic
            break;
          default:
            break;
        }
      }

      setFilteredDoctors(results);
    };

    applyFilter();
  }, [searchQuery, searchFilter, doctors]);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFilterChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled automatically by useEffect hook
  };

  return (
    <div className="main">
      <div className="navbar">
        <div className="buttons">
          <a href="#symptoms-checker">HomePage</a>
          <a href="#doctor-appointment">Doctor Appointment</a>
          <a href="#insurance-support">Insurance Support</a>
          <a href="#video-consultation">Video Consultations</a>
          <a href="index1.html">Support</a>
        </div>
        <form onSubmit={handleSearchSubmit} className="search-container">
          <input 
            type="text" 
            name="search_query" 
            className="search-bar" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <select 
            name="search_filter" 
            className="search-dropdown"
            value={searchFilter}
            onChange={handleSearchFilterChange}
          >
            <option value="availability">Availability</option>
            <option value="doctor-name">Doctor Name</option>
            <option value="specialization">Specialization</option>
            <option value="hospital-name">Hospital Name</option>
            <option value="closest-doctor">Closest Doctor</option>
          </select>
          <button 
            type="submit" 
            className="search-button"
          >
            Search
          </button>
        </form>
      </div>

      <div className="content">
        <h1>Stay connected to your health journey with our Video Consultation Services.</h1>
        {!filteredDoctors.length && (
          <video 
            autoPlay 
            loop 
            muted
          >
            <source src="consultation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <h2>Health Care, from the comfort of your home</h2>
        <p>Don't Delay Care For you and those you love. Consult doctors online.</p>
        <a href="#" className="book-now">Book an Appointment</a>
      </div>

      {filteredDoctors.length > 0 && (
        <div className="doctor-table">
          <h2>Doctors Available</h2>
          <table>
            <thead>
              <tr>
                <th>Hospital Name</th>
                <th>Doctor Name</th>
                <th>Phone Number</th>
                <th>Specialization</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.Doctor_ID}>
                  <td>{doctor.Hospital_Name}</td>
                  <td>{doctor.Doctor_Name}</td>
                  <td>{doctor.Phone_Number}</td>
                  <td>{doctor.Specialization}</td>
                  <td>{doctor.Availability ? 'Available' : 'Not Available'}</td>
                  <td><button>Book an Appointment</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer>
        <marquee direction="left">
          Greetings from Find my Doctor - India's only Centralized Availability Source of Your Medical Needs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Greetings from Find my Doctor - India's only Centralized Availability Source of Your Medical Needs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Greetings from Find my Doctor - India's only Centralized Availability Source of Your Medical Needs
        </marquee>
      </footer>
    </div>
  );
};

export default Consultation;
