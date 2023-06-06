import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../../components/NavBar/NavBar';
import InventoryPage from '../InventoryPage/InventoryPage';
import AboutPage from '../AboutPage/AboutPage';
import CategoryDetailPage from '../CategoryDetailPage/CategoryDetailPage';
import FoodItemDetailPage from '../FoodItemDetailPage/FoodItemDetailPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/categories" element={<InventoryPage />}></Route>
          <Route
            path="/categories/:id"
            element={<CategoryDetailPage />}
          ></Route>
          <Route path="/items/:id" element={<FoodItemDetailPage />}></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
