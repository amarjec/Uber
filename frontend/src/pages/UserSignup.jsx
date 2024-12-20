// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { UserDataContext } from "../context/UserContext"; // Import UserDataContext

// const UserSignup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userData, setUserData] = useState({});

//   const navigate = useNavigate();

//   // Use useContext to access user and setUser from the context
//   const { user, setUser } = useContext(UserDataContext); // Access context here

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const newUser = {
//       fullname: {
//         firstname: firstName,
//         lastname: lastName,
//       },
//       email: email,
//       password: password,
//     };

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/users/register`,
//         newUser
//       );

//       if (response.status === 201) {
//         const data = response.data;

//         setUser(data.user); // Set user data in context
//         localStorage.setItem("token", data.token); // Save user data in local storage
//         navigate("/home"); // Navigate to home page upon successful signup
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//     }

//     setEmail("");
//     setFirstName("");
//     setLastName("");
//     setPassword("");
//   };

//   return (
//     <div>
//       <div className="p-7 h-screen flex flex-col justify-between">
//         <div>
//           <img
//             className="w-16 mb-10"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
//             alt="Logo"
//           />

//           <form onSubmit={submitHandler}>
//             <h3 className="text-lg w-1/2 font-medium mb-2">What's your name</h3>
//             <div className="flex gap-4 mb-7">
//               <input
//                 required
//                 className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
//                 type="text"
//                 placeholder="First name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               <input
//                 required
//                 className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
//                 type="text"
//                 placeholder="Last name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </div>

//             <h3 className="text-lg font-medium mb-2">What's your email</h3>
//             <input
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
//               type="email"
//               placeholder="user@email.com"
//             />

//             <h3 className="text-lg font-medium mb-2">Enter Password</h3>
//             <input
//               className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               type="password"
//               placeholder="password"
//             />

//             <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
//               Create Account
//             </button>
//           </form>

//           <p className="text-center">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600">
//               Login here
//             </Link>
//           </p>
//         </div>
//         <div>
//           <p className="text-[10px] leading-tight">
//             This site is protected by reCAPTCHA and the{" "}
//             <span className="underline">Google Privacy Policy</span> and{" "}
//             <span className="underline">Terms of Service apply</span>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSignup;










import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext"; // Import UserDataContext

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(""); // State to hold any error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Use useContext to access user and setUser from the context
  const { user, setUser } = useContext(UserDataContext); // Access context here

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    try {
      setIsLoading(true); // Set loading state to true
      setError(""); // Reset error state before sending request

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;

        setUser(data.user); // Set user data in context
        localStorage.setItem("token", data.token); // Save user data in local storage
        navigate("/home"); // Navigate to home page upon successful signup
      }
    } catch (error) {
      setError("An error occurred during signup. Please try again."); // Display error message
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
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
          <h3 className="text-lg w-1/2 font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="password"
          />

          {error && <p className="text-red-600 mb-4">{error}</p>} {/* Display error if any */}

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Creating Account..." : "Create Account"} {/* Show loading text */}
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
