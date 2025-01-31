import React from 'react'
import { calculateCurrentCaffeineLevel, getCaffeineAmount, timeSinceConsumption } from '../utils'
import { useAuth } from '../context/AuthContext'


export default function History() {

  const {globalData} = useAuth()

  return (
    <section id='History' className='flex flex-col gap-3 items-center pt-10 pb-15 border-t-3 border-dashed border-brown'>
      <div className='flex items-center text-2xl sm:text-3xl md:text-4xl 
      gap-2 justify-center w-full'>
        <i className='fa-solid fa-timeline'></i>
        <h2>History</h2>
      </div>
      <p><i>Hover for more information!</i></p>
      <div className='coffee-history px-10'>
        {Object.keys(globalData).sort((a,b)=> b-a).map((utcTime, coffeeIndex)=>{
          
          const coffee = globalData[utcTime]
          const timeSinceConsumed = timeSinceConsumption(utcTime)
          const originalAmount = getCaffeineAmount(coffee.name)
          const remainingAmount = calculateCurrentCaffeineLevel({
            [utcTime]: coffee
          })

          const summary = `${coffee.name} | ${timeSinceConsumed} | $${coffee.cost} | ${remainingAmount}mg / ${originalAmount}mg `

          return(
            <div title={summary} key={coffeeIndex}>
              <i className='fa-solid fa-mug-hot' />
            </div>
          )
        })}
      </div>
    </section>
  )
}
