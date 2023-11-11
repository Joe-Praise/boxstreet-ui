import React, { useContext, useRef } from "react";
import "../../styles/booking.css";
import {
  IoStar,
  // IoTimerOutline,
  IoLocationOutline,
  IoCalendarOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import { MdLockClock } from "react-icons/md";
import { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer";
import axios from "axios";
import "./style.css";
import { AppContext } from "../../utils/UserContext";
import useCategoryColors from "../../utils/CategoryColors";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";

function Booking() {
  ScrollToTop();
  const navigate = useNavigate();
  let MODE = "LOCAL";
  let LOCAL = "http://localhost:5000";
  let ONLINE = "https://boxstreet.onrender.com";

  let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

  const [col_matrix_1, setColMatrix1] = useState([
    [{}],
    [{}, {}, {}],
    [{}, {}, {}],
  ]);
  const [col_matrix_2, setColMatrix2] = useState([
    [{}, {}, {}],
    [{}, {}],
  ]);

  const getUserInfo = JSON.parse(localStorage.getItem("UserData"));
  const [loginDetails] = useState(getUserInfo);
  const movie_price = useRef();
  const getSchedule = JSON.parse(localStorage.getItem("movieSchedule"));
  const [summary, setSummary] = useState({
    categories: [],
    totalPrice: 0,
  });
  const [seats, setSeat] = useState([]);
  const [scheduleInfo] = useState(getSchedule);
  const [category, setCategory] = useState([]);
  const [booking, setBooking] = useState({
    full_name: "",
    booking_type: "ONLINE",
    reference: "",
    email: "",
    phone: "",
    show_time: new Date(),
    theater_id: scheduleInfo?.theater_id,
    cinema_id: scheduleInfo?.cinema_id,
    branch_id: scheduleInfo?.branch_id,
    user_id: loginDetails?.user_id,
    movie_name: scheduleInfo?.movie_name,
    movie_id: "",
    movie_price: "",
    schedule_id: scheduleInfo?.movieSchedule_id,
    seats: seats,
  });
  let [amount, setAmount] = useState(0);
  const [, setFormErrorMessage] = useState("");
  const [schedule, setSchedule] = useState("");
  const colors = useCategoryColors();
  const [loading, setLoading] = useState(false);

  const setActive = (row, col, pos) => {
    let d;
    let _seats = [...seats];
    if (pos === "left") {
      let col_1_new = [...col_matrix_1];
      d = col_1_new[row][col];

      if (d.is_active) {
        d.is_booked = !d.is_booked;

        if (d.is_booked) {
          amount += Number(d.category_id.price);
          _seats.push({
            no: d.seat_number,
            type: d.category_id.name,
            price: d.category_id.price,
          });
        } else {
          amount -= d.category_id.price;
          _seats = _seats.filter((x) => x.no !== d.seat_number);
        }

        setColMatrix1(col_1_new);
      }
    }

    if (pos === "right") {
      let col_2_new = [...col_matrix_2];
      d = col_2_new[row][col];
      if (d.is_active) {
        d.is_booked = !d.is_booked;

        if (d.is_booked) {
          amount += d.category_id.price;

          _seats.push({
            no: d.seat_number,
            type: d.category_id.name,
            price: d.category_id.price,
          });
        } else {
          amount -= d.category_id.price;
          _seats = _seats.filter((x) => x.no !== d.seat_number);
        }

        setColMatrix2(col_2_new);
      }
    }
    handleSummary(_seats);
    setSeat(_seats);
    setAmount(amount);
  };

  const handleSummary = (seats) => {
    let seatsArr = seats;
    let holdSummary = {};
    let total = 0;
    const sum = seatsArr.reduce((cur, el, i) => {
      const type = el.type;
      if (!holdSummary[type]) {
        holdSummary[type] = {
          type: el.type,
          price: el.price,
          color: colors[i],
        };
        cur.push(holdSummary[type]);
      } else {
        holdSummary[type].price += el.price;
      }
      return cur;
    }, []);

    for (const [, value] of Object.entries(holdSummary)) {
      total += value.price;
    }

    setSummary({
      categories: sum,
      totalPrice: total,
    });
  };

  const handlePayment = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!seats.length) {
      setLoading(false);
      return alert("Seat is required for payment!");
    }

    try {
      const payment_url = BASE_URL + "/api/v1/payments/initiate-payment";
      const booking_url = BASE_URL + "/api/v1/bookings";
      const data = {
        email: booking?.email,
        amount,
        metadata: {
          cinema_id: booking.cinema_id,
          branch_id: booking.branch_id,
        },
      };
      const response = await axios.post(payment_url, data);

      if (response?.data.data.paymentLink) {
        setLoading(false);

        booking.seats = seats;
        booking.reference = response?.data.data.paymentLink.data.reference;
        const value = await axios.post(booking_url, booking);
        console.log(value.data);
        if (value.data.msg === "Seat has already been booked") {
          return alert("Seat has already been booked!");
        }
        window.open(
          response?.data.data.paymentLink.data.authorization_url,
          "_blank"
        );
        localStorage.removeItem("movieSchedule");
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setFormErrorMessage("An error occurred in payment transaction.");
      setLoading(false);
    }
  };

  const InitTransformData = (category, value) => {
    let price = [];
    for (const key of category) {
      if (key?.name === value) {
        const obj = {
          name: key.name,
          price: key.price,
        };
        price.push(obj.price);
      }
    }
    return price[0]?.toLocaleString();
  };

  const TransformCategory = (arr, colors) => {
    const arrCopy = arr;
    arrCopy.forEach((el, i) => {
      el.color = colors[i];
    });
    setCategory(arrCopy);
  };

  const confirmSeatCategory = (seat, categories) => {
    const updatedSeat = seat;
    categories?.forEach((el) => {
      if (el.name === updatedSeat?.category_id?.name)
        updatedSeat.category_id.color = el.color;
    });
    return updatedSeat;
  };
  useEffect(() => {
    // if (!loginDetails?.user_id?.length > 0) {
    //   navigate("/");
    // } else {
    let left_seats = {};
    let right_seats = {};

    let seat_url = `${BASE_URL}/api/v1/theaters/${booking?.theater_id}/seats-summary`;
    let movie_schedule_url = `${BASE_URL}/api/v1/movieschedule/${booking?.schedule_id}`;
    let user_url = `${BASE_URL}/api/v1/users/${loginDetails?.user_id}`;
    let category_url = `${BASE_URL}/api/v1/categories?cinema_id=${scheduleInfo?.cinema_id}`;

    axios
      .get(movie_schedule_url)
      .then((res) => {
        let data = res.data?.data;

        setSchedule(data);
        setAmount(data.price);
        movie_price.current = data.price;
        setBooking((prevState) => {
          return {
            ...prevState,
            show_time: new Date(scheduleInfo?.schedule_date),
            theater_id: getSchedule?.theater_id,
            movie_id: data.movie_id._id,
            movie_price: data.price,
            schedule_id: getSchedule?.movieSchedule_id,
            seats: seats,
          };
        });
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(category_url)
      .then((res) => {
        let data = res.data;
        TransformCategory(data, colors);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(user_url)
      .then((res) => {
        let user = res?.data?.data;
        setBooking((prevState) => {
          return {
            ...prevState,
            full_name: user.name,
            booking_type: "ONLINE",
            email: user.email,
            phone: user.email,
          };
        });
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(seat_url)
      .then((res) => {
        let data = res.data;

        for (let i = 0; i < data.col_matrix_1.length; i++) {
          let d = data.col_matrix_1[i];
          if (!left_seats[d.row]) {
            left_seats[d.row] = [d];
          } else {
            left_seats[d.row].push(d);
          }
        }

        for (let i = 0; i < data.col_matrix_2.length; i++) {
          let d = data.col_matrix_2[i];
          if (!right_seats[d.row]) {
            right_seats[d.row] = [d];
          } else {
            right_seats[d.row].push(d);
          }
        }

        setColMatrix1(Object.values(left_seats));
        setColMatrix2(Object.values(right_seats));
      })
      .catch((err) => {
        console.log(err.message);
      });
    // }
  }, []);

  // console.log(col_matrix_1);

  return (
    <div className="bookingContainer">
      <Navigation />
      <div
        className="booking-page"
        style={{ backgroundImage: `url(${schedule?.movie_id?.image})` }}
      >
        <div className="booking-main">
          <div className="booking-container">
            <div className="booking-container-seat">
              <p className="booking-choose-seat-text">Movie Title</p>
              <div className="movie-title">
                <p>{booking?.movie_name}</p>
              </div>

              <p className="booking-choose-seat-text">Cinema</p>
              <div className="movie-title">
                <p>{scheduleInfo?.cinema_name}</p>
              </div>

              <p className="booking-choose-seat-text">Branch</p>
              <div className="movie-title">
                <p>{scheduleInfo?.branch_name}</p>
              </div>

              <p className="booking-choose-seat-text">Choose Seats</p>
              {category?.map((el, i) => (
                <div className="booking-seat-side" key={el._id}>
                  <span
                    className="booking-seat-vvip"
                    style={{ background: `${el.color}` }}
                  ></span>
                  <p>
                    {el.name.toUpperCase()} -{" "}
                    {category.length > 0 &&
                      `₦${InitTransformData(category, el.name.toUpperCase())}`}
                  </p>
                </div>
              ))}
            </div>
            <div className="booking-container-col1">
              <div className="">
                <div className="box-line">
                  <div className="line"></div>
                </div>
              </div>
              <div className="">
                <div className="main-boxx">
                  <div className="box1">
                    {col_matrix_1?.map((arr, i1) => {
                      return (
                        <div className="box1-col1" key={i1}>
                          {arr?.map((c, i2) => {
                            // checks for the category name of the current obj and adds the respective color
                            const color = confirmSeatCategory(c, category);
                            return (
                              <p
                                style={{
                                  border: `0.0625rem solid ${color?.category_id?.color}`,
                                  background: `${
                                    c.is_booked && c.is_active
                                      ? color.category_id.color
                                      : ""
                                  }`,
                                }}
                                className={
                                  c.is_booked && c.is_active
                                    ? `col1p`
                                    : c.is_booked && !c.is_active
                                    ? `col1p selected-seat`
                                    : `col1p`
                                }
                                key={i2}
                                onClick={(e) => setActive(i1, i2, "left")}
                              >
                                <span></span>
                              </p>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  <div className="box2">
                    {col_matrix_2?.map((arr, i1) => {
                      return (
                        <div className="box1-col1" key={i1}>
                          {arr?.map((c, i2) => {
                            // checks for the category name of the current obj and adds the respective color
                            const color = confirmSeatCategory(c, category);
                            return (
                              <p
                                style={{
                                  border: `0.0625rem solid ${color?.category_id?.color}`,
                                  background: `${
                                    c.is_booked && c.is_active
                                      ? color.category_id.color
                                      : ""
                                  }`,
                                }}
                                className={
                                  c.is_booked && c.is_active
                                    ? ` col1p`
                                    : c.is_booked && !c.is_active
                                    ? ` col1p selected-seat`
                                    : ` col1p`
                                }
                                key={i2}
                                onClick={(e) => setActive(i1, i2, "right")}
                              >
                                <span></span>
                              </p>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="booking-container-col1-inputs">
                <div className="booking-container-col1-input">
                  <span className="booking-container-col-text book-box">
                    Selected
                  </span>
                </div>
                <div className="booking-container-col1-input">
                  <span className="booking-container-col-text select-box">
                    Booked
                  </span>
                </div>
                <div className="booking-container-col1-input">
                  <span className="booking-container-col-text">
                    Selected Seats: {seats?.length}
                  </span>
                </div>
              </div>

              {summary.categories?.length && (
                <div className="priceSuammryContainer">
                  <summary>Selected seat info</summary>
                  {summary.categories?.map((el, i) => (
                    <div key={i} className="priceSuammry">
                      <p>{el.type}</p>
                      <p>₦{el.price.toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="priceSuammry moviePrice">
                    <p>Movie Price</p>
                    <p>₦{movie_price.current.toLocaleString()}</p>
                  </div>
                </div>
              )}

              <div className="booking-total">
                <h3 className="booking-totalh">Total</h3>
                <p className="booking-totalp">
                  ₦{seats.length > 0 ? `${amount.toLocaleString()}` : "0"}
                </p>
                <button onClick={handlePayment}>
                  {loading ? <Loading /> : "Pay"}
                </button>
              </div>

              <div className="booking-container-col-bottom">
                <div className="booking-container-col-bottom-row1">
                  <div className="b-col">
                    <p className="booking-icon">
                      <MdLockClock />
                    </p>
                    <span className="b-col-text1">Lenght</span>
                    <p className="b-col-text2">
                      {schedule?.movie_id?.duration}
                    </p>
                  </div>
                  <div className="b-col">
                    <p className="booking-icon">
                      <IoLocationOutline />
                    </p>
                    <span className="b-col-text1">Language</span>
                    {schedule?.movie_id?.language?.split(",")?.map((el, i) => {
                      return (
                        <p key={el + 1} className="b-col-text2">
                          {el}
                        </p>
                      );
                    })}
                  </div>
                  <div className="b-col">
                    <p className="booking-icon">
                      <IoCalendarOutline />
                    </p>
                    <span className="b-col-text1">year</span>
                    <p className="b-col-text2">
                      {booking?.show_time.getFullYear()}
                    </p>
                  </div>
                  <div className="b-col">
                    <a
                      href={schedule?.movie_id?.trailer}
                      target="_blank"
                      rel="noreferrer"
                      className="b-col-text1"
                    >
                      watch Trailer
                      <p className="booking-icon4">
                        <IoArrowForwardOutline />
                      </p>
                    </a>
                  </div>
                </div>
                {/* <div className="booking-container-col-bottom-row2">
                  <div className="b-col">
                    <a
                      href={schedule?.movie_id?.trailer}
                      target="_blank"
                      rel="noreferrer"
                      className="b-col-text1"
                    >
                      watch Trailer
                    </a>
                    <p className="booking-icon4">
                      <IoArrowForwardOutline />
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="booking-container-col2">
              <div className="box-container-top-items">
                <h2 className="booking-header-text">Date & Time</h2>
                <div className="box-container-top-item1">
                  <span className="item1-date">Date</span>
                  <p className="item1-text">
                    {booking?.show_time.getDate()}{" "}
                    {booking?.show_time.toDateString()?.slice(3, 7)}
                  </p>
                </div>
                <div className="box-container-top-item2">
                  <span className="item2-date">Time</span>
                  <p className="item2-text">
                    {booking?.show_time.toString()?.slice(15, 25)}
                  </p>
                </div>
              </div>
              <div className="booking-container-top">
                <div className="booking-container-top-col">
                  <img
                    src={schedule?.movie_id?.image}
                    className="booking-img1"
                    alt=""
                  />
                  <p className="booking-container-top-text">Boxstreet</p>
                  <div className="booking-rating">
                    <span className="bookint-star">
                      <IoStar />
                    </span>
                    <span className="booking-rate">
                      {schedule?.movie_id?.movie_rating}
                    </span>
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
      <Footer />
    </div>
  );
}
export default Booking;
