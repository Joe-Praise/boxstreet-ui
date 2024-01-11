import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/bookingHistory.css';
import Navigation from '../Navigation/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { GoCheckCircleFill } from 'react-icons/go';
import { RiArrowGoBackFill } from 'react-icons/ri';
import axios from '../../utils/axios';
import Loading from '../Loading';
import ScrollToTop from '../../utils/ScrollToTop';

function BookingHistory() {
	ScrollToTop();
	const navigate = useNavigate();
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(false);

	const getUser = JSON.parse(localStorage.getItem('UserData'));

	const getBookingHistory = useCallback(async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				`/bookings?cinema_id=${getUser?.cinema_id}&email=${getUser?.user_email}`
			);
			setHistory(response.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
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
		}
		// console.log(response.data);
	}, [getUser?.cinema_id, getUser?.user_email]);

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

	// const getHistoryDetails = (history) = {
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
		if (!getUser?.user_id?.length > 0) {
			navigate('/');
		} else {
			getBookingHistory();
		}
	}, [getBookingHistory]);
	return (
		<div className='bookingHistoryContainer'>
			<Navigation />
			<div className='bookinghistory'>
				<Link to='/profile' className='bhBack'>
					<RiArrowGoBackFill />
					<p>Back to Profile</p>
				</Link>

				{history?.length && (
					<div>
						<div className='historyCardFlex'>
							<span className='historycards'>
								Total Amount
								<p>₦{totalAmount.toLocaleString()}</p>
							</span>
							<span className='historycards'>
								Total Movies Watched
								<p>{totalMoviesWatched}</p>
							</span>
							<span className='historycards'>
								Total Pending Movies
								<p>{totalPendingMovies}</p>
							</span>
						</div>
					</div>
				)}
				<h2>Booking History</h2>
				{!history?.length && !loading ? (
					<>
						<h1 className='noBooking'>No Booking has been made...</h1>
					</>
				) : !history?.length && loading ? (
					<>
						<h1 className='noBooking'>Loading...</h1>
					</>
				) : (
					history?.map((movie, i) => {
						return (
							<div key={movie._id}>
								<div className='bh'>
									<Link to='/history'>
										<div className='bhCards'>
											<div className='bhdate'>
												{new Date(movie?.show_time).toDateString()}
											</div>
											<div>
												<img src={movie?.movie_id?.image} alt='movieposter' />
											</div>
											<div className='bhmovieInfo'>
												<p className='bhshowtime'>
													{new Date(movie?.show_time).toLocaleTimeString()}
												</p>
												<div className='bhMovietext'>
													<h3>{movie?.movie_id?.name}</h3>
													{/* <span>{movie?.movie_id?.genre}</span> */}
													<p>
														{movie?.movie_id?.description?.length > 250
															? movie?.movie_id?.description?.slice(0, 250) +
															  '...'
															: movie?.movie_id.description}
													</p>
												</div>
											</div>
											<div className='ticketNo'>
												Ticket No: {movie?.ticket_no}
											</div>
											<div className='iconstyle'>
												{movie?.is_checked === true ? (
													<i>
														<GoCheckCircleFill className='checkIcon' />
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
