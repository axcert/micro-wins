// ... existing imports
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/authSlice';

const SettingsScreen = () => {
  // ... existing code
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    // ... existing JSX
    // Add logout button
    <Button title="Logout" onPress={handleLogout} />
  );
};

export default SettingsScreen;