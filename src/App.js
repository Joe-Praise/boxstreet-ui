import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/Landing Page/LandingPage';
import Counter from './components/Counter/Counter'
import Singlemovie from './components/Singlemovie/Singlemovie';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/movie' element={<Singlemovie/>} />
          <Route path='/counter' element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
