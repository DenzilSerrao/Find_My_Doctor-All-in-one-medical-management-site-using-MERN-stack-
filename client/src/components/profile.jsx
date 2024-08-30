import React from 'react';
import './profile.css'; // Adjust the path if needed

const Profile = () => {
  return (
    <div className="container">
      <h2>Profile Page</h2>
      <div className="profile-info">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" 
          alt="Profile Picture" 
        />
        <p>Welcome</p>
      </div>
      <div className="button-container">
        <button 
          className="button" 
          onClick={() => window.location.href = '/DoctorRegistration'}
        >
          Add Doctor
        </button>
      </div>
    </div>
  );
};

export default Profile;
