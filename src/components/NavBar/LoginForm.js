import { useState } from 'react';
import * as usersService from '../../utilities/users/users-service';

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
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      console.log('Error logging in');
    }
  }

  return (
    <div>
      <h3>Sign In</h3>
      <form autoComplete="off" onSubmit={handleSubmit}></form>
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
    </div>
  );
};

export default LoginForm;
