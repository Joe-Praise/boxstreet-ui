import React from "react";
import "../../styles/banner.css";
import Navigation from "../Navigation/Navigation";
import { GoDotFill } from "react-icons/go";
import ban1 from "../uploads/expendables.webp";
import ban2 from "../uploads/the-exorcist-film-poster-f69rptkyultqrtnr.webp";
import ban3 from "../uploads/promo2.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Banner() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const BannerSlide = [
    {
      id: 1,
      title: "Expend4bles",
      genre: "Action, Adventure, Sci-Fi",
      description:
        "Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning.",
      img: ban1,
      cinema: "Filmhouse Cinema",
    },
    {
      id: 2,
      title: "The Excorcist",
      genre: "Horror, Thriller",
      description:
        "When his daughter, Angela, and her friend Katherine, show signs of demonic possession, it unleashes a chain of events that forces single father Victor Fielding to confront the nadir of evil. Terrified and desperate, he seeks out Chris MacNeil, the only person alive who's witnessed anything like it before.",
      img: ban2,
      cinema: "Silverbird Cinema",
    },
    {
      id: 3,
      title: "BOXSTREET CINEMA",
      description: "Bringing to you the best cinematic experience you wish for",
      img: ban3,
      cinema: "Boxstreet Cinema",
    },
  ];

  return (
    <div>
      <Navigation />
      <div className="parent">
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={false}
          infinite={true}
          autoPlay={true}
          partialVisible={false}
        >
          {BannerSlide.map((banner) => {
            return (
              <div className="landingbanner">
                <img src={banner.img} alt={banner.title} />

                <div className="landingbannerContent">
                  <div className="landingbannerSlideDescription">
                    <ul>
                      <li>Action</li> <GoDotFill className="landingblueDot" />
                      <li>Adventure</li>{" "}
                      <GoDotFill className="landingblueDot" />
                      <li>Thriller</li>
                    </ul>
                    <h1>{banner.title}</h1>
                    <p>{banner.description}</p>
                  </div>
                  <div className="landingbannerBtns">
                    <button className="landingbtnBuyTickets">
                      Buy Tickets
                    </button>
                    <button className="landingbtnWatchTrailer">
                      Watch Trailer
                    </button>
                    <GoDotFill className="landingblueDot" />
                    <p>{banner.cinema}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Banner;
