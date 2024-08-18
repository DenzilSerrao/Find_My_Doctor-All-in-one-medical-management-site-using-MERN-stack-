import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import Header from './Header';

const Register = () => {
  const [formData, setFormData] = useState({
    type: 'User', // default selection
    HospitalName: '',
    HospitalContactNumber: '',
    HospitalEmail: '',
    HospitalAddress: '',
    Password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', formData);

      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error registering!', error);
      setError('Registration failed due to a server error.');
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="heading">Register</div>
      <form onSubmit={handleSubmit} className="form">
        <select 
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          className="input"
        >
          <option value="User">User</option>
          <option value="Hospital">Hospital</option>
          <option value="Doctor">Doctor</option>
        </select>
        <input 
          type="text" 
          className="input" 
          name="HospitalName" 
          placeholder="Name" 
          value={formData.HospitalName}
          onChange={handleChange}
          required 
        />
        <input 
          type="tel" 
          className="input" 
          name="HospitalContactNumber" 
          placeholder="Contact Number" 
          value={formData.HospitalContactNumber}
          onChange={handleChange}
          required 
        />
        <input 
          type="email" 
          className="input" 
          name="HospitalEmail" 
          placeholder="E-mail" 
          value={formData.HospitalEmail}
          onChange={handleChange}
          required 
        />
        <input 
          type="text" 
          className="input" 
          name="HospitalAddress" 
          placeholder="Address" 
          value={formData.HospitalAddress}
          onChange={handleChange}
          required 
        />
        <input 
          type="password" 
          className="input" 
          name="Password"  
          placeholder="Password" 
          value={formData.Password}
          onChange={handleChange}
          required 
        />
        <input 
          className="login-button" 
          type="submit" 
          value="Register" 
        />
        {error && <p className="error-message">{error}</p>}
      </form>
      <span className="agreement">
        <a href="#">Learn user licence agreement</a>
      </span>
    </div>
  );
}

export default Register;
