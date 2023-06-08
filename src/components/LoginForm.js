import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utilities/users/users-service';

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await login(credentials);
      setUser(user);
      navigate('/categories');
    } catch {
      setError('Unable to log in - try again');
    }
  }

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center tracking-wide">
          Welcome back
        </h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="form-control"
        >
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            id="username"
            className="input input-bordered input-sm"
          />
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            id="password"
            className="input input-bordered input-sm"
          />
          <button type="submit" className="btn btn-primary btn-sm mt-4">
            Log In
          </button>
        </form>
        {error && (
          <div className="alert alert-error text-sm p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
