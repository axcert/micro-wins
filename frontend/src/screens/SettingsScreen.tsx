// Add this import  
import { logoutUser } from '../services/api/authService';

// Add logout button handler
const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to log out?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log Out',
        onPress: async () => {
          await logoutUser(dispatch);
        },  
      },
    ],
  );
};