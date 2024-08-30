import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorRegistration.css';

const DoctorRegistration = () => {
  const [doctorData, setDoctorData] = useState([{ name: '', specialization: '', email: '' }]);
  const storedHospitalId = localStorage.getItem('hospitalId');
  const [hospitalId, setHospitalId] = useState(storedHospitalId ? storedHospitalId.toString() : ''); // Ensure it's a string

  const navigate = useNavigate();

  const addDoctorFields = () => {
    setDoctorData([...doctorData, { name: '', specialization: '', email: '' }]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDoctorData = [...doctorData];
    updatedDoctorData[index][name] = value;
    setDoctorData(updatedDoctorData);
  };

  const generateDoctorId = (hospitalId, index) => {
    if (!hospitalId || typeof hospitalId !== 'string') {
      throw new Error('Invalid Hospital ID');
    }
    const doctorNumber = (index + 1).toString().padStart(3, '0'); // Generate a 3-digit doctor number
    const hospitalPrefix = hospitalId.slice(0, 2).toUpperCase(); // Take the first two characters of the Hospital ID
    return `${hospitalPrefix}${doctorNumber}`; // Example: A1001, A1002, etc.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const doctorsWithIds = doctorData.map((doctor, index) => ({
        ...doctor,
        Doctor_ID: generateDoctorId(hospitalId, index), // Add the generated Doctor_ID
      }));

      await axios.post('http://localhost:5000/register-doctors', {
        hospitalId, // Include the hospital ID
        doctors: doctorsWithIds,
      });

      alert('Doctors registered successfully');
      navigate('/consultation'); // Redirect to consultation page
    } catch (error) {
      alert('Error registering doctors');
      console.error('There was an error registering the doctors!', error);
    }
  };

  const renderDoctorFields = () => {
    return doctorData.map((doctor, index) => (
      <fieldset key={index}>
        <legend>Doctor {index + 1}</legend>
        <div className="input-group">
          <label htmlFor={`doctorName${index}`}>Doctor's Name:</label>
          <input
            type="text"
            id={`doctorName${index}`}
            name="name"
            className="doctor-input"
            placeholder="Doctor Name"
            value={doctor.name}
            onChange={(e) => handleInputChange(index, e)}
            required
          />
          <label htmlFor={`specialization${index}`}>Specialization:</label>
          <select
            id={`specialization${index}`}
            name="specialization"
            className="doctor-input"
            value={doctor.specialization}
            onChange={(e) => handleInputChange(index, e)}
            required
          >
            <option value="">Select</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="general">General</option>
            <option value="dermatology">Dermatology</option>
            <option value="gynecology">Gynecology</option>
            <option value="psychiatry">Psychiatry</option>
          </select>
          <label htmlFor={`email${index}`}>Doctor's Email:</label>
          <input
            type="email"
            id={`email${index}`}
            name="email"
            className="doctor-input"
            placeholder="Doctor Email"
            value={doctor.email}
            onChange={(e) => handleInputChange(index, e)}
            required
          />
        </div>
      </fieldset>
    ));
  };

  return (
    <div className="container">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div id="doctorContainer">
          {renderDoctorFields()}
        </div>
        <button type="button" onClick={addDoctorFields} className="add-button">
          Add Another Doctor
        </button>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default DoctorRegistration;
