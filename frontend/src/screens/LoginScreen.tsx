// Add this import
import { login } from '../services/api/authService';

// Replace handleLogin with this
const handleLogin = async () => {
  setIsLoading(true);

  try {
    await login(dispatch, email, password);
    navigation.replace('Home');
  } catch (error) {
    Alert.alert('Login Failed', 'Please check your email and password');
  } finally {  
    setIsLoading(false);
  }
};