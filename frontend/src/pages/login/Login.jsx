import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className="w-full p-6  rounded-lg shadow-md  text-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  ">
        <h1 className='text-3xl font-semibold text-center text-gray-300'> 
          LOGIN
          <span className='text-blue-500'> KwikChat</span>
        </h1>


        <form >
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder="Enter your username" className="input input-bordered w-full max-w-xs bg-gray-800 text-gray-300" />

          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password"
            placeholder='Enter Password'
            className='w-full input input-bordered h-10' />
          </div>

          <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account? <span className='text-blue-500'>Sign Up</span>
          </a>


          <div>
            <button className='btn btn-block btn-sm mt-2'>Login</button>
          </div>


        </form>

      </div>

    </div>
  )
}

export default Login