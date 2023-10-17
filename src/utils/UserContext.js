import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from "./axios";

let isInitialized = false;
export const AppContext = createContext();
const UserContext = ({ children }) => {
  const [initData, setInitData] = useState({
    cinemas: [{ _id: "1010101010", name: "All" }],
    doubleMovies: [],
    // movies: [],
    // comingSoon: [],
  });

  const [queryData, setQueryData] = useState({
    movies: [],
    comingSoon: [],
    // branches: [],
  });

  const [filterId, setFilterId] = useState({
    cinema_id: "",
    branch_id: "",
  });

  // const getBranches = useCallback(async () => {
  //   // if cinema selected === "All" get all branches in DB else query for that particular cinema
  //   const url =
  //     filterId.cinema_id === "1010101010"
  //       ? "/branches"
  //       : `/branches?cinema_id=${filterId.cinema_id}`;
  //   return axios.get(url);
  // }, [filterId.cinema_id]);

  const condition =
    filterId.cinema_id.length < 0 || filterId.cinema_id === "1010101010";
  const getNowShowing = useCallback(async () => {
    // if cinema || branch is selected query all movies froom that cinema || branch
    const url = condition
      ? "/movies/doublemovie"
      : `/movies/doublemovie?cinema_id=${filterId.cinema_id}&branch_id=${filterId.branch_id}`;
    return axios.get(url);
  }, []);

  const getMovies = useCallback(async () => {
    // if cinema || branch is selected query all movies froom that cinema || branch
    const url = condition
      ? "/movies"
      : `/movies?cinema_id=${filterId.cinema_id}&branch_id=${filterId.branch_id}`;
    return axios.get(url);
  }, [filterId.cinema_id, filterId.branch_id, condition]);

  const getCinemas = useCallback(async () => {
    return axios.get("/cinemas");
  }, []);

  const InitTransformData = (double, movies, query) => {
    let search = double;
    if (query) search = movies;
    const data = [];
    const comingSoonData = [];
    for (const key of search) {
      // console.log(key);
      if (key.coming_soon !== true) {
        const obj = {
          _id: key._id,
          name: key.name,
          genre: key.genre.split(","),
          description: key.description,
          trailer: key.trailer,
          times_showed: key.times_showed,
          image: key.image,
          cast: key.cast,
          movie_director: key.movie_director,
          production_studio: key.production_studio,
          duration: key.duration,
          language: key.language,
          movie_rating: key.movie_rating,
          pg_rating: key.pg_rating,
          release_date: key.release_date,
          coming_soon: key.coming_soon,
          // cinema_name: key.cinema_id.name,
          // cinema_email: key.cinema_id.email,
          // cinema_phone: key.cinema_id.phone,
          // cinema_image: key.cinema_id.image,
          // branch_openingTime: key.branch_id.opening,
          // branch_closing_time: key.branch_id.closing,
          // branch_phones: key.branch_id.phone,
        };
        data.push(obj);
      }
    }

    for (const key of movies) {
      if (key.coming_soon === true) {
        const comingSoon = {
          _id: key._id,
          name: key.name,
          genre: key.genre.split(","),
          description: key.description,
          trailer: key.trailer,
          times_showed: key.times_showed,
          image: key.image,
          cast: key.cast,
          movie_director: key.movie_director,
          production_studio: key.production_studio,
          duration: key.duration,
          language: key.language,
          movie_rating: key.movie_rating,
          pg_rating: key.pg_rating,
          release_date: key.release_date,
          coming_soon: key.coming_soon,
          // cinema_name: key.cinema_id.name,
          // cinema_email: key.cinema_id.email,
          // cinema_phone: key.cinema_id.phone,
          // cinema_image: key.cinema_id.image,
          // branch_openingTime: key.branch_id.opening,
          // branch_closing_time: key.branch_id.closing,
          // branch_phones: key.branch_id.phone,
        };
        comingSoonData.push(comingSoon);
      }
    }

    setInitData((prevState) => {
      return {
        ...prevState,
        doubleMovies: data,
      };
    });

    setQueryData((prevState) => {
      return {
        ...prevState,
        comingSoon: comingSoonData,
        movies: queryData.movies.length < 1 ? data : queryData.movies,
      };
    });
  };

  useEffect(() => {
    if (!isInitialized) {
      Promise.all([getCinemas(), getNowShowing(), getMovies()])
        .then(function (results) {
          setInitData({
            cinemas: [...initData.cinemas, ...results[0].data],
            doubleMovies: results[1].data,
          });
          InitTransformData(results[1].data, results[2].data.data);
        })
        .catch(function (error) {
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
        });
    }

    if (isInitialized) {
      Promise.all([getNowShowing(), getMovies()])
        .then(function (results) {
          InitTransformData(results[0].data, results[1].data.data, true);
        })
        .catch(function (error) {
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
        });
    }

    return () => {
      isInitialized = true;
    };
  }, [
    getNowShowing,
    getCinemas,
    getMovies,
    filterId.branch_id,
    filterId.cinema_id,
    initData.cinemas,
  ]);

  // console.log(initData.doubleMovies);

  // useEffect(() => {}, [filterId.cinema, filterId.cinema]);

  const data = {
    getInitData: [initData, setInitData],
    getQueryData: [queryData, setQueryData],
    getFilterId: [filterId, setFilterId],
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default UserContext;
