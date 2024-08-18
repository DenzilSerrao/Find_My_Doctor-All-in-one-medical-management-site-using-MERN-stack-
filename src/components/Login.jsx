import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Ensure this file exists for styling
import Header from './Header';

const Login = () => {
  const [formData, setFormData] = useState({
    type: 'User', // Default selection
    HospitalEmail: '',
    Password: ''
  });

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
      const response = await axios.post('http://localhost:5000/login', formData);

      if (response.status === 200) {
        const { hospitalId } = response.data;
        localStorage.setItem('hospitalId', hospitalId || 'undefined'); // Ensure hospitalId is set correctly

        alert('Login successful!');
        
        // Redirect based on user type
        if (formData.type === 'Hospital') {
          navigate('/profile');
        } else if (formData.type === 'Doctor') {
          navigate('/'); // Update to appropriate route for Doctor
        } else {
          navigate('/'); // Update to appropriate route for User
        }
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Login failed due to a server error.');
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="heading">Sign In</div>
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
          type="email" 
          className="input" 
          name="HospitalEmail" 
          placeholder="E-mail" 
          value={formData.HospitalEmail}
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
          value="Sign In" 
        />
      </form>
      <span className="agreement">
        <a href="#">Learn about the user license agreement</a>
      </span>
    </div>
  );
}

export default Login;
