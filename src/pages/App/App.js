import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../../components/NavBar/NavBar';
import InventoryPage from '../InventoryPage/InventoryPage';
import AboutPage from '../AboutPage/AboutPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/categories" element={<InventoryPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
