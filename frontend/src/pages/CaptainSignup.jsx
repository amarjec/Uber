// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom' 
// import { CaptainDataContext } from './../context/CaptainContext';
// import axios from 'axios';

// const CaptainSignup = () => {

//   const [ email, setEmail ] = useState('')
//   const [ password, setPassword ] = useState('')
//   const [ firstName, setFirstName ] = useState('')
//   const [ lastName, setLastName ] = useState('')

//   const [ vehicleColor, setVehicleColor ] = useState('')
//   const [ vehiclePlate, setVehiclePlate ] = useState('')
//   const [ vehicleCapacity, setVehicleCapacity ] = useState('')
//   const [ vehicleType, setVehicleType ] = useState('')

//   const {captain, setCaptain } = React.useContext(CaptainDataContext);


//   const navigate = useNavigate()



//   const submitHandler = async (e) => {
//     e.preventDefault()
    
//     const captainData = {
//       fullname: {
//         firstname: firstName,
//         lastname: lastName
//       },
//       email: email,
//       password: password,
//       vehicle: {
//         color: vehicleColor,
//         plate: vehiclePlate,
//         capacity: vehicleCapacity,
//         vehicleType: vehicleType
//       }
//   }

//   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

//   if(response.status === 201) {
//     const data = response.data
//     setCaptain(data.captain)
//     localStorage.setItem('token', data.token)
//     navigate('/captain-home')
//   }


//     setEmail('')
//     setFirstName('')
//     setLastName('')
//     setPassword('')
//     setVehicleColor('')
//     setVehiclePlate('')
//     setVehicleCapacity('')
//     setVehicleType('')

//   }
//   return (
//     <div className='py-5 px-5 h-screen flex flex-col justify-between'>
//       <div>
//       <img className='w-16 mb-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

//         <form onSubmit={(e) => {
//           submitHandler(e)
//         }}>

//           <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
//           <div className='flex gap-4 mb-7'>
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
//               type="text"
//               placeholder='First name'
//               value={firstName}
//               onChange={(e) => {
//                 setFirstName(e.target.value)
//               }}
//             />
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
//               type="text"
//               placeholder='Last name'
//               value={lastName}
//               onChange={(e) => {
//                 setLastName(e.target.value)
//               }}
//             />
//           </div>

//           <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
//           <input
//             required
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value)
//             }}
//             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//             type="email"
//             placeholder='captain@email.com'
//           />

//           <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

//           <input
//             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value)
//             }}
//             required type="password"
//             placeholder='password'
//           />

//           <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
//           <div className='flex gap-4 mb-7'>
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
//               type="text"
//               placeholder='Vehicle Color'
//               value={vehicleColor}
//               onChange={(e) => {
//                 setVehicleColor(e.target.value)
//               }}
//             />
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
//               type="text"
//               placeholder='Vehicle Plate'
//               value={vehiclePlate}
//               onChange={(e) => {
//                 setVehiclePlate(e.target.value)
//               }}
//             />
//           </div>
//           <div className='flex gap-4 mb-7'>
//             <input
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
//               type="number"
//               placeholder='Vehicle Capacity'
//               value={vehicleCapacity}
//               onChange={(e) => {
//                 setVehicleCapacity(e.target.value)
//               }}
//             />
//             <select
//               required
//               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
//               value={vehicleType}
//               onChange={(e) => {
//                 setVehicleType(e.target.value)
//               }}
//             >
//               <option value="" disabled>Select Vehicle Type</option>
//               <option value="car">Car</option>
//               <option value="auto">Auto</option>
//               <option value="bike">Bike</option>
//             </select>
//           </div>

//           <button
//             className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//           >Create Captain Account</button>

//         </form>
//         <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
//       </div>
//       <div>
//         <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
//           Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
//       </div>
//     </div>
//   )
// }

// export default CaptainSignup



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from './../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    vehicleColor: '',
    vehiclePlate: '',
    vehicleCapacity: '',
    vehicleType: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear any previous error message

    const { email, password, firstName, lastName, vehicleColor, vehiclePlate, vehicleCapacity, vehicleType } = formData;

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="logo" />
        
        <form onSubmit={submitHandler}>
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              name="firstName"
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              required
              name="lastName"
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            required
            name="email"
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='captain@email.com'
            value={formData.email}
            onChange={handleInputChange}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            name="password"
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            value={formData.password}
            onChange={handleInputChange}
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              name="vehicleColor"
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={formData.vehicleColor}
              onChange={handleInputChange}
            />
            <input
              required
              name="vehiclePlate"
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={formData.vehiclePlate}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex gap-4 mb-7'>
            <input
              required
              name="vehicleCapacity"
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={formData.vehicleCapacity}
              onChange={handleInputChange}
            />
            <select
              required
              name="vehicleType"
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={formData.vehicleType}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button
            disabled={loading}
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >
            {loading ? 'Creating Account...' : 'Create Captain Account'}
          </button>

        </form>
        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  );
}

export default CaptainSignup;
