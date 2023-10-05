import React from 'react'
import '../../styles/landing.css'
import Banner from './Banner'
import NowShowing from './NowShowing'


function LandingPage() {
  return (
    <div className='landingBG'>
        <Banner />
        <NowShowing />
    </div>
  )
}

export default LandingPage