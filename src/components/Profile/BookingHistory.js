import React, { useCallback, useContext, useEffect, useState } from "react";
import "../../styles/bookingHistory.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
// import { FaBackward } from "react-icons/fa";
// import { BsBack } from "react-icons/bs";
// import { MdSkipPrevious } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import axios from "../../utils/axios";
import Loading from "../Loading";
// import { AppContext } from "../../utils/UserContext";

function BookingHistory() {
  const sliderImageUrl = [
    {
      id: 1,
      title: "Spider-Man: Far From Home",
      genre: "Action, Adventure, Sci-Fi",
      showingtime: "11:30am - 1:00pm",
      date: "3rd Jan 2021",
      description:
        "Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.",
      url: "https://media.istockphoto.com/id/506678292/photo/amazing-spider-man-action-figure.webp?s=2048x2048&w=is&k=20&c=XEWBvWPGeRdOww-iZnMWcjd48ns5CnLpdTP-wLYHDn4=",
    },
    {
      id: 2,
      title: "Frozen II",
      genre: "Animation, Adventure, Family",
      showingtime: "1:15pm - 2:45pm",
      date: "21st Oct 2021",
      description:
        "Elsa, Anna, Kristoff, and Olaf embark on a journey into the enchanted forest to discover the truth about an ancient mystery of their kingdom.",
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*",
    },
    {
      id: 21,
      title: "The Matrix",
      genre: "Action, Sci-Fi",
      showingtime: "3:30pm - 4:45pm",
      date: "31st Feb 2022",
      description:
        "A computer programmer discovers that reality as he knows it is a simulation created by machines, and he joins a group of rebels to fight back.",
      url: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 11,
      title: "The Matrix",
      genre: "Action, Sci-Fi",
      showingtime: "3:30pm - 4:45pm",
      date: "13th Aug 2022",
      description:
        "A computer programmer discovers that reality as he knows it is a simulation created by machines, and he joins a group of rebels to fight back.",
      url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSu_HQf7Sgkij6NptUWlEKf6V9n5bC5cL1JfGFNylGC8VnfN_-N",
    },
    {
      id: 12,
      title: "The Shawshank Redemption",
      genre: "Drama",
      showingtime: "5:00pm - 6:50pm",
      date: "10th Oct 2022",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
    },
    {
      id: 13,
      title: "Inception",
      genre: "Horror, Action, Adventure, Comedy",
      showingtime: "11:30am - 1pm",
      date: "13th Nov 2022",
      description:
        "A thief who enters the dreams of others to steal their secrets is tasked with planting an idea into a CEO's mind. A thief who enters the dreams of others to steal their secrets is tasked with planting an idea into a CEO's mind",
      url: "https://images.unsplash.com/photo-1613051884057-d9130a00a5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9ycm9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 14,
      title: "Jurassic Park",
      genre: "Adventure, Sci-Fi",
      showingtime: "5:00pm - 6:50pm",
      date: "13th Jan 2023",
      description:
        "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
      url: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1",
    },
    {
      id: 15,
      title: "Interstellar",
      genre: "Adventure, Drama, Sci-Fi",
      showingtime: "11:30am - 1pm",
      date: "14th Feb 2023",
      description:
        "A group of explorers travel through a wormhole near Saturn in search of a new habitable planet for humanity.",
      url: "https://images.unsplash.com/photo-1611165946687-896e3845d3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzdCUyMGFuZCUyMGZ1cmlvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];
  // const ctx = useContext(AppContext)
  // const [loginDetails, setLoginDetails] = ctx.getLoginDetails
  const [history, setHistory] = useState([]);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalMoviesWatched: 0,
    totalPendingMovies: 0,
  });
  const getUser = JSON.parse(localStorage.getItem("UserData"));

  const getBookingHistory = useCallback(async () => {
    try {
      const response = await axios.get(
        `/bookings?cinema_id=${getUser?.cinema_id}&email=${getUser?.user_email}`
      );
      setHistory(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
    // console.log(response.data);
  }, []);

  let totalAmount = 0;
  let totalMoviesWatched = 0;
  let totalPendingMovies = 0;

  const historyCopy = history;
  totalAmount = historyCopy.reduce(function (acc, cur) {
    return acc + cur.sub_total;
  }, 0);
  totalMoviesWatched = historyCopy.reduce(function (acc, cur) {
    return cur.is_checked === true ? acc + 1 : acc;
  }, 0);
  totalPendingMovies = historyCopy.reduce(function (acc, cur) {
    return cur.is_checked === false ? acc + 1 : acc;
  }, 0);

  // const getHistoryDetails = (history) => {
  //   const historyCopy = history;
  //   totalAmount = historyCopy.reduce(function (acc, cur) {
  //     return acc + cur.sub_total;
  //   }, 0);
  //   totalMoviesWatched = historyCopy.reduce(function (acc, cur) {
  //     return cur.is_checked === true ? acc + 1 : acc;
  //   }, 0);
  //   totalPendingMovies = historyCopy.reduce(function (acc, cur) {
  //     return cur.is_checked === false ? acc + 1 : acc;
  //   }, 0);

  //   setSummary({
  //     totalAmount,
  //     totalMoviesWatched,
  //     totalPendingMovies,
  //   });
  // };

  useEffect(() => {
    getBookingHistory();
  }, []);
  return (
    <div>
      <Navigation />
      <div className="bookinghistory">
        <Link to="/profile" className="bhBack">
          <RiArrowGoBackFill />
          <p>Back to Profile</p>
        </Link>

        {history?.length && (
          <div>
            <div className="historyCardFlex">
              <span className="historycards">
                Total Amount
                <p>₦{totalAmount.toLocaleString()}</p>
              </span>
              <span className="historycards">
                Total Movies Watched
                <p>{totalMoviesWatched}</p>
              </span>
              <span className="historycards">
                Total Pending Movies
                <p>{totalPendingMovies}</p>
              </span>
            </div>
          </div>
        )}
        <h2>Booking History</h2>
        {!history?.length ? (
          <>
            <h1 className="noBooking">No Booking has been made...</h1>
          </>
        ) : (
          history?.map((movie, i) => {
            return (
              <div key={i}>
                <div className="bh" key={movie.id}>
                  <Link to="/history">
                    <div className="bhCards">
                      <div className="bhdate">
                        {new Date(movie?.show_time).toDateString()}
                      </div>
                      <div>
                        <img src={movie?.movie_id?.image} alt="movieposter" />
                      </div>
                      <div className="bhmovieInfo">
                        <p className="bhshowtime">
                          {new Date(movie?.show_time).toLocaleTimeString()}
                        </p>
                        <div className="bhMovietext">
                          <h3>{movie?.movie_id?.name}</h3>
                          <span>{movie?.movie_id?.genre}</span>
                          <p>
                            {movie?.movie_id?.description?.length > 250
                              ? movie?.movie_id?.description?.slice(0, 250) +
                                "..."
                              : movie?.movie_id.description}
                          </p>
                        </div>
                      </div>
                      <div className="ticketNo">
                        Ticket No: {movie?.ticket_no}
                      </div>
                      <div className="iconstyle">
                        {movie?.movie_id?.is_checked === true ? (
                          <i>
                            <GoCheckCircleFill className="checkIcon" />
                            <span>Watched</span>
                          </i>
                        ) : (
                          <i>
                            <Loading />
                            <span>Pending...</span>
                          </i>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
