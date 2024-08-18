import React from 'react';
import './HospitalRecords.css'; // Adjust the path if needed

const HospitalRecords = () => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    // Handle form submission here if needed
  };

  return (
    <div className="container">
      <h1>Hospital Records</h1>
      <form onSubmit={handleSubmit}>
        <div className="table-container">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default HospitalRecords;
