import React from 'react'
import ComingsoonCarousel from './ComingsoonCarousel'
import '../../styles/comingSoon.css'

function ComingSoon() {
  return (
    <div className='comingSoon'>
        <div className='comingSoonWidth'>
            <div className='comingSoonHeader'>
                <div>
                    <h2>Coming Soon</h2>
                </div>
            </div>
            <div>
                <ComingsoonCarousel />
            </div>
        </div>
    </div>
  )
}

export default ComingSoon