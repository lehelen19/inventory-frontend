import { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';

const AuthPage = ({ setUser }) => {
  const [loginDisplay, setLoginDisplay] = useState(true);
  return (
    <main className="hero pt-10 bg-base-200">
      {loginDisplay ? (
        <div className="hero-content flex-col">
          <LoginForm setUser={setUser} />
          <button
            onClick={() => setLoginDisplay(!loginDisplay)}
            className="label-text-alt link link-hover"
          >
            Sign up instead
          </button>
        </div>
      ) : (
        <div className="hero-content flex-col">
          <SignupForm setUser={setUser} />
          <button
            onClick={() => setLoginDisplay(!loginDisplay)}
            className="label-text-alt link link-hover"
          >
            Already have an account?
          </button>
        </div>
      )}
    </main>
  );
};

export default AuthPage;
