// Add this import
import { checkAuth } from './services/api/authService';

// Check authentication on app launch  
useEffect(() => {
  const bootstrapAsync = async () => {
    await checkAuth(dispatch);
  };

  bootstrapAsync();
}, []);