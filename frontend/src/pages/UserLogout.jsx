// import React from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// const UserLogout = () => {
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }).then ((response) => {
//         if (response.status === 200) {
//             localStorage.removeItem('token');
//             navigate('/login');
            
//         }
//     })

//   return (
//     <div>UserLogout</div>
//   )
// }

// export default UserLogout









import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // If there's no token, just redirect to login page
      navigate('/login');
      return;
    }

    const logout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Logout failed. Please try again.');
        }
      } catch (error) {
        setError('Logout failed. Please try again.');
        console.error('Error during logout:', error);
      } finally {
        setLoading(false);
      }
    };

    logout();
  }, [token, navigate]);

  if (loading) {
    return <div>Logging out...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>User has been logged out successfully.</div>;
};

export default UserLogout;
