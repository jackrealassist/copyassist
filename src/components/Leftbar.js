import React from 'react'
import { SendOutlined } from '@ant-design/icons';

const Leftbar = () => {
  return (
    <div className='leftbar flex flex-col bg-white gap-32 flex-3 p-5'>
    <div className='flex items-center justify-center'>
      <img src='https://assets-global.website-files.com/652734407bac4b958e9aee3c/652749ab9b047e909c9fda96_realassistlogo.svg' alt='Main Logo'/>
    </div>
    <div className=' flex items-center justify-center gap-4 bg-gray-200 rounded-xl p-2 px-10'>
       <SendOutlined style={{fontSize:"1rem", padding:"0.5rem", color:"white"}} className=' flex items-center justify-center font-bold bg-blue-500 rounded-full h-7 w-7'/>
        <p className=' text-lg font-normal font-sans'>CopyAssist</p>
    </div>
    </div>
  )
}

export default Leftbar
