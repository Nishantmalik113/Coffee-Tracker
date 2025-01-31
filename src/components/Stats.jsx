import React from 'react'
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, getTopThreeCoffees, statusLevels } from '../utils'
import { useAuth } from '../context/AuthContext'

function StatsCard(props) {
  const{ lg, title, children} = props
 
  return(
    <div className={'flex flex-col gap-2 p-6 rounded-md stat-card ' + (lg ? ' col-span-2' : ' ')}>
      <h4 className='text-lg lg:text-xl'>{title}</h4>
      {children}
    </div>
    
  )
}

export default function Stats() {
  const {globalData} = useAuth()
  const stats = calculateCoffeeStats(globalData)

  const caffieneLevel = calculateCurrentCaffeineLevel(globalData)
  const warningLevel = caffieneLevel < statusLevels['low'].maxLevel ? 'low' : caffieneLevel < statusLevels['moderate'].maxLevel ? 'moderate' : 'high'

  return (
    <section id='Stats' className='border-t-3 border-dashed border-brown flex flex-col justify-center gap-5 p-5'>
      <div className='flex items-center text-2xl sm:text-3xl md:text-4xl 
      gap-2 justify-center w-full'>
        <i className='fa-solid fa-chart-simple'></i>
        <h2>Stats</h2>
      </div>
      <div className='grid grid-cols-2 gap-5 px-10 '>
        <StatsCard lg title='Active Caffiene Level'>
          <div className='flex gap-10'>
            <p><span className='p-0.25 text-4xl leading-none font-normal'>{caffieneLevel}</span> mg</p>
            <h5 className='max-w-fit max-h-fit p-1 my-auto rounded-sm' style={{ color: statusLevels[warningLevel].color,
              background: statusLevels[warningLevel].background}}>{warningLevel}</h5>
          </div>
          <p className='text-brown text-sm'>*{statusLevels[warningLevel].description}</p>
        </StatsCard>
        <StatsCard title='Daily Caffiene'>
          <p><span className='p-0.25 text-2xl lg:text-3xl leading-none font-normal'>{stats.daily_caffeine}</span> mg</p>
        </StatsCard>
        <StatsCard title='Avg # of Coffee'>
        <p><span className='p-0.25 text-2xl lg:text-3xl leading-none font-normal'>{stats.average_coffees}</span></p>
        </StatsCard>
        <StatsCard title='Daily Cost ($)'>
        <p>$ <span className='p-0.25 text-2xl lg:text-3xl leading-none font-normal'>{stats.daily_cost}</span></p>
        </StatsCard>
        <StatsCard title='Total Cost ($)'>
        <p>$ <span className='p-0.25 text-2xl lg:text-3xl leading-none font-normal'>{stats.total_cost}</span></p>
        </StatsCard>
        <table className='col-span-2'>
          <thead>
            <tr>
              <th>Coffee Name</th>
              <th>Number of Purchase</th>
              <th>Percentage of Total</th>
            </tr>
          </thead>
          <tbody>
            {getTopThreeCoffees(globalData).map((coffee, coffeeIndex)=>{
              return(
                <tr key={coffeeIndex} className='stat-tr'>
                  <td>{coffee.coffeeName}</td>
                  <td>{coffee.count}</td>
                  <td>{coffee.percentage}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
