import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing Page/LandingPage";
import SignUp from "./components/SignIn-SignOut/signUp";
import VerifyUser from "./components/SignIn-SignOut/verifyUser";
import SingleMovie from "./components/Singlemovie/Singlemovie";
import BookingHistory from "./components/Profile/BookingHistory";
import Booking from "./components/Booking/Booking";
import ForgotPswd from "./components/SignIn-SignOut/forgotpswd";
import ResetPassword from "./components/SignIn-SignOut/resetPassword";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verify" element={<VerifyUser />} />
          <Route path="/forgot" element={<ForgotPswd/>} />
          <Route path="/reset" element={<ResetPassword/>} />
          <Route path="/movie" element={<SingleMovie />} />
          <Route path="/history"element={<BookingHistory />}/>
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
