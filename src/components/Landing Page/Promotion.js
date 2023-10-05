import React from 'react'
import PromotionCarousel from './PromotionCarousel'

function Promotion() {
  return (
    <div className='comingSoon'>
    <div className='comingSoonWidth'>
        <div className='comingSoonHeader'>
            <div>
                <h2>Promotions</h2>
            </div>
        </div>
        <div>
            <PromotionCarousel />
        </div>
    </div>
</div>
  )
}

export default Promotion