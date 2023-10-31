import React, { useState } from "react";
import "../../styles/changepass.css";
// import Navigation from "../Navigation/Navigation";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState();

  const [updatePwd, setUpdatePwd] = useState({
    email: "",
    code: "",
    password: "",
  });

  const handleInputValue = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setUpdatePwd({ ...updatePwd, [key]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!updatePwd.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(updatePwd.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!updatePwd.code) {
      errors.code = "Enter your rest code";
    }

    if (!updatePwd.password) {
      errors.password = "Enter your new password";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = validateForm();
      console.log(updatePwd);
      if (isFormValid) {
        const response = await axios.patch(`/auth/reset-password`, updatePwd);
        const data = response.data;
        if (data.msg === "Password successfully updated!") {
          setUpdatePwd({
            email: "",
            code: "",
            password: "",
          });
          alert("Password updated! Login to have access.");
          navigate("/register");
        } else {
          alert("something went wrong!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <Navigation /> */}
      <div className="">
        <form className="ccPassform" onSubmit={updatePassword}>
          <h2>Reset Password</h2>
          <div className="ccPassform-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="inputs"
              required
              value={updatePwd?.email}
              onChange={handleInputValue}
            />
            {formErrors?.email && (
              <p className="error-message">{formErrors.email}</p>
            )}
          </div>
          <div className="ccPassform-group">
            <label htmlFor="code">Code:</label>
            <span></span>
            <input
              type="number"
              id="code"
              placeholder="Enter code"
              name="code"
              className="inputs"
              required
              value={updatePwd.code}
              onChange={handleInputValue}
            />
          </div>
          <div className="ccPassform-group">
            <label htmlFor="password">New Password:</label>
            <span></span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              className="inputs"
              required
              value={updatePwd.password}
              onChange={handleInputValue}
            />
          </div>
          <section>*NOTE: Password should be at least 8 characters</section>

          {formErrors?.branch_id && (
            <p className="error-message">{formErrors.branch_id}</p>
          )}
          <div className="ccPassform-group">
            <button className="ccPassform-btn">Submit Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
