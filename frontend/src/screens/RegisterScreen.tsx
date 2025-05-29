// Add this import
import { register } from '../services/api/authService';

// Replace handleRegister with this  
const handleRegister = async () => {
  setIsLoading(true);

  try {
    await register(dispatch, email, password);
    navigation.replace('Home');  
  } catch (error) {
    Alert.alert('Registration Failed', 'An error occurred during registration');
  } finally {
    setIsLoading(false);
  }
};