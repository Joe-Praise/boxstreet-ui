import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/movieCarousel.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../utils/UserContext";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6.3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
};

// const sliderImageUrl = [
//   {
//     id: 1,
//     title: "Spider-Man: Far From Home",
//     genre: "Action, Adventure, Sci-Fi",
//     showingtime: "11:30am - 1:00pm",
//     description:
//       "Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.",
//     url: "https://media.istockphoto.com/id/506678292/photo/amazing-spider-man-action-figure.webp?s=2048x2048&w=is&k=20&c=XEWBvWPGeRdOww-iZnMWcjd48ns5CnLpdTP-wLYHDn4=",
//   },
//   {
//     id: 2,
//     title: "Frozen II",
//     genre: "Animation, Adventure, Family",
//     showingtime: "1:15pm - 2:45pm",
//     description:
//       "Elsa, Anna, Kristoff, and Olaf embark on a journey into the enchanted forest to discover the truth about an ancient mystery of their kingdom.",
//     url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*",
//   },
//   {
//     id: 21,
//     title: "The Matrix",
//     genre: "Action, Sci-Fi",
//     showingtime: "3:30pm - 4:45pm",
//     description:
//       "A computer programmer discovers that reality as he knows it is a simulation created by machines, and he joins a group of rebels to fight back.",
//     url: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 11,
//     title: "The Matrix",
//     genre: "Action, Sci-Fi",
//     showingtime: "3:30pm - 4:45pm",
//     description:
//       "A computer programmer discovers that reality as he knows it is a simulation created by machines, and he joins a group of rebels to fight back.",
//     url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSu_HQf7Sgkij6NptUWlEKf6V9n5bC5cL1JfGFNylGC8VnfN_-N",
//   },
//   {
//     id: 12,
//     title: "The Shawshank Redemption",
//     genre: "Drama",
//     showingtime: "5:00pm - 6:50pm",
//     description:
//       "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//     url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
//   },
//   {
//     id: 13,
//     title: "Inception",
//     genre: "Horror, Action, Adventure, Comedy",
//     showingtime: "11:30am - 1pm",
//     description:
//       "A thief who enters the dreams of others to steal their secrets is tasked with planting an idea into a CEO's mind. A thief who enters the dreams of others to steal their secrets is tasked with planting an idea into a CEO's mind",
//     url: "https://images.unsplash.com/photo-1613051884057-d9130a00a5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9ycm9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     id: 14,
//     title: "Jurassic Park",
//     genre: "Adventure, Sci-Fi",
//     showingtime: "5:00pm - 6:50pm",
//     description:
//       "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
//     url: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1",
//   },
//   {
//     id: 15,
//     title: "Interstellar",
//     genre: "Adventure, Drama, Sci-Fi",
//     showingtime: "11:30am - 1pm",
//     description:
//       "A group of explorers travel through a wormhole near Saturn in search of a new habitable planet for humanity.",
//     url: "https://images.unsplash.com/photo-1611165946687-896e3845d3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzdCUyMGFuZCUyMGZ1cmlvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//   },
// ];

function MovieCarousel({ doubleMovies }) {
  const ctx = useContext(AppContext);
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
      >
        {doubleMovies?.map((movie) => {
          return (
            <div className="csslider" key={movie._id}>
              <Link to={`/movie/${movie._id}`}>
                <div className="csCards">
                  <img src={movie.image} alt="movieposter" />
                  <div className="csmovieInfo">
                    <div>
                      <h3>{movie.name}</h3>
                      <span>{movie?.genre}</span>
                      <p>{movie.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default MovieCarousel;
