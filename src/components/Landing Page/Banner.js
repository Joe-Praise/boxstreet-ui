import React from 'react'
import '../../styles/banner.css'
import Navigation from '../Navigation/Navigation'
import {GoDotFill} from 'react-icons/go'

function Banner() {
  return (
    <div>
        <Navigation />
        <div className='banner'>
            <div className='bannerContent'>
                <div className='bannerSlideDescription'>
                    <ul>
                        <li>Action</li> <GoDotFill className='blueDot'/>
                        <li>Adventure</li> <GoDotFill className='blueDot' />
                        <li>Thriller</li>
                    </ul>
                    <h1>Expend4bles</h1>
                    <p>Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning.</p>
                </div>
                <div className='bannerBtns'>
                    <button className='btnBuyTickets'>Buy Tickets</button>
                    <button className='btnWatchTrailer'>Watch Trailer</button> 
                    <GoDotFill className='blueDot' />
                    <p>Filmhouse Cinemas</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner