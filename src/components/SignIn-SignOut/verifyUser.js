import React, { useState } from 'react';
import '../../styles/verifyUser.css'

function VerifyUser() {
  const [otp, setOtp] = useState()

  return (
    <div>
        <main>
            <h2>Verify User</h2>
            <div className="otp">
              {
                // otp.map((data, i)=>{
                //   return <input type="text"/>
                // })

                 <input type="text"/>
              }
            </div>
        </main>
    </div>
  )
}

export default VerifyUser