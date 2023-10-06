import React, { useState } from 'react';
import '../../styles/verifyUser.css'
import { Link } from "react-router-dom";
import Footer from '../Footer';

function VerifyUser() {
  const [otp, setOtp] = useState(new Array(4).fill(""))

  function handleChange(e, index){
    if(isNaN(e.target.value)) return false;

    setOtp([...otp.map((data, i)=>(i === index? e.target.value:data))])

    if(e.target.value && e.target.nextSibling){
      e.target.nextSibling.focus()
    }

  }

  return (
    <div>
        <main className='verify-users'>
            <h1 className='verify-intro'>User Verification</h1>
            <h4 className='verify-update'>We have sent a code to your Email</h4>
            <div className="otp">
              {  otp.map((data, indx)=>{
                  return <input className='verify-input' type="text" 
                  value={data}
                  maxLength={1}
                  onChange={(e)=>handleChange(e, indx)} />
                })}
            </div>
            <button onClick={()=>alert(otp.join(""))} className="verify-btn">Verify Account</button> <br />
            <small>Didn't recieve code?
            <Link className='verify-footer'>Resend OTP</Link>
            </small>
        </main>
        <Footer/>
    </div>
  )
}

export default VerifyUser