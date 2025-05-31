import React from 'react'

const Conversation = () => {
  return (
    <>
    <div className='flex  gap-2  items-center  hover:bg-sky-500  rounded-lg p-2 py-1 cursor-pointer'>
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src="https://placeimg.com/192/192/people" alt="User Avatar" />
            </div>

        </div>

        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='text-gray-200 text-sm font-bold'>John Doe</p>
                <span className='text-xl'>

                </span>
            </div>

        </div>
    </div>

    <div className='divider my-0 py-0 h-1'/>
    </>
  )
}

export default Conversation