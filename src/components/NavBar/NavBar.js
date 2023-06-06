import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Logo</Link>
      <a href="">About</a>
      <Link to="/categories">Inventory</Link>
      <a href="">Admin Login</a>
    </nav>
  );
};

export default Navbar;
