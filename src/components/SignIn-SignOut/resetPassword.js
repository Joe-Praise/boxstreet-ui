import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/verifyUser.css';
import axios from 'axios'; 
import Footer from '../Footer'; 
import config from "../../config";

function ResetPassword() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    let email = localStorage.getItem("boxStreet")

    const data = {
      password,
      email,
      code
    };

    try {
      
      const response = await axios.post(config.AUTH_REQUEST_URL + "/reset-password", data);

      if (response.status === 200) {
        setResetSuccess(true);
        navigate("/login")
      } else {
       
        setError('Password reset failed.');
      }
    } catch (error) {
      
      setError('An error occurred. Please try again later.');
    }
  };


  const renderSuccessMessage = () => {
    return (
      <div>
        <p className="success-message">Password reset successful!</p>
        {}
      </div>
    );
  };

  return (
    <div className="reset-password-container">
      <main className="verify-users">
        <h2 className="verify-intro">New Password</h2>
        <h4 className="verify-update">Please create a new password here</h4>
        
        {resetSuccess ? (
          renderSuccessMessage()
        ) : (
          <form onSubmit={handleSubmit}>
               <input
              className="pswd-input"
              type="text"
              name="code"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              className="pswd-input"
              type="password"
              name="password"
              placeholder="Create new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="pswd-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button className="verify-btn" type="submit">
              Change
            </button>
            {/* {error && <p className="error-message">{error}</p>} */}
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ResetPassword;

