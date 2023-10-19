import React, { useContext, useState } from "react";
import "../../styles/banner.css";
import Navigation from "../Navigation/Navigation";
import { GoDotFill } from "react-icons/go";
// import ban1 from "../uploads/expendables.webp";
// import ban2 from "../uploads/the-exorcist-film-poster-f69rptkyultqrtnr.webp";
// import ban3 from "../uploads/promo2.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AppContext } from "../../utils/UserContext";

function Banner() {
  const ctx = useContext(AppContext);
  const [initData] = ctx.getInitData;
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
          {initData.doubleMovies?.slice(0, 5)?.map((banner) => {
            return (
              <div className="landingbanner" key={banner._id}>
                <img src={banner.image} alt={banner.title} />
                <div className="landingbannerContent">
                  <div className="landingbannerSlideDescription">
                    <ul>
                      {banner.genre?.map((el, i, arr) => {
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
                      })}
                    </ul>
                    <h1>{banner.name}</h1>
                    <p>{banner.description}</p>
                  </div>
                  <div className="landingbannerBtns">
                    <button className="landingbtnBuyTickets">
                      Buy Tickets
                    </button>
                    <a
                      href={`${banner.trailer}`}
                      rel="noreferrer"
                      className="landingbtnWatchTrailer"
                      target="_blank"
                    >
                      Watch Trailer
                    </a>
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
