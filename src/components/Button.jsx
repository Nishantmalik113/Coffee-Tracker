import React from 'react'

export default function Button(props) {
    const { text, func } = props
    return (
    <div>
        <button onClick={func} className='px-7 text-md py-3 rounded-sm border-[2px] bg-brown 
        border-brown border-solid zincshadow duration-200 text-white'>
            <p>{text}</p>
        </button>
    </div>
  )
}
