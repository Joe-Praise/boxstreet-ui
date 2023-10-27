import React, { useCallback, useContext, useEffect, useState } from "react";
import "../../styles/changepass.css";
import Navigation from "../Navigation/Navigation";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/UserContext";

function ChangePass() {
  const navigate = useNavigate();
  const ctx = useContext(AppContext);
  const [loginDetails] = ctx.getLoginDetails;
  const [updatePwd, setUpdatePwd] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    if (!loginDetails?.user_id?.length) {
      navigate("/");
    }
  }, []);

  const handleInputValue = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setUpdatePwd({ ...updatePwd, [key]: value });
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/auth/update-password`, updatePwd);
      const data = response.data.status;
      if (data === "success") {
        navigate("/register");
        localStorage.removeItem("UserData");
      } else {
        alert("something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="">
        <form className="ccPassform" onSubmit={updatePassword}>
          <h2>Change Password</h2>
          <div className="ccPassform-group">
            <label htmlFor="email">Email:</label>
            <span></span>
            <input
              type=""
              name="email"
              id="email"
              placeholder="Enter your email"
              className="inputs"
              required
              value={updatePwd.email}
              onChange={handleInputValue}
            />
          </div>
          <div className="ccPassform-group">
            <label htmlFor="currentPwd">Current Password:</label>
            <span></span>
            <input
              type="password"
              id="currentPwd"
              placeholder="Input current password"
              name="password"
              className="inputs"
              required
              value={updatePwd.password}
              onChange={handleInputValue}
            />
          </div>
          <div className="ccPassform-group">
            <label htmlFor="newPassword">New Password:</label>
            <span></span>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              className="inputs"
              required
              value={updatePwd.newPassword}
              onChange={handleInputValue}
            />
          </div>
          <section>*NOTE: Password should be at least 8 characters</section>
          <div className="ccPassform-group">
            <button className="ccPassform-btn">Submit Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePass;
