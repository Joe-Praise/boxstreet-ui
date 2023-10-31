import React, { useEffect, useState } from "react";
import "../../styles/verifyUser.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import axios from "../../utils/axios";
import Loading from "../Loading";

function VerifyUser() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;

    setOtp([...otp.map((data, i) => (i === index ? e.target.value : data))]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  const handleVerification = async () => {
    try {
      setIsLoading((prevState) => !prevState);
      const signUpEmail = JSON.parse(localStorage.getItem("signUpEmail"));
      const OTP = otp.join("").toString();
      const verifyData = {
        email: signUpEmail.email,
        code: OTP,
      };
      const response = await axios.post("/verifications/verify", verifyData);
      const data = response.data.msg;
      if (data === "Verfication successful") {
        alert("Verification successful!");
        navigate("/register");
        localStorage.removeItem("signUpEmail");
      } else {
        alert("Wrong OTP code provided!");
      }
      setIsLoading((prevState) => !prevState);
    } catch (err) {
      setIsLoading((prevState) => !prevState);
      console.log(err.message);
    }
  };

  const getNewVerificationCode = async () => {
    try {
      const signUpEmail = JSON.parse(localStorage.getItem("signUpEmail"));
      const verifyData = {
        cinema_id: signUpEmail.cinema_id,
        branch_id: signUpEmail.branch_id,
        email: signUpEmail.email,
      };

      const response = await axios.post("/verifications/resend", verifyData);
      const data = response.data;

      if (data) {
        alert("New verify code sent tp your email");
      } else {
        alert("An error occured!");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    document.body.classList.remove("registration");
  }, []);

  return (
    <div className="verifyContainer">
      <main className="verify-users">
        <h1 className="verify-intro">User Verification</h1>
        <h4 className="verify-update">We have sent a code to your Email</h4>
        <div className="otp">
          {otp.map((data, indx) => {
            return (
              <input
                key={indx}
                className="verify-input"
                type="text"
                value={data}
                maxLength={1}
                onChange={(e) => handleChange(e, indx)}
              />
            );
          })}
        </div>
        <button onClick={handleVerification} className="verify-btn">
          {isLoading ? <Loading /> : "Verify Account"}
        </button>{" "}
        <br />
        <small>
          Didn't recieve code?
          <span className="verify-footer" onClick={getNewVerificationCode}>
            Resend OTP
          </span>
        </small>
      </main>
      <Footer />
    </div>
  );
}

export default VerifyUser;
