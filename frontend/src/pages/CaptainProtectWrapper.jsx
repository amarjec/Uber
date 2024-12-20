// import React, { useContext, useEffect, useState } from "react";
// import { CaptainDataContext } from "../context/CaptainContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CaptainProtectWrapper = ({ children }) => {
  
//   const token = localStorage.getItem('token')
//   const navigate = useNavigate()
//   const { captain, setCaptain } = useContext(CaptainDataContext)
//   const [ isLoading, setIsLoading ] = useState(true)


//   useEffect(() => {
//     if (!token) {
//       navigate('/captain-login')
//     }

//     axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(response => {
//       if (response.status === 200) {
//         setCaptain(response.data.captain)
//         setIsLoading(false)
//       }
//     }).catch(err => {
//         localStorage.removeItem('token')
//         navigate('/captain-login')
//       })
// }, [ token ])

// if (isLoading) {
//   return (
//       <div>Loading...</div>
//   )
// }


//   return <>{children}</>;
// };

// export default CaptainProtectWrapper;



import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return; // If no token, redirect immediately
    }

    // Make the API call to fetch captain profile
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.status === 200) {
        setCaptain(response.data.captain);
        setIsLoading(false);
      }
    })
    .catch(err => {
      localStorage.removeItem('token');  // Remove invalid token
      setErrorMessage('Session expired or invalid token. Please log in again.');
      setIsLoading(false);  // Stop loading and show error
      navigate('/captain-login');  // Redirect to login
    });
  }, [token, navigate, setCaptain]);  // Ensure effect runs correctly on token changes

  if (isLoading) {
    return <div>Loading...</div>;  // Or show a spinner if preferred
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;  // Display error message to the user
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
