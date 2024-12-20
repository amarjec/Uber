// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserDataContext } from "../context/UserContext";
// import axios from "axios";

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userData, setUserData] = useState({});

//   const navigate = useNavigate();

//   const { user, setUser } = useContext(UserDataContext);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const userData = {
//       email: email,
//       password: password,
//     };

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/users/login`,
//         userData
//       );

//       if (response.status === 200) {
//         const data = response.data;

//         setUser(data.user); // Set user data in context
//         localStorage.setItem("token", data.token); // Save user data in local storage
//         navigate("/home"); // Navigate to home page upon successful login
//       }
//     } catch (error) {
//       console.error("Error during Login:", error);
//     }

//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div className="p-7 h-screen flex flex-col justify-between">
//       <div>
//         <img
//           className="w-16 mb-10"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
//           alt=""
//         />

//         <form
//           onSubmit={(e) => {
//             submitHandler(e);
//           }}
//         >
//           <h3 className="text-lg font-medium mb-2">What's your email</h3>
//           <input
//             required
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
//             type="email"
//             placeholder="user@email.com"
//           />

//           <h3 className="text-lg font-medium mb-2">Enter Password</h3>

//           <input
//             className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             required
//             type="password"
//             placeholder="password"
//           />

//           <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
//             Login
//           </button>
//         </form>
//         <p className="text-center">
//           New here?{" "}
//           <Link to="/signup" className="text-blue-600">
//             Create a new account
//           </Link>
//         </p>
//       </div>
//       <div>
//         <Link
//           to="/captain-login"
//           className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
//         >
//           Sign in as Captain
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;






import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    setErrorMessage(""); // Clear any previous error messages

    const userData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user); // Set user data in context
        localStorage.setItem("token", data.token); // Save user data in local storage
        navigate("/home"); // Navigate to home page upon successful login
      }
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again."); // Set error message
      console.error("Error during Login:", error);
    } finally {
      setLoading(false); // Reset loading state once the request is complete
    }

    // Optionally reset form fields after submission, if desired
    // setEmail("");
    // setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="Logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="user@email.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          {/* Show loading state */}
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Display error message if login fails */}
          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}
        </form>

        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create a new account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;

