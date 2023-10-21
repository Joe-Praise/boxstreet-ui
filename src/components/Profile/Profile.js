import React, { useCallback, useContext, useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import "../../styles/profile.css";
import dp from "../uploads/african-american-business-woman.jpg";
import banPic from "../uploads/rows-red-seats-theater_53876-64710.avif";
import { BsBookFill, BsBookmarkCheckFill, BsBookshelf } from "react-icons/bs";
import { MdOutlineBook } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AppContext } from "../../utils/UserContext";
import axios from "../../utils/axios";

function Profile() {
  const ctx = useContext(AppContext);
  const [loginDetails] = ctx.getLoginDetails;
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = useCallback(async () => {
    try {
      if (loginDetails?.user_id) {
        const response = await axios.get(`/users/${loginDetails?.user_id}`);
        const user = response.data.data;
        setUserInfo(user);
      } else return;
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
  }, [loginDetails?.user_id]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  // console.log(userInfo);
  return (
    <div className="userPPage">
      <Navigation />
      <div className="userProfile">
        <div className="uPbanner">
          <img src={banPic} alt="" />
          <h2>Hello, {userInfo?.name?.split(" ")[0]}</h2>
        </div>

        <div className="upMainPage">
          <div>
            <div className="userProfileInfo">
              <div className="dppasssignout">
                <img
                  src={userInfo?.image ? userInfo?.image : dp}
                  alt="user avi"
                />
                <div className="userUserandPass">
                  <div>
                    {/* <span>_jae.lodan</span> */}
                    <button className="pPass">Change Password</button>

                    <button className="pSignout">Sign Out</button>
                  </div>
                </div>
              </div>
              <div className="userProfileDetails">
                <h3>First Name:</h3>{" "}
                <span>{userInfo?.name?.split(" ")[0]}</span>
                <h3>Last Name:</h3> <span>{userInfo?.name?.split(" ")[1]}</span>
                <h3>Email:</h3> <span>{userInfo?.email}</span>
                <h3>Cinema:</h3> <span>{userInfo?.cinema_id?.name}</span>
                <h3>Branch:</h3> <span>{userInfo?.branch_id?.name}</span>
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
