import React, { useCallback, useContext, useEffect, useState } from "react";
import "../../styles/singlemovie.css";
import banner from "../uploads/the-exorcist-film-poster-f69rptkyultqrtnr.webp";
import johnsnow from "../uploads/johnsnow.jpeg";
import denareesa from "../uploads/denareesa-.jpeg";
import pedropascal from "../uploads/pedro pascal.jpeg";
import { GoDotFill } from "react-icons/go";
import { CiPlay1 } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieCarousel from "../Landing Page/MovieCarousel";
import Footer from "../Footer";
import { AppContext } from "../../utils/UserContext";
import axios from "../../utils/axios";
import Select from "../Landing Page/Select";

function SingleMovie() {
  const ctx = useContext(AppContext);
  const [initData] = ctx.getInitData;
  const [filterId, setFilterId] = ctx.getFilterId;
  const [queryData, setQueryData] = ctx.getQueryData;
  const [theater, setTheaters] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const { id } = useParams({});
  const navigate = useNavigate();
  const getUser = JSON.parse(localStorage.getItem("UserData"));

  const [schedule, setSchedule] = useState({
    movieSchedule_id: "",
    theater_id: "",
    schedule_date: "",
    cinema_id: filterId.cinema_id,
    branch_id: filterId.branch_id,
  });

  const InitTransformData = (movieSchedule) => {
    let singleMovieSchedule = movieSchedule;
    const data = [];
    for (const key of singleMovieSchedule) {
      if (key.coming_soon !== true) {
        setSchedule((prev) => {
          return {
            ...prev,
            movieSchedule_id: key._id,
          };
        });
        const obj = {
          _id: key._id,
          name: key.movie_id.name,
          genre: key.movie_id.genre_id,
          description: key.movie_id.description,
          trailer: key.movie_id.trailer,
          times_showed: key.movie_id.times_showed,
          image: key.movie_id.image,
          cast: key.movie_id.cast,
          movie_director: key.movie_id.movie_director,
          production_studio: key.movie_id.production_studio,
          duration: key.movie_id.duration,
          language: key.movie_id.language,
          show_time: key.show_time,
          movie_rating: key.movie_id.movie_rating,
          pg_rating: key.movie_id.pg_rating,
          price: key.price,
          release_date: key.movie_id.release_date,
          coming_soon: key.movie_id.coming_soon,
          cinema_name: key.cinema_id.name,
          cinema_email: key.cinema_id.email,
          cinema_phone: key.cinema_id.phone,
          cinema_image: key.cinema_id.image,
          branch_openingTime: key.branch_id.opening,
          branch_closing_time: key.branch_id.closing,
          branch_phones: key.branch_id.phone,
        };
        data.push(obj);
      }
    }
    setQueryData((prevState) => {
      return {
        ...prevState,
        movieSchedule: data,
      };
    });
  };

  const getFilterIdFromMovieSchedule = (arr) => {
    if (!filterId.branch_id.length) {
      setFilterId((prevState) => {
        return {
          ...prevState,
          branch_id: arr.branch_id._id,
        };
      });
    }

    if (!filterId.cinema_id.length) {
      setFilterId((prevState) => {
        return {
          ...prevState,
          cinema_id: arr.cinema_id._id,
        };
      });
    }
  };

  const getSingleMovie = useCallback(async () => {
    try {
      const response = await axios.get(`/movieschedule?movie_id=${id}`);
      const arr = response.data.data;
      if (arr.length < 1) {
        navigate("/");
      } else if (arr.length > 1) {
        const newArr = arr.at(-1);
        InitTransformData([newArr]);
        getFilterIdFromMovieSchedule(newArr);
      } else {
        InitTransformData(arr);
        getFilterIdFromMovieSchedule(arr);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // console.log(queryData.movieSchedule);

  // const onGetCinemaHandler = (data) => {
  //   setFilterId((prevState) => {
  //     return {
  //       ...prevState,
  //       cinema_id: data._id,
  //     };
  //   });
  // };

  const onSetTheater = (data) => {
    setSchedule((prevState) => {
      return {
        ...prevState,
        theater_id: data._id,
      };
    });
  };

  const getGetTheater = useCallback(async () => {
    try {
      // if cinema selected === "All" get all branches in DB else query for that particular cinema
      const url =
        // filterId.cinema_id === "1010101010"
        //   ? "/theaters"
        //   :
        `/theaters?branch_id=${filterId.branch_id}`;
      const response = await axios.get(url);
      setTheaters(response.data);
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
  }, [filterId.branch_id]);

  const scheduleInfoHandler = () => {
    if (
      schedule.movieSchedule_id.length < 1 ||
      schedule.schedule_date.length < 1 ||
      schedule.theater_id.length < 1
    ) {
      return;
    }
    localStorage.setItem("movieSchedule", JSON.stringify(schedule));

    if (getUser?.user_id.length > 1) {
      navigate("/booking");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    getSingleMovie();
  }, [getSingleMovie]);

  useEffect(() => {
    getGetTheater();
  }, [getGetTheater]);

  return (
    <div>
      {queryData?.movieSchedule?.map((el, i) => {
        return (
          <div className="singlemovcont" key={el + i}>
            <div className="movbanner">
              <div className="movMainBanner">
                <img src={el.image} alt="" />
              </div>
              <div className="movtext">
                <div className="movtextLeft">
                  <div className="movGenre">
                    <ul>
                      {/* {el.genre.map((el, i, arr) => {
                        return (
                          <li key={i}>
                            {el}
                            <span>
                              {i === arr.length - 1 ? (
                                ""
                              ) : (
                                <GoDotFill className="landingblueDot" />
                              )}
                            </span>
                          </li>
                        );
                      })} */}
                    </ul>
                  </div>
                  <h2 className="movTitle">{el.name}</h2>
                  <div className="movDescription">
                    <p>{el.description}</p>
                    <a
                      href={el.trailer}
                      target="_blank"
                      className="movWatchT"
                      rel="noreferrer"
                    >
                      <font>
                        <CiPlay1 />
                      </font>
                      <span>Watch Trailer</span>
                    </a>
                  </div>
                  <div className="movCastnBook">
                    <div className="castcontainer">
                      <h4>Cast</h4>
                      <div className="movCasts">
                        {el.cast?.map((cast, i) => {
                          return (
                            <div className="movCastInfo" key={cast + i}>
                              <img src={cast.image} alt="" />
                              <span>{cast.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="movShowtimes">
                      <h4>Showtimes</h4>
                      <ul className="movShowflex">
                        {el.show_time?.map((show, i) => {
                          return (
                            <li
                              to=""
                              className={`${
                                isSelected && schedule.schedule_date === show
                                  ? "movtimes active"
                                  : "movtimes"
                              } `}
                              onClick={() => {
                                setSchedule((prevState) => {
                                  return {
                                    ...prevState,
                                    schedule_date: show,
                                  };
                                });
                                setIsSelected((prevState) => !prevState);
                              }}
                              key={show + i}
                            >
                              <span>{show}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="bookMovieBtn">
                        <div className="alsoshowingflex">
                          <Select
                            items={theater}
                            onGetHandler={onSetTheater}
                            value={"Select theater"}
                          />
                          <div onClick={scheduleInfoHandler}>Book Movie</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="movAlsoShow">
        <div className="alsoshowingflex">
          <h2>Also Showing</h2>
        </div>
        <MovieCarousel doubleMovies={initData.doubleMovies} />
      </div>
      <Footer />
    </div>
  );
}

export default SingleMovie;
