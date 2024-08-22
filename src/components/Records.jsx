import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Records.css'; // Adjust the path if needed

const Records = () => {
  const [userType, setUserType] = useState('User');
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userType === 'Hospital') {
          const response = await axios.get('http://localhost:5000/getDoctorsForHospital', {
            params: { hospitalId: localStorage.getItem('hospitalId') }
          });
          setData(response.data);
        } else if (userType === 'Doctor') {
          const response = await axios.get('http://localhost:5000/getUsersForDoctor', {
            params: { doctorId: localStorage.getItem('doctorId') }
          });
          setData(response.data);
        } else if (userType === 'User') {
          const response = await axios.get('http://localhost:5000/searchDoctors', {
            params: { filter: searchFilter }
          });
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userType, searchFilter]);

  const handleSearch = () => {
    if (userType === 'User') {
      setSearchFilter(searchFilter);
    }
  };

  return (
    <div className="container">
      <h1>{userType} Records</h1>
      {userType === 'User' && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {userType === 'Hospital' && (
                <>
                  <th>Doctor ID</th>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                </>
              )}
              {userType === 'Doctor' && (
                <>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Appointment Date</th>
                </>
              )}
              {userType === 'User' && (
                <>
                  <th>Doctor ID</th>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Availability</th>
                  <th>Book Appointment</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id || item.Doctor_ID}>
                {userType === 'Hospital' && (
                  <>
                    <td>{item.Doctor_ID}</td>
                    <td>{item.Doctor_Name}</td>
                    <td>{item.Specialization}</td>
                  </>
                )}
                {userType === 'Doctor' && (
                  <>
                    <td>{item._id}</td>
                    <td>{item.Name}</td>
                    <td>{item.AppointmentDate}</td>
                  </>
                )}
                {userType === 'User' && (
                  <>
                    <td>{item.Doctor_ID}</td>
                    <td>{item.Doctor_Name}</td>
                    <td>{item.Specialization}</td>
                    <td>{item.Availability}</td>
                    <td>
                      <button>Book Appointment</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Records;
