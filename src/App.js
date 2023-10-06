import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/Landing Page/LandingPage';
import Counter from './components/Counter/Counter'
import Singlemovie from './components/Singlemovie/Singlemovie';
import SignUp from './components/SignIn-SignOut/signUp';
import VerifyUser from './components/SignIn-SignOut/verifyUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/movie' element={<Singlemovie/>} />
          <Route path='/counter' element={<Counter />} />
          <Route path='/reg' element={<SignUp/>} />
          <Route path='/verify' element={<VerifyUser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
