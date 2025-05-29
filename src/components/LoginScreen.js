import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../redux/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(loginAsync({ email, password }));
  };

  return (
    // JSX for login form
    // Render email and password fields
    // Show loading spinner when isLoading is true
    // Display error message if error exists
    // Call handleLogin on form submit
  );
};

export default LoginScreen;