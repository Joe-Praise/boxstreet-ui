import React from "react";
import "../../styles/singlemovie.css";
import banner from "../uploads/the-exorcist-film-poster-f69rptkyultqrtnr.webp";
import johnsnow from "../uploads/johnsnow.jpeg";
import denareesa from "../uploads/denareesa-.jpeg";
import pedropascal from "../uploads/pedro pascal.jpeg";
import { GoDotFill } from "react-icons/go";
import { CiPlay1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import MovieCarousel from "../Landing Page/MovieCarousel";
import Footer from "../Footer";

function SingleMovie() {
  return (
    <div>
      <div className="singlemovcont">
        <div className="movbanner">
          <div className="movMainBanner">
            <img src={banner} alt="" />
          </div>
          <div className="movtext">
            <div className="movtextLeft">
              <div className="movGenre">
                <ul>
                  <li>Horror</li> <GoDotFill className="movBlueDot" />
                  <li>Adventure</li> <GoDotFill className="movBlueDot" />
                  <li>Thriller</li>
                </ul>
              </div>
              <h2 className="movTitle">The Excorist</h2>
              <div className="movDescription">
                <p>
                  American fantasy drama television series created by David
                  Benioff and D. B. Weiss for HBO. It is an adaptation of A Song
                  of Ice and Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Quis necessitatibus modi atque quibusdam earum nihil
                  enim suscipit possimus itaque, sapiente aut odio voluptas eius
                  iure dolorem sunt nam perferendis est.
                </p>
                <Link to="/" className="movWatchT">
                  <font>
                    <CiPlay1 />
                  </font>
                  <span>Watch Trailer</span>
                </Link>
              </div>
              <div className="movCastnBook">
                <div className="castcontainer">
                  <h4>Cast</h4>
                  <div className="movCasts">
                    <div className="movCastInfo">
                      <img src={johnsnow} alt="" />
                      <span>Ellen Burstyn</span>
                    </div>
                    <div className="movCastInfo">
                      <img src={denareesa} alt="" />
                      <span>Ann Sowd</span>
                    </div>
                    <div className="movCastInfo">
                      <img src={pedropascal} alt="" />
                      <span>Leslie Odom Jr.</span>
                    </div>
                  </div>
                </div>
                <div className="movShowtimes">
                  <h4>Showtimes</h4>
                  <div className="movShowflex">
                    <Link to="" className="movtimes">
                      <span>8:45pm - Premium</span>
                    </Link>
                    <Link to="" className="movtimes">
                      <span>11:40pm - 2D</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="movAlsoShow">
        <div className="alsoshowingflex">
          <h2>Also Showing</h2>
          <div className="allshowVenueDates">
            <select className="smselect" name="location">
              <option value="Jabi">Jabi</option>
              <option value="Maitama">Maitama</option>
              <option value="Asokoro">Asokoro</option>
              <option value="Lugbe">Lugbe</option>
              <option value="Apo">Apo</option>
            </select>

            <select className="smselect" name="theater">
              <option value="Theater1">Theater 1</option>
              <option value="Theater2">Theater 2</option>
              <option value="Theater3">Theater 3</option>
            </select>

            <select className="smselect" name="viewDays">
              <option value="today">Today</option>
              <option value="tomorrow">Oct 6th</option>
              <option value="saturday">Oct 7th</option>
              <option value="sunday">Oct 8th</option>
              <option value="monday">Oct 9th</option>
              <option value="tusday">Oct 10th</option>
            </select>
          </div>
        </div>
        <MovieCarousel />
      </div>
        <Footer />
    </div>
  );
}

export default SingleMovie;
