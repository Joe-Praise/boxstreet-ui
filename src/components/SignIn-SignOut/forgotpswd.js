import React, { useState } from 'react';
import '../../styles/verifyUser.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import axios from 'axios';
import config from "../../config";


function ForgotPswd() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const requestData = {
      email,
    };

    try {
      const response = await axios.post( config.AUTH_REQUEST_URL + "/forgot-password", requestData);

      if (response.status === 200) {
        setResetMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setEmailError(error.response.data.error);
      } else {
        console.error('An error occurred:', error);
      }
    }

    localStorage.setItem("boxStreet",email);
    navigate("/reset")

  };

  return (
    <div>
      <main className='verify-users'>
        <h2 className='verify-intro'>Forgot your password?</h2>
        <h4 className='verify-update'>A link will be sent to your verified Email</h4>
        <form onSubmit={handleSubmit}>
          <input
            className='pswd-input'
            type='email'
            name='email'
            placeholder='Enter your verified Email here......'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='error-message'>{emailError}</div>
          <button className='verify-btn' type='submit'>
            Continue
          </button>{' '}
          <br />
          {resetMessage && <div className='reset-success'>{resetMessage}</div>}
          <small>
            Don't have an account? <Link to='/signup' className='verify-footer'>Create an Account</Link>
          </small>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default ForgotPswd;
