import React from 'react'
import singlemovie from "../../styles/singlemovie.css";
import johnsnow from './images/johnsnow.jpeg'
import denareesa from './images/denareesa-.jpeg'
import pedropascal from './images/pedro pascal.jpeg'

function SingleMovie() {
  return (
    <div>
        <div className="singlemovcont ">
            <div className="movbanner">
                <div className="movtext">
                    <div className="movtextLeft">
                        <div className="movGenere">
                            <span>Fantacy </span>
                            <span className='dot'>&#x2022;</span>
                            <span>Serial Drama </span>

                        </div>
                        <div className="movTitle">
                            Game of Thrones
                        </div>
                        <div className="movDescription">
                        American fantasy drama television series created by David Benioff and D. B. <br></br> Weiss for HBO. It is an adaptation of A Song of Ice and
                        </div>
                        <h4>Cast</h4>
                        <div className="castcontainer">
                            <div className="cast1">
                                <img className='castimg' src={johnsnow} alt="" />
                            </div>
                            <div className="cast2">
                                <img className='castimg' src={denareesa} alt="" />
                            </div>
                            <div className="cast1">
                                <img className='castimg' src={pedropascal} alt="" />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="belowbanner">
                
            </div>
        </div>
    </div>
  )
}

export default SingleMovie