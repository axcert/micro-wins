import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from '../redux/authSlice';

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    dispatch(registerAsync({ name, email, password }));
  };

  return (
    // JSX for registration form  
    // Render name, email, and password fields
    // Show loading spinner when isLoading is true
    // Display error message if error exists
    // Call handleRegistration on form submit
  );
};

export default RegistrationScreen;