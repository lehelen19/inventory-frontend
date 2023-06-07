import { useState } from 'react';
import LoginForm from '../../components/NavBar/LoginForm';
import SignupForm from '../../components/NavBar/SignupForm';

const AuthPage = ({ setUser }) => {
  const [loginDisplay, setLoginDisplay] = useState(true);
  return (
    <main>
      {loginDisplay ? (
        <LoginForm setUser={setUser} />
      ) : (
        <SignupForm setUser={setUser} />
      )}
    </main>
  );
};

export default AuthPage;
