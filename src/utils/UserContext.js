import React, { createContext, useCallback, useEffect, useState } from 'react';
import axios from './axios';
import { toast } from 'react-toastify';
let isInitialized = false;
export const AppContext = createContext();

const UserContext = ({ children }) => {
	const Toast = toast;
	const getUser = JSON.parse(localStorage.getItem('UserData'));
	const [loginDetails, setLoginDetails] = useState(getUser);
	const [notifications, setNotifications] = useState([]);
	const ID = '1010101010';
	const [initData, setInitData] = useState({
		cinemas: [{ _id: ID, name: 'All' }],
		cache_cinemas: [],
		doubleMovies: [],
	});

	const [initailized, setInitialized] = useState(false);
	const [queryData, setQueryData] = useState({
		movies: [],
		comingSoon: [],
		movieSchedule: [],
	});

	const [filterId, setFilterId] = useState({
		cinema_id: '',
		branch_id: '',
	});

	// notification handling
	const dispatchNotification = (details) => {
		setNotifications((prevState) => {
			return [...prevState, details];
		});
	};

	useEffect(() => {
		if (notifications.length > 0) {
			notifications.forEach(({ message, type, id }) => {
				if (id) {
					Toast.update(id, {
						message,
						type,
						isLoading: false,
						closeButton: true,
						autoClose: 3000,
					});
				} else {
					Toast(message, {
						type,
						toastId: 'yes',
					});
				}
			});

			setNotifications([]);
		}
	}, [setNotifications, notifications, Toast]);

	// Movies queries
	const condition =
		filterId?.cinema_id?.length < 0 || filterId.cinema_id === ID;
	const getNowShowing = async () => {
		// if cinema || branch is selected query all movies froom that cinema || branch
		const url = condition
			? '/movies/doublemovie'
			: `/movies/doublemovie?cinema_id=${
					filterId.cinema_id.length > 0 ? filterId.cinema_id : ''
			  }&branch_id=${filterId.branch_id.length > 0 ? filterId.branch_id : ''}`;
		return axios.get(url);
	};

	const getMovies = async () => {
		// if cinema || branch is selected query all movies froom that cinema || branch
		const url = condition
			? '/movies'
			: `/movies?cinema_id=${filterId.cinema_id}&branch_id=${filterId.branch_id}`;
		// console.log(url);
		return axios.get(url);
	};

	const getCinemas = useCallback(async () => {
		return axios.get('/cinemas');
	}, []);

	const InitTransformData = (double, movies) => {
		const data = [];
		const comingSoonData = [];
		if (isInitialized) {
			for (const key of movies) {
				// console.log(key);
				if (key.coming_soon !== true) {
					const obj = {
						_id: key._id,
						name: key.name,
						genre: key.genre_id,
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
					};
					data.push(obj);
				}
			}
		} else {
			for (const key of double) {
				// console.log(key);
				if (key.coming_soon !== true) {
					const obj = {
						_id: key._id,
						name: key.name,
						genre: key.genre_id,
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
					};
					data.push(obj);
				}
			}
		}

		for (const key of movies) {
			if (key.coming_soon === true) {
				const comingSoon = {
					_id: key._id,
					name: key.name,
					genre: key.genre_id,
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
				};
				comingSoonData.push(comingSoon);
			}
		}

		// console.log("2", movies);
		setInitData((prevState) => {
			return {
				...prevState,
				cinemas: prevState.cache_cinemas,
				doubleMovies: data,
			};
		});

		setQueryData((prevState) => {
			return {
				...prevState,
				comingSoon: comingSoonData,
				movies: data,
			};
		});
		// console.log("data", data);
		// console.log("coming soon", comingSoonData);
	};

	useEffect(() => {
		if (!isInitialized) {
			Promise.all([getCinemas(), getNowShowing(), getMovies()])
				.then(function (results) {
					setInitData({
						cinemas: [...initData.cinemas, ...results[0].data],
						doubleMovies: results[1].data,
						cache_cinemas: [...initData.cinemas, ...results[0].data],
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
						console.log('Error', error.message);
					}
				});
		} else {
			Promise.all([getNowShowing(), getMovies()])
				.then(function (results) {
					InitTransformData(results[0].data, results[1].data.data);
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
					}
				});
			setInitialized(true);
		}

		return () => {
			isInitialized = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterId.cinema_id, filterId.branch_id]);

	const logoutHandler = (e) => {
		e.stopPropagation();
		localStorage.removeItem('UserData');
		localStorage.removeItem('movieSchedule');
	};

	const data = {
		getInitialized: [initailized, setInitialized],
		getInitData: [initData, setInitData],
		getQueryData: [queryData, setQueryData],
		getFilterId: [filterId, setFilterId],
		getLoginDetails: [loginDetails, setLoginDetails],
		onLogout: logoutHandler,
		dispatchNotification,
	};

	// console.log(queryData.movies);
	return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default UserContext;
