import { Link } from 'react-router-dom';
import { logOut } from '../utilities/users/users-service';

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Home
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/categories">Inventory</Link>
          </li>

          {user ? (
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          ) : (
            <li>
              <Link to="/authenticate">Admin Auth</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
