import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from './../components/WaitingForDriver';

const Home = () => {
  const [ pickup, setPickup ] = useState('')
  const [ destination, setDestination ] = useState('')
  const [ panelOpen, setPanelOpen ] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)


  const panelOpenRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const WaitingForDriverRef = useRef(null)



  const submitHandler = (e) => {
    e.preventDefault()
  }


// animation for panel open and close 
  useGSAP( () => {
    if(panelOpen)  {
      gsap.to(panelOpenRef.current, {
        duration: 0.5,
        ease: 'power3.inOut',
        height: '70%',
        // opacity: 1,
        padding: '20'
      }) 
      gsap.to(panelCloseRef.current, {
        duration: 0.5,
        ease: 'power3.inOut',
        opacity: 1
      })
    } else {
      gsap.to(panelOpenRef.current, {
        duration: 0.5,
        ease: 'power3.inOut',
        height: '0%',
        // opacity: 0,
        padding: '0'
      })
      gsap.to(panelCloseRef.current, {
        duration: 0.5,
        ease: 'power3.inOut',
        opacity: 0
      })
    }
  },[panelOpen])

  // animation for vehicle panel
  useGSAP(function () {
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ vehiclePanel ])

// animation for confirm ride panel
  useGSAP(function () {
    if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ confirmRidePanel ])

// animation for looking for driver panel
useGSAP(function () {
  if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ vehicleFound ])

// animation for waiting for driver panel
useGSAP(function () {
  if (waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(WaitingForDriverRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ waitingForDriver ])






  return (
    <>

    <div className=' w-full h-screen relative'>

      {/* uber logo with position absolute */}
      <img className='w-28 absolute top-2 left-2 ' src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=800" alt="" />      

          {/* map image for temporary purpose */}
      <div className=''>
        <img className='w-full h-screen' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>


      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>




        {/* pickup/destination panel */}
        <div className='h-[30%] p-6 bg-white relative rounded-lg'>
          <h5 className='absolute opacity-1 right-6 top-6 text-2xl'>
            <i 
            ref={panelCloseRef}
            onClick={() => setPanelOpen(!panelOpen)}
            className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }} className='relative py-3'>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onClick={() => setPanelOpen(true)}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                type="text"
                placeholder='Add a pick-up location'
              />
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onClick={() => setPanelOpen(true)}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                type="text"
                placeholder='Enter your destination' />
          </form>
        </div>

        {/* Location search panel */}
        <div className=' h-[70%] bg-white opacity-1'
          ref={panelOpenRef}>
            <LocationSearchPanel setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen}/>
        </div>

        {/* Vehicle panel */}
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
        </div>

        {/* Confirm ride panel */}
        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
           <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound = {setVehicleFound}  setVehiclePanel={setVehiclePanel} />
        </div>

        {/* Looking for driver panel */}
        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
           <LookingForDriver  setVehicleFound = {setVehicleFound}  />
        </div>

        {/* waiting for driver panel */}
        <div ref={WaitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
           <WaitingForDriver  setWaitingForDriver = {setWaitingForDriver} />
        </div>






      </div>


    </div>
 



    </>
  )
}

export default Home