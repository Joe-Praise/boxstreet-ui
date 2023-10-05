import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../uploads/FHC LOGO.png'

function Navigation() {
  return (
    <div>
        <div className='navigation'>
            <div>
                <Link to='/'>
                    <img src={logo} alt="web logo" />
                </Link>
            </div>
            <div>
                <ul>
                    <li>FOOD & DRINKS</li>
                    <li>BOOKINGS</li>
                    <li>JOIN OUR CLUB</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>CART</li>
                    <li>SIGN IN</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navigation