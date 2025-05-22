import React from 'react'
import Authpage from './Authpage'
import loginBg from "../../public/loginBg.png"

const Login = () => {
  
  return (
    <>
      {/* <h1 className='hidden md:flex justify-center text-purple-600 text-3xl pt-10 text-center p-10 uppercase'>Wellcome to Employee-Management-System</h1> */}
      {/* <h1 className='md:hidden text-purple-600 text-4xl text-center p-10 uppercase'>Wellcome to EMS</h1> */}
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center">
      
        {/* Left Side - Illustration */}
        <div className="w-full hidden md:flex md:w-1/2 flex justify-center p-6">
          <img
            src={loginBg} 
            alt="Login Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6">
          <Authpage />
        </div>
      </div>
    </div>
    </>
  )
}

export default Login