import React from "react";
import '../../styles/changepass.css'
import Navigation from "../Navigation/Navigation";

function ChangePass() {
  return (
    <div>
      <Navigation />
      <div className="ccPassForm">
        <form className="ccPassform">
          <h2>Change Password</h2>
          <div class="ccPassform-group">
            <label for="">Email:</label>
            <span></span>
            <input type="email" name="email" class="inputs" required />
          </div>
          <div class="ccPassform-group">
            <label for="">Current Password:</label>
            <span></span>
            <input type="password" name="password" class="inputs" required />
          </div>
          <div class="ccPassform-group">
            <label for="">New Password:</label>
            <span></span>
            <input type="password" name="password" class="inputs" required />
          </div>
          <section>*NOTE: Password should be at least 8 characters</section>
          
          <div class="ccPassform-group">
            <button class="ccPassform-btn">Submit Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePass;
