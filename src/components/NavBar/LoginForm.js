import { useState } from 'react';
import { login } from '../../utilities/users/users-service';

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await login(credentials);
      setUser(user);
    } catch {
      console.log('Error logging in');
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        required
        id="username"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        required
        id="password"
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
