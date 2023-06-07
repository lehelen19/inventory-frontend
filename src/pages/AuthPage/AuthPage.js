import { useState } from 'react';
import LoginForm from '../../components/NavBar/LoginForm';
import SignupForm from '../../components/NavBar/SignupForm';

const AuthPage = ({ setUser }) => {
  const [loginDisplay, setLoginDisplay] = useState(false);
  return (
    <main>
      {loginDisplay ? (
        <div>
          <LoginForm setUser={setUser} />
          <button onClick={() => setLoginDisplay(!loginDisplay)}>
            Sign up instead
          </button>
        </div>
      ) : (
        <div>
          <SignupForm setUser={setUser} />
          <button onClick={() => setLoginDisplay(!loginDisplay)}>
            Already have an account?
          </button>
        </div>
      )}
    </main>
  );
};

export default AuthPage;
