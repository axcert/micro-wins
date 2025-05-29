import { NavigationProp } from '@react-navigation/native';
import { RemoteMessage } from '@react-native-firebase/messaging';
import { store } from '../../store';
import { incrementStreak } from '../../store/slices/goalsSlice';

type NotificationData = {
  type: 'task_completed' | 'goal_milestone' | 'general';
  goal_id?: string;
  micro_step_id?: string;
};

export const handleNotificationTapped = async (
  remoteMessage: RemoteMessage,
  navigation?: NavigationProp<any>
) => {
  if (remoteMessage) {
    const data = remoteMessage.data as NotificationData;
    console.log('Notification tapped:', data);

    switch (data.type) {
      case 'task_completed':
        // TODO: Navigate to goal details screen
        store.dispatch(incrementStreak(data.goal_id));
        break;
      case 'goal_milestone':
        // TODO: Navigate to achievement details screen  
        break;
      default:
        // TODO: Navigate to general notification screen
        break;
    }
  }
};