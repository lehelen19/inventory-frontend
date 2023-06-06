import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../../components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
