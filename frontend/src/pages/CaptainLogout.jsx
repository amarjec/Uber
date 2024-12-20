// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const CaptainLogout = () => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const token = localStorage.getItem('captain-token');
//     const navigate = useNavigate();

//     useEffect(() => {
//         // If there's no token, we should not proceed with logout
//         if (!token) {
//             console.log('No token found, redirecting to login...');
//             navigate('/captain-login');
//             return;
//         }

//         // Make the logout API request
//         axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((response) => {
//             if (response.status === 200) {
//                 console.log('Logout successful, removing token...');
//                 localStorage.removeItem('captain-token');
//                 navigate('/captain-login');
//             } else {
//                 setError('Logout failed. Please try again.');
//                 console.log('Unexpected status code:', response.status);
//             }
//         })
//         .catch((err) => {
//             setError('Logout failed. Please try again.');
//             console.error('Logout request failed:', err);
//         })
//         .finally(() => {
//             setLoading(false); // Ensure loading state is turned off once request completes
//         });
//     }, [token, navigate]); // Dependencies: rerun effect if token or navigate changes

//     if (loading) {
//         return <div>Logging out...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>Logging out...</div> // You can replace this with a more appropriate UI if needed
//     );
// }

// export default CaptainLogout;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track any error during logout

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem('token');  // Get the token from localStorage

      if (token) {
        try {
          // Call the API to logout the captain
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            localStorage.removeItem('token');  // Remove the token from localStorage
            setLoading(false);  // Set loading state to false
            navigate('/captain-login');  // Redirect to Captain Login page
          }
        } catch (error) {
          console.error('Error during Captain Logout:', error);

          // Set error state if there's an error
          setLoading(false);
          setError('Logout failed. Please try again.');

          // Optionally, you could remove the token even on failure (depending on your use case)
          localStorage.removeItem('token');  
          navigate('/captain-login');  // Redirect to Captain Login page
        }
      } else {
        setLoading(false);  // Set loading state to false if no token exists
        navigate('/captain-login');  // If there's no token, redirect to login page
      }
    };

    logout();  // Execute the logout function when the component mounts
  }, [navigate]);  // Dependency array to ensure it runs only once when the component mounts

  // If there's a loading state or error, we show that before rendering the component
  if (loading) {
    return <div>Logging out...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;  // If logout is successful and no errors, render nothing
};

export default CaptainLogout;




















