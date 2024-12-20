// import React, { useContext, useEffect, useState } from "react";
// import { UserDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

// const UserProtectWrapper = ({ children }) => {
//   const token = localStorage.getItem("token"); // Save user data in local storage
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(UserDataContext);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }
//     axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(response => {
//       if (response.status === 200) {
//         setUser(response.data.user)
//         setIsLoading(false)
//       }
//     }).catch(err => {
//         localStorage.removeItem('token')
//         navigate('/login')
//         return null
//       })
// }, [ token ])

// if (isLoading) {
// return (
//     <div>Loading...</div>
// )
// }


//   return <>{children}</>;
// };

// export default UserProtectWrapper;


import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setError("Failed to load user data.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;

