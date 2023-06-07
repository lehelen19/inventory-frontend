import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users/users-service';
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import Navbar from '../../components/NavBar/NavBar';
import InventoryPage from '../InventoryPage/InventoryPage';
import AboutPage from '../AboutPage/AboutPage';
import CategoryDetailPage from '../CategoryDetailPage/CategoryDetailPage';
import FoodItemDetailPage from '../FoodItemDetailPage/FoodItemDetailPage';
import './App.css';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
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
          <Route
            path="/authenticate"
            element={<AuthPage setUser={setUser} />}
          ></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
