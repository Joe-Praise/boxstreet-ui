import React from "react";
import Navigation from "../Navigation/Navigation";
import "../../styles/profile.css";
import dp from "../uploads/african-american-business-woman.jpg";
import banPic from "../uploads/rows-red-seats-theater_53876-64710.avif";
import { BsBookFill, BsBookmarkCheckFill, BsBookshelf } from "react-icons/bs";
import { MdOutlineBook } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="userPPage">
      <Navigation />
      <div className="userProfile">
        <div className="uPbanner">
          <img src={banPic} alt="" />
          <h2>Hello, Jacintha</h2>
        </div>

        <div className="upMainPage">
          <div>
            <div className="userProfileInfo">
              <div className="dppasssignout">
                <img src={dp} alt="" />
                <div className="userUserandPass">
                  <div>
                    <span>_jae.lodan</span>
                    <button className="pPass">Change Password</button>

                    <button className="pSignout">Sign Out</button>
                  </div>
                </div>
              </div>
              <div className="userProfileDetails">
                <h3>First Name:</h3> <span>Jacintha</span>
                <h3>Last Name:</h3> <span>Lodan</span>
                <h3>Email:</h3> <span>test@email.com</span>
                <h3>Cinema</h3> <span>Eko cinema</span>
              </div>
              <Link to="/history">
                <div className="pbookhist">
                  <RiHistoryFill />
                  <span>Booking History</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
