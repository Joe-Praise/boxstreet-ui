import React, { useEffect, useState } from 'react';
import '../../styles/verifyUser.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import axios from 'axios';
import config from "../../config";

function VerifyUser() {
  // State for storing OTP and verification status
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [verificationStatus, setVerificationStatus] = useState(null);

  // Function to handle changes in OTP input fields
  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;

    // Update the OTP array with the new value
    setOtp([...otp.map((data, i) => (i === index ? e.target.value : data))]);

    // If there's a value in the current input and there's a next input, focus on the next input
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  // Function to make an asynchronous request to verify the OTP
  async function verifyOTP(otp) {
    try {
      const response = await axios.post(config.AUTH_REQUEST_URL + "/verify", { otp });

      // Check if the response indicates a successful verification
      if (response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Request failed', error);
      return false;
    }
  }

  // Function to handle the verification process
  const handleVerify = async () => {
    const enteredCode = otp.join('');

    if (await verifyOTP(enteredCode)) {
      setVerificationStatus('success');
      navigate('/register');
    } else {
      setVerificationStatus('error');
    }
  };

  // Effects to run when the component mounts
  useEffect(() => {
    // Remove the 'registration' class from the body element
    document.body.classList.remove('registration');
  }, []);

  // Hook for navigation
  const navigate = useNavigate();

  return (
    <div>
      <main className="verify-users">
        <h2 className="verify-intro">User Verification</h2>
        <h4 className="verify-update">We have sent a code to your Email</h4>
        <div className="otp">
          {otp.map((data, indx) => (
            <input
              key={indx}
              className="verify-input"
              type="text"
              value={data}
              maxLength={1}
              onChange={(e) => handleChange(e, indx)}
            />
          ))}
        </div>
        {verificationStatus === 'error' && (
          <p className="error-message">Incorrect code. Please try again.</p>
        )}
        <button className="verify-btn" onClick={handleVerify}>
          Verify Account
        </button>
        <br />
        <small>
          Didn't receive the code?
          <Link onClick={handleVerify} className="verify-footer">Resend OTP</Link>
        </small>
      </main>
      <Footer />
    </div>
  );
}

export default VerifyUser;





