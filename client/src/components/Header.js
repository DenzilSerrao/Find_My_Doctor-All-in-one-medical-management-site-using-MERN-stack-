import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [serverStatus, setServerStatus] = useState('');
  const userEmail = sessionStorage.getItem('userEmail');
  const userType = sessionStorage.getItem('userType');
  const navigate = useNavigate();

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/status');
        if (response.status === 200) {
          setServerStatus(response.data.message);
        }
      } catch (error) {
        setServerStatus('Server Offline');
      }
    };
    checkServerStatus();
  }, []);

  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');
  const handleAboutUsClick = () => navigate('/aboutus');
  const handleContactUsClick = () => navigate('/contact');

  return (
    <header>
      <div className="logo" onClick={() => navigate('/')}>
        <h1>Hospital Directory</h1>
      </div>
      <div className="server-status">
        <p>{serverStatus}</p>
        <h1>Welcome{userEmail ? `, ${userEmail}` : ''}</h1>
      </div>
      <nav>
        <ul>
          <li><button onClick={handleLoginClick}>Log In</button></li>
          <li><button onClick={handleRegisterClick}>Register</button></li>
          <li><button onClick={handleAboutUsClick}>About Us</button></li>
          <li><button onClick={handleContactUsClick}>Contact Us</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
