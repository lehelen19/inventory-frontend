import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Logo</Link>
      <Link to="/about">About</Link>
      <Link to="/categories">Inventory</Link>
    </nav>
  );
};

export default Navbar;
