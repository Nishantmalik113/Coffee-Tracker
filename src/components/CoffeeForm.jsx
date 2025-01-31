import React from 'react'
import {useState} from 'react'
import { coffeeOptions } from '../utils'
import Modal from './Modal'
import Authentication from './Authentication'
import { useAuth } from '../context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'


export default function CoffeeForm(props) {
  const {isAuthenticated} = props
  const [showModal, setShowModal] = useState(false)
  const [selectedCoffee, setSelectedCoffee] = useState(null)
  const [showCoffeeTypes, setshowCoffeeTypes] = useState(false)
  const [coffeeCost, setCoffeeCost] = useState(0)
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)

  const {globalData, setGlobalData, globalUser} = useAuth()

  async function handleSubmitForm() {
    if(!isAuthenticated){
      setShowModal(true)
      return
    }
    //define a guard clause that only submits form if it is complete
    if(!selectedCoffee){
      return
    }

    try{
      //then we are going to create a new dada object
      const newGlobalData = {
        ...(globalData || {})
      }

      const nowTime = Date.now()

      const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 100)

      const timeStamp = nowTime - timeToSubtract
      const newData ={
        name: selectedCoffee,
        cost: coffeeCost
      }
      newGlobalData[timeStamp]= newData
      console.log(selectedCoffee, coffeeCost, timeStamp)

      // update the global state
      setGlobalData(newGlobalData)
      // persist the data in the firebase firestore
      const userRef = doc(db , 'users', globalUser.uid)
      const res = await setDoc(userRef, {
        [timeStamp]: newData
      },{ merge: true })
      setSelectedCoffee(null)
      setHour(0)
      setMin(0)
      setCoffeeCost(0)
    }catch(err){
      console.log(err.message)
    }finally{

    }
    
  }

  return (
    <section id='CoffeeForm' className='flex flex-col gap-3 items-center justify-center pt-10 pb-15 border-t-3 border-dashed border-brown'>
      {showModal && (<Modal handleCloseModal={()=>{setShowModal(false)}}>
              <Authentication handleCloseModal={()=>{setShowModal(false)}}/>
            </Modal>)}
      <div className='flex items-center text-2xl sm:text-3xl md:text-4xl  
      gap-2 justify-center w-full'>
        <i className=' fa-solid fa-pencil' />
        <h1>Start Tracking Today</h1>
      </div>
      <h2 className='text-xl'>Select Coffee Type</h2>
      <div className='w-full px-5 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10'>
        {coffeeOptions.slice(0,5).map((option, optionIndex)=>{
          return(
            <button onClick={()=>{
              setSelectedCoffee(option.name)
              setshowCoffeeTypes(false)
            }} className={'Button-card ' + (option.name===selectedCoffee ? ' Button-card-selected' : ' ')} key={optionIndex}>
              <h4 className='text-[12px] md:text-md lg:text-lg '>{option.name}</h4>
              <p className='text-[10px] lg:text-sm'>{option.caffeine}mg</p>
            </button>
          )
        })}
        <button className={'Button-card ' + (showCoffeeTypes ? ' Button-card-selected' : ' ')} onClick={()=>{
          setshowCoffeeTypes(true)
          setSelectedCoffee(null)
        }}>
          <h4 className='text-[12px] md:text-md lg:text-lg '>Other</h4>
          <p className='text-[10px] lg:text-sm'>n/a</p>
        </button>
      </div>
      <div className='px-5'>
        {showCoffeeTypes &&(
            <select onChange={(e)=>{
              setSelectedCoffee(e.target.value)
            }} name="coffee-list" id="coffee-list" className='mt-5 p-2 bg-CoffeeBg1 
            border-brown border-2 rounded-3xl md:text-sm w-full md:w-[600px] lg:w-[900px]'>
            <option value={null}>Select Type</option>
            {coffeeOptions.map((option, optionIndex)=>{
              return(
                <option value={option.name} key={optionIndex}>
                  {option.name} ({option.caffeine} mg)
                </option>
              )
            })}
          </select>
        )}
      </div>  
      <div className='flex gap-10 w-full md:w-[600px] lg:w-[900px] px-5'>
        <h4 className='p-2 text-xs sm:text-sm md:text-md'>Add the Cost ($)</h4>
        <input type="number" value={coffeeCost} onChange={(e)=>{
          setCoffeeCost(e.target.value)
        }} className=' rounded-lg p-2 border-brown border-2' placeholder='4.50' />
      </div>
      <div className='grid grid-col w-full md:w-[600px] lg:w-[900px] px-5'>
        <h4 className='p-2 text-xs sm:text-sm md:text-md '>Time Since Consumption:</h4>
        <div className='grid grid-cols-2 gap-10'> 
          <div className='flex gap-2'>
            <h6 className='p-2 text-xs sm:text-sm md:text-md'>Hours</h6>
            <select onChange={(e)=>{
            setHour(e.target.value)
          }} name="hours-select" id="hours-select" className='border-brown border-2 w-full rounded-lg p-2'>
              {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
              20,21,22,23].map((hour, hourindex)=>{
                return(
                  <option value={hour} key={hourindex}>{hour}</option>
                )
              })}
            </select>
          </div>
          <div className='flex gap-2'>
            <h6 className='p-2 text-xs sm:text-sm md:text-md'>Mins</h6>
            <select onChange={(e)=>{
            setMin(e.target.value)
          }} name="mins-select" id="mins-select" className='w-full border-brown border-2 rounded-lg p-2'>
              {[0,5,10,15,30,45].map((min, minindex)=>{
                return(
                  <option value={min} key={minindex}>{min}</option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      <button onClick={handleSubmitForm} 
      className='text-md border-2 border-brown font-light px-5 rounded bg-brown text-white py-1 zincshadow'>
        Add Entry
      </button> 
    </section>
  )
}
