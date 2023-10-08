import React from 'react'
import '../../styles/banner.css'
import Navigation from '../Navigation/Navigation'
import {GoDotFill} from 'react-icons/go'

function Banner() {
  return (
    <div>
        <Navigation />
        <div className='landingbanner'>
            <div className='landingbannerContent'>
                <div className='landingbannerSlideDescription'>
                    <ul>
                        <li>Action</li> <GoDotFill className='landingblueDot'/>
                        <li>Adventure</li> <GoDotFill className='landingblueDot' />
                        <li>Thriller</li>
                    </ul>
                    <h1>Expend4bles</h1>
                    <p>Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning.</p>
                </div>
                <div className='landingbannerBtns'>
                    <button className='landingbtnBuyTickets'>Buy Tickets</button>
                    <button className='landingbtnWatchTrailer'>Watch Trailer</button> 
                    <GoDotFill className='landingblueDot' />
                    <p>Filmhouse Cinemas</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner