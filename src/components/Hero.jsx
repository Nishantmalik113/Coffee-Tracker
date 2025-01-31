import React from 'react'
import Button from './Button'

export default function Hero() {
  return (
    <div className='flex flex-col justify-center py-10 border-t-3 border-dashed border-brown'>
      <div className='px-10 gap-5 lg:gap-20'>
        <div className=' flex flex-col gap-10 
        items-center justify-center text-center max-w-[800px] 
        w-full mx-auto pb-4'>
          <div className='flex flex-col gap-4'>
            <p className='sm:text-xs md:text-sm lg:text-md'>Coffee Tracker for Coffee <abbr title="An enthusiast or addict">Fiends</abbr>!</p>
            <img className='max-w-[250px] mx-auto' src="/public/Coffee-Logo.png" alt="" />
            <h1 className=' splheading text-brown uppercase font-semibold text-3xl
            sm:text-3xl md:text-4xl lg:text-5xl'>Caffiend</h1>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-5 p-4 
        items-center justify-center text-center max-w-[800px] 
        w-full mx-auto'>
        <p className='text-xs md:text-sm font-normal'>
          I hereby acknowledgement that I may become unstoppable
          <span className='text-brown font-medium'>  caffeine-fueled powerhouse </span> 
          capable of tracking every espresso shot, afflicted with an unrelenting
          <span className='text-brown font-medium'>  obsession for the perfect brew </span>
        </p>
        <Button func={()=>{
            window.location.href = '#CoffeeForm'
          }} text={"Try Now"}></Button>
      </div>
    </div>
  )
}
