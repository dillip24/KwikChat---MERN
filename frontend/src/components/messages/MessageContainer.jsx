import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

import {TiMessages} from 'react-icons/ti'

const MessageContainer = () => {
  const noChatSelected = false; // variable should be lowercase

  return (  
    <div className='md:min-w-[450px] flex flex-col'>
      {noChatSelected ? (
        <NoChatSelected />
      ) : ( 
        <>
          {/* Header */}
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To: <span className='font-bold text-gray-900'>John Doe</span></span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <p className='text-gray-500 text-lg'>Select a chat to start messaging</p>
      <TiMessages className='text-6xl text-gray-400 mt-4' />
    </div>
  )
}