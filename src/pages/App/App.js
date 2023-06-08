import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users/users-service';
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import Navbar from '../../components/NavBar';
import InventoryPage from '../InventoryPage/InventoryPage';
import AboutPage from '../AboutPage/AboutPage';
import CategoryDetailPage from '../CategoryDetailPage/CategoryDetailPage';
import FoodItemDetailPage from '../FoodItemDetailPage/FoodItemDetailPage';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route
            path="/categories"
            element={<InventoryPage user={user} />}
          ></Route>
          <Route
            path="/categories/:id"
            element={<CategoryDetailPage user={user} />}
          ></Route>
          <Route
            path="/items/:id"
            element={<FoodItemDetailPage user={user} />}
          ></Route>
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
