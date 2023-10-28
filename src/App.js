import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing Page/LandingPage";
import SignUp from "./components/SignIn-SignOut/signUp";
import VerifyUser from "./components/SignIn-SignOut/verifyUser";
import SingleMovie from "./components/Singlemovie/Singlemovie";
import BookingHistory from "./components/Profile/BookingHistory";
import Booking from "./components/Booking/Booking";
import UserContext from "./utils/UserContext";
import Profile from "./components/Profile/Profile";
import ChangePass from "./components/Profile/ChangePass";
import ForgotPassword from "./components/Forgot-Password/ForgotPassword";
import "./App.css";
import ResetPassword from "./components/Forgot-Password/ResetPassword";

function App() {
  return (
    <div className="App">
      <UserContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/verify" element={<VerifyUser />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePass />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </UserContext>
    </div>
  );
}

export default App;
