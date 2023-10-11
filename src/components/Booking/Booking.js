import React, { useRef } from "react";
import "../../styles/booking.css";
import { IoStar, IoTimerOutline, IoLocationOutline, IoCalendarOutline, IoArrowForwardOutline } from "react-icons/io5";
import { MdLockClock } from "react-icons/md";
import { useState, useEffect } from 'react';
import img1 from "../uploads/booking-movie6.jpg";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer";
function Booking() {

    let [row, setRow] = useState(8)
    let [column, setColumn] = useState(2)
    let [col_matrix_1, setColMatrix1] = useState([2, 2, 4, 4, 4, 4, 4, 1])
    let [col_matrix_2, setColMatrix2] = useState([3, 1, 4, 4, 2, 4, 4, 3])
    let selected = useRef()

    let setActive = (e) =>{
        e.target.children[0].classList.toggle('active')
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <Navigation/>
            <div className="booking-page">
            <div className="booking-main">
                    <div className="booking-container">
                        <div className="booking-container-seat">
                        <p className="booking-choose-seat-text">Choose Seats</p>
                        <div className="booking-seat-side">
                        <span className="booking-seat-vvip"></span>
                         <p>VVIP</p>
                        </div>
                        <div className="booking-seat-side">
                        <span className="booking-seat-vip"></span>
                         <p>VIP</p>
                        </div>
                        <div className="booking-seat-side">
                        <span className="booking-seat-regular"></span>
                         <p>Regular</p>
                        </div>
                        </div>
                        <div className="booking-container-col1">
                            <div className="booking-container-top">
                                <div className="box-line">
                                    <div className="line"></div>
                                </div>
                            </div>
                            <div className="box-container">
                                <div className="main-boxx">
                                    <div className="box1">

                                        {
                                            col_matrix_1.map((r, i1) => {
                                                let arr = new Array(r).fill(3)

                                                return <div className="box1-col1" key={i1}>
                                                    {
                                                        arr.map((c, i2) => (
                                                            <p className="col1p" key={i2} onClick={(e)=>setActive(e)}>
                                                                <span></span>
                                                                <i className="vip"></i>
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            })

                                        }

                                    </div>

                                    <div className="box2">

                                        {
                                            col_matrix_2.map((r, i1) => {
                                                let arr = new Array(r).fill(3)

                                                return <div className="box1-col1" key={i1}>
                                                    {
                                                        arr.map((c, i2) => (
                                                            <p className="col1p"  key={i2} onClick={(e)=>setActive(e)}>
                                                                <span></span>
                                                                <i className="regular"></i>
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            })

                                        }

                                    </div>


                                </div>
                            </div>

                            <div className="booking-container-col1-inputs">
                                <div className="booking-container-col1-input">
                                    <input
                                        type="radio"
                                    />
                                    <span className="booking-container-col-text">Selected</span>
                                </div>
                                <div className="booking-container-col1-input">
                                    <input
                                        type="radio"
                                    />
                                    <span className="booking-container-col-text">Reserved</span>
                                </div>
                                <div className="booking-container-col1-input">
                                    <input
                                        type="radio"
                                    />
                                    <span className="booking-container-col-text">Available</span>
                                </div>
                            </div>
                            <div className="booking-total">
                                <h3 className="booking-totalh">Total</h3>
                                <p className="booking-totalp">N600</p>
                            </div>
                            <div className="booking-container-col-bottom">
                                <div className="booking-container-col-bottom-row1">
                                    <div className="b-col">
                                        <p className="booking-icon"><MdLockClock /></p>
                                        <span className="b-col-text1">Lenght</span>
                                        <p className="b-col-text2">12:30:00</p>
                                    </div>
                                    <div className="b-col">
                                        <p className="booking-icon"><IoLocationOutline /></p>
                                        <span className="b-col-text1">Language</span>
                                        <p className="b-col-text2">English</p>
                                    </div>
                                    <div className="b-col">
                                        <p className="booking-icon"><IoCalendarOutline /></p>
                                        <span className="b-col-text1">year</span>
                                        <p className="b-col-text2">2023</p>
                                    </div>
                                </div>
                                <div className="booking-container-col-bottom-row2">
                                    <div className="b-col">
                                        <span className="b-col-text1">watch Trailer</span>
                                        <p className="booking-icon4"><IoArrowForwardOutline /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="booking-container-col2">
                            <div className="box-container-top-items">
                                <h2 className="booking-header-text">Date & Time</h2>
                                <div className="box-container-top-item1">
                                    <span className="item1-date">Choose Date</span>
                                    <p className="item1-text">16 Dec</p>
                                </div>
                                <div className="box-container-top-item2">
                                    <span className="item2-date">Choose Time</span>
                                    <p className="item2-text">20:15</p>
                                </div>
                            </div>
                            <div className="booking-container-top">
                                <div className="booking-container-top-col">
                                    <img src={img1} className="booking-img1" />
                                    <p className="booking-container-top-text">Boxstreet</p>
                                    <div className="booking-rating">
                               
                                    <span className="bookint-star"><IoStar /></span>
                                    <span className="booking-rate">3.9</span>
                                </div>
                                </div>
                            </div>
                            <div className="booking-container-bottom">
                                <div className="booking-con"></div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Booking