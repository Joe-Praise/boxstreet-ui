import React from 'react'
import '../../styles/nowShowing.css'
import MovieCarousel from './MovieCarousel'
import ComingSoon from './ComingSoon'
import Promotion from './Promotion'
import Footer from '../Footer'

function NowShowing() {
  return (
    <div className='nowShowing'>
        <div className='nowShowingWidth'>
            <div className='nowShowingHeader'>
                <div>
                    <h2>Now Showing</h2>
                </div>
                <div className='showVenueDates'>
                    <select className='landingselect' name="location">
                        <option value="Jabi">Jabi</option>
                        <option value="Maitama">Maitama</option>
                        <option value="Asokoro">Asokoro</option>
                        <option value="Lugbe">Lugbe</option>
                        <option value="Apo">Apo</option>
                    </select>

                    <select className='landingselect' name="theater">
                        <option value="Theater1">Theater 1</option>
                        <option value="Theater2">Theater 2</option>
                        <option value="Theater3">Theater 3</option>
                    </select>

                    <select className='landingselect' name="viewDays">
                        <option value="today">Today</option>
                        <option value="tomorrow">Oct 6th</option>
                        <option value="saturday">Oct 7th</option>
                        <option value="sunday">Oct 8th</option>
                        <option value="monday">Oct 9th</option>
                        <option value="tusday">Oct 10th</option>
                    </select>
                </div>
            </div>
            <div>
                <MovieCarousel />
            </div>
        </div>
        <div>
            <ComingSoon />
        </div>
        <div>
            <Promotion />
        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default NowShowing