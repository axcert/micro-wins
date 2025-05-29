// ... existing imports ...
import { requestNotificationPermission } from './services/notifications/notificationService';

const App = () => {
  // ... existing code ...

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // ... remaining code ...
};

export default App;