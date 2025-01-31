import React, { useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import Authentication from './Authentication'
import { useAuth } from '../context/AuthContext'

export default function Layout(props) {
  
  const {children}=props
  const [showModal, setShowModal] = useState(false)
  const {globalUser, logOut} = useAuth()
  const header = (
    <header className='flex items-center 
    justify-between px-10 py-3 bg-CoffeeBg1 text-sm font-semibold sm:text-base'>
      <a href='/'><h1 className='font-medium cursor-pointer text-lg'><i className='text-brown fa-solid fa-mug-hot'></i><span 
      className='text-brown bold text-lg'> Caffiend</span></h1></a>
      {globalUser?(<button onClick={logOut} 
      className='text-sm border-2 border-brown font-light px-5 rounded bg-brown text-white py-1 zincshadow'>
        Logout
        </button>) : (<button onClick={()=>{setShowModal(true)}} 
      className='flex gap-1 items-center text-sm border-2 border-brown font-light px-5 rounded bg-brown text-white py-1 zincshadow'>
        Sign In
        <i className='fa-solid fa-mug-hot'></i>
        </button>)}
    </header>
  )

  const footer = (
    <footer className='flex flex-col items-center mx-auto p-4 bg-CoffeeBg1 text-sm font-semibold sm:text-base text-align: center'>
      <p> <abbr title="Coffee-Tracker">Caffiend</abbr> was made by <a className='text-brown underline' target='_black' href="https://www.linkedin.com/in/nishantmalik113">Nishant Malik</a>. Check out the project on <a className='text-brown underline' target='_black' href="https://www.github.com/nishantmalik113">Github</a>!</p>
    </footer>
  )
  
  return (
    <>  
        {showModal && (<Modal handleCloseModal={()=>{setShowModal(false)}}>
          <Authentication handleCloseModal={()=>{setShowModal(false)}}/>
        </Modal>)}
        {header}
        <main className='min-h-screen flex flex-col bg-CoffeeBg1 text-sm font-semibold sm:text-base'>
          {children}
        </main> 
        {footer}
    </>
  )
}
