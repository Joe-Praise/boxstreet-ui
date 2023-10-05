import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/Landing Page/LandingPage';
import Counter from './components/Counter/Counter'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/counter' element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
