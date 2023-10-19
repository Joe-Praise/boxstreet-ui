import React, { useCallback, useEffect, useState } from "react";
import "../../styles/bookingHistory.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import { FaBackward } from "react-icons/fa";
import { BsBack } from "react-icons/bs";
import { MdSkipPrevious } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import axios from "../../utils/axios";

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

  const [history, setHistory] = useState([]);
  const getUser = JSON.parse(localStorage.getItem("UserData"));

  const getBookingHistory = useCallback(async () => {
    const response = await axios.get(`bookings/users/${getUser.user_id}`);
    // console.log(response.data);
    setHistory(response.data);
  }, []);

  useEffect(() => {
    getBookingHistory();
  }, []);
  return (
    <div>
      <Navigation />
      <div className="bookinghistory">
        <div className="bhBack">
          <RiArrowGoBackFill />
          <p>Back to Profile</p>
        </div>

        <h2>Booking History</h2>
        {!history.length ? (
          <>
            <h1 className="noBooking">No Booking has been made...</h1>
          </>
        ) : (
          history.map((movie) => {
            return (
              <div className="bh" key={movie.id}>
                <Link to="/history">
                  <div className="bhCards">
                    <div className="bhdate">
                      {/* <span>{movie.date}</span> */}
                    </div>
                    <div>
                      <img src={movie?.movie_id?.image} alt="movieposter" />
                    </div>
                    <div className="bhmovieInfo">
                      <p className="bhshowtime">{movie?.show_time}</p>
                      <div className="bhMovietext">
                        <h3>{movie?.movie_id?.name}</h3>
                        <span>{movie?.movie_id?.genre}</span>
                        <p>{movie?.movie_id.description}</p>
                      </div>
                    </div>
                    <div className="iconstyle">
                      {movie?.movie_id?.is_checked === true ? (
                        <i>
                          <GoCheckCircleFill className="checkIcon" />
                          <span>Watched</span>
                        </i>
                      ) : (
                        <i>
                          <span>Pending...</span>
                        </i>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
