import { useState } from 'react';
import LoginForm from '../../components/NavBar/LoginForm';
import SignupForm from '../../components/NavBar/SignupForm';

const AuthPage = () => {
  const [loginDisplay, setLoginDisplay] = useState(true);
  return <main>{loginDisplay ? <LoginForm /> : <SignupForm />}</main>;
};

export default AuthPage;
