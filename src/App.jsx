import React, { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/Layout'
import Hero from './components/Hero'
import CoffeeForm from './components/CoffeeForm'
import Stats from './components/Stats'
import History from './components/History'
import { useAuth } from './context/AuthContext'
import { coffeeConsumptionHistory } from './utils'

function App() {
  const {globalUser, isLoading , globalData} = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length

  const AuthenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )


  return (
    <>
      <Layout>
        {!isAuthenticated && (<Hero />)}
        <CoffeeForm isAuthenticated={isAuthenticated} />
        {(isLoading && isAuthenticated) && (
          <p>Loading Data.....</p>
        )}
        {(isAuthenticated && isData) && (AuthenticatedContent)}
      </Layout>
    </>
  )
}

export default App
