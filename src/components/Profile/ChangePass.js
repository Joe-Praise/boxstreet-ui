import React from "react";
import '../../styles/changepass.css'
import Navigation from "../Navigation/Navigation";

function ChangePass() {
  return (
    <div>
      <Navigation />
      <div className="">
        <form className="ccPassform">
          <h2>Change Password</h2>
          <div className="ccPassform-group">
            <label for="">Email:</label>
            <span></span>
            <input type="email" name="name" className="inputs" required />
          </div>
          <div className="ccPassform-group">
            <label for="">Current Password:</label>
            <span></span>
            <input type="password" name="name" className="inputs" required />
          </div>
          <div className="ccPassform-group">
            <label for="">New Password:</label>
            <span></span>
            <input type="password" name="name" className="inputs" required />
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
