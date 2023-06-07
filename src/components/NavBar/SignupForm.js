import { useState } from 'react';
import { signUp } from '../../utilities/users/users-service';

const SignupForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirm: '',
    key: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { ...credentials };
      delete formData.confirm;

      const user = await signUp(formData);
      setUser(user);
    } catch {
      console.log('Sign up failed - try again');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const disabled = credentials.password !== credentials.confirm;

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label htmlFor="key">Admin Secret Key</label>
        <input
          type="password"
          name="key"
          value={credentials.key}
          onChange={handleChange}
          required
          id="key"
        />
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

        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          name="confirm"
          value={credentials.confirm}
          onChange={handleChange}
          required
          id="confirm"
        />
        <button type="submit" disabled={disabled}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
