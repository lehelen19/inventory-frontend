import { Link } from 'react-router-dom';
import { logOut } from '../../utilities/users/users-service';

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav>
      <Link to="/">Logo</Link>
      <Link to="/about">About</Link>
      <Link to="/categories">Inventory</Link>
      <button onClick={handleLogout}>Log Out</button>
    </nav>
  );
};

export default Navbar;
