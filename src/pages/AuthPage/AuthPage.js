import { useState } from 'react';
import LoginForm from '../../components/NavBar/LoginForm';
import SignupForm from '../../components/NavBar/SignupForm';

const AuthPage = ({ setUser }) => {
  const [loginDisplay, setLoginDisplay] = useState(true);
  return (
    <main className="hero min-h-screen bg-base-200">
      {loginDisplay ? (
        <div className="hero-content flex-col lg:flex-row-reverse">
          <LoginForm setUser={setUser} />
          <button
            onClick={() => setLoginDisplay(!loginDisplay)}
            className="label-text-alt link link-hover"
          >
            Sign up instead
          </button>
        </div>
      ) : (
        <div>
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
