import React from 'react'
import GenderCheckBox from './GenderCheckBox';

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className="w-full p-6  rounded-lg shadow-md  text-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  ">
        <h1 className='text-3xl font-semibold text-center text-gray-300'> 
          CREATE ACCOUNT
          <span className='text-blue-500'> KwikChat</span>
        </h1>

        <form >
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text"
                   placeholder='Enter Name'
                   className='w-full input input-bordered h-10'/>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text"
                   placeholder='Borat'
                   className='w-full input input-bordered h-10'/>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password"
                   placeholder='Enter  Password'
                   className='w-full input input-bordered h-10'/>
          </div>

          <div className='mb-2'>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password"
                   placeholder='Confirm  Password'
                   className='w-full input input-bordered h-10'/>
          </div>

          <GenderCheckBox />


          <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account? <span className='text-blue-500'>Login</span>
          </a>
          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>


        </form>
      </div>
    </div>

  )
}

export default SignUp;