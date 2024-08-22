import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import Header from './Header';

const Register = () => {
  const [formData, setFormData] = useState({
    type: 'User', // default selection
    Name: '',
    ContactNumber: '',
    Email: '',
    Address: '',
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
        const errorMessage = response.data.message || 'Registration failed. Please try again.';
        setError(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'Registration failed due to a server error.';
      console.error(errorMessage, error);
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const getPlaceholderText = (fieldName) => {
    const placeholders = {
      User: {
        Name: 'Full Name',
        ContactNumber: 'Contact Number',
        Email: 'E-mail',
        Address: 'Address',
        Password: 'Password'
      },
      Hospital: {
        Name: 'Hospital Name',
        ContactNumber: 'Hospital Contact Number',
        Email: 'Hospital E-mail',
        Address: 'Hospital Address',
        Password: 'Password'
      },
      Doctor: {
        Name: 'Doctor Name',
        ContactNumber: 'Doctor Contact Number',
        Email: 'Doctor E-mail',
        Address: 'Doctor Address',
        Password: 'Password'
      }
    };
    return placeholders[formData.type][fieldName];
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
          name="Name" 
          placeholder={getPlaceholderText('Name')} 
          value={formData.Name}
          onChange={handleChange}
          required 
        />
        <input 
          type="tel" 
          className="input" 
          name="ContactNumber" 
          placeholder={getPlaceholderText('ContactNumber')} 
          value={formData.ContactNumber}
          onChange={handleChange}
          required 
        />
        <input 
          type="email" 
          className="input" 
          name="Email" 
          placeholder={getPlaceholderText('Email')} 
          value={formData.Email}
          onChange={handleChange}
          required 
        />
        <input 
          type="text" 
          className="input" 
          name="Address" 
          placeholder={getPlaceholderText('Address')} 
          value={formData.Address}
          onChange={handleChange}
          required 
        />
        <input 
          type="password" 
          className="input" 
          name="Password"  
          placeholder={getPlaceholderText('Password')} 
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
        <a href="#">Learn user license agreement</a>
      </span>
    </div>
  );
}

export default Register;
