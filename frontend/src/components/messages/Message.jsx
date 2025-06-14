import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src="" alt="chat bubble component" />
            </div>
        </div>

        <div className={'chat-bubble rounded-full text-white bg-blue-500'}>Hii!! what is up??</div>
        <div className={'chat-footer opacity-50 text-xs flex gap-1 item-center'}>12:42</div>
    </div>
  )
}

export default Message