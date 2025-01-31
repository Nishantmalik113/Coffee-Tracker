import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '../context/AuthContext'
import { auth } from '../../firebase'
import { use } from 'react'

export default function Authentication(props) {
  const {handleCloseModal} = props
  const [resetModal, setResetModal] = useState(false)
  const [isResetEmailSent ,setIsResetEmailSent] =useState(false)
  const [isRegistration, setIsRegistration] = useState(false)
  const [email, setEmail] = useState('')
  const [Resetemail, setResetEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState(null)
  const {login, signUp, resetPassword} = useAuth()

  async function handlePasswordReset() {
    setResetModal(true)
    if(!Resetemail || !Resetemail.includes('@')|| isAuthenticating){
      return
    }
    try{
      setError(null)
      await resetPassword(Resetemail)
    }catch(err){
      console.log(err.message)
      setError(err.message)
    }finally{
      setIsResetEmailSent(true)
    }
  }

  async function handleAuthenticate() {
    try{
      setIsAuthenticating(true)
      setError(null)
      if(isRegistration){
        // register a user
        await signUp(email, password)
      }
      else{
        // login a user
        await login(email, password)
      }
      handleCloseModal()
    }catch(err){
      console.log(err.message)
      setError(err.message)
    }finally{
      setIsAuthenticating(false)
    }

  }
  
  return (
    <section id='authentication' className='flex flex-col gap-2'>
      {!resetModal&& (<div className='flex flex-col gap-3'>
        <h2 className='pt-0 text-xl font-semibold'>{isRegistration? 'Sign Up' : 'Login'}</h2>
        <p>{isRegistration? 'Create An Account' : "Login to your account"}</p>
        {error && (<p>❌{error}</p>)}
        <input value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />
        <input value={password} type="password" placeholder='**********' onChange={(e)=>{setPassword(e.target.value)}} />
        {!isRegistration && (<button onClick={handlePasswordReset}><p className='text-sm text-brown font-normal w-fit mx-auto hover:cursor-pointer 
        hover:underline'>Forgot Password ?</p></button>)}
        <button onClick={handleAuthenticate} 
        className='my-3  text-sm border-2 border-brown font-light px-5 rounded bg-brown text-white py-1 w-fit mx-auto'>
          {isAuthenticating? 'Authenticating...':"Submit"}
          </button>
        <hr />
      </div>)}
      {!resetModal&&(<div className=' flex flex-col gap-0 items-center'>
        <p>{isRegistration? 'Already Have an Account' : `Don't have an account?`}</p>
        <button onClick={()=>{setIsRegistration(!isRegistration)}}><p className='text-sm text-brown font-normal 
        px-5 py-1 w-fit mx-auto hover:cursor-pointer 
        hover:underline'>{isRegistration? 'Login' : 'Sign Up'}</p></button>
      </div>)}
    {resetModal && (<div className='flex flex-col gap-3 modal-reset'>
      <h2 className='pt-0 text-xl font-semibold'>Reset Password</h2>
      <p>Enter Your Email ID :</p>
      <input value={Resetemail} placeholder='Email' onChange={(e)=>{setResetEmail(e.target.value)}} />
      <button onClick={handlePasswordReset} 
        className='my-3  text-sm border-2 border-brown font-light px-5 rounded bg-brown text-white py-1 w-fit mx-auto'>
          Submit
      </button>
      {isResetEmailSent &&(<p className='text-green-400'>Password reset email Sent Successfully</p>)}
      {isResetEmailSent &&(<p className='text-center'>Click Outside the box to exit !!!!</p>)}
      </div>)}
    </section>
  )
}
