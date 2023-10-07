import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing Page/LandingPage";
import Singlemovie from "./components/Singlemovie/Singlemovie";
import SignUp from "./components/SignIn-SignOut/signUp";
import VerifyUser from "./components/SignIn-SignOut/verifyUser";
import SingleMovie from "./components/Singlemovie/Singlemovie";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movie" element={<Singlemovie />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verify" element={<VerifyUser />} />
          <Route path="/movie" element={<SingleMovie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
