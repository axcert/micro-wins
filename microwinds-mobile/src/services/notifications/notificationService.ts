import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import { 
  NotificationSettings, 
  NotificationPreferences, 
  NotificationPermissionStatus,
  TestNotificationResponse 
} from '@/types/notification';

const NOTIFICATION_SETTINGS_KEY = '@microwinds/notification_settings';
const NOTIFICATION_CHANNEL_ID = 'microwinds-daily-reminder';

class NotificationService {
  private static instance: NotificationService;
  private isInitialized: boolean = false;

  private constructor() {
    this.initializeNotifications();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async initializeNotifications(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Configure push notifications
      PushNotification.configure({
        onRegister: (token) => {
          console.log('[NotificationService] Device token:', token.token);
        },
        onNotification: (notification) => {
          console.log('[NotificationService] Notification received:', notification);
          
          if (Platform.OS === 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
      });

      // Create notification channel for Android
      if (Platform.OS === 'android') {
        PushNotification.createChannel(
          {
            channelId: NOTIFICATION_CHANNEL_ID,
            channelName: 'Daily Reminders',
            channelDescription: 'Daily goal reminder notifications',
            playSound: true,
            soundName: 'default',
            importance: Importance.HIGH,
            vibrate: true,
          },
          (created) => console.log(`[NotificationService] Channel created: ${created}`)
        );
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('[NotificationService] Failed to initialize:', error);
    }
  }

  public async requestPermissions(): Promise<NotificationPermissionStatus> {
    try {
      if (Platform.OS === 'ios') {
        const permissions = await PushNotificationIOS.requestPermissions({
          alert: true,
          badge: true,
          sound: true,
        });
        
        return {
          granted: !!permissions.alert || !!permissions.badge || !!permissions.sound,
          alert: permissions.alert,
          badge: permissions.badge,
          sound: permissions.sound,
        };
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        
        return {
          granted: granted === PermissionsAndroid.RESULTS.GRANTED,
        };
      }
    } catch (error) {
      console.error('[NotificationService] Failed to request permissions:', error);
      return { granted: false };
    }
  }

  public async checkPermissions(): Promise<NotificationPermissionStatus> {
    try {
      if (Platform.OS === 'ios') {
        return new Promise((resolve) => {
          PushNotificationIOS.checkPermissions((permissions) => {
            resolve({
              granted: !!permissions.alert || !!permissions.badge || !!permissions.sound,
              alert: permissions.alert,
              badge: permissions.badge,
              sound: permissions.sound,
            });
          });
        });
      } else {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        
        return { granted };
      }
    } catch (error) {
      console.error('[NotificationService] Failed to check permissions:', error);
      return { granted: false };
    }
  }

  public async saveSettings(settings: NotificationSettings): Promise<void> {
    try {
      const preferences: NotificationPreferences = {
        userId: 'current_user', // This should come from auth state
        settings,
        lastUpdated: new Date().toISOString(),
        platform: Platform.OS as 'ios' | 'android',
      };

      await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(preferences));
      
      // Schedule or cancel notifications based on settings
      if (settings.enabled) {
        await this.scheduleDailyReminder(settings.dailyReminderTime);
      } else {
        await this.cancelAllNotifications();
      }
    } catch (error) {
      console.error('[NotificationService] Failed to save settings:', error);
      throw error;
    }
  }

  public async loadSettings(): Promise<NotificationSettings | null> {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
      if (stored) {
        const preferences: NotificationPreferences = JSON.parse(stored);
        return preferences.settings;
      }
      return null;
    } catch (error) {
      console.error('[NotificationService] Failed to load settings:', error);
      return null;
    }
  }

  public async getDefaultSettings(): Promise<NotificationSettings> {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return {
      enabled: false,
      dailyReminderTime: '09:00',
      timezone,
      soundEnabled: true,
      vibrationEnabled: true,
      streakReminders: true,
      goalCompletionAlerts: true,
      weeklyProgressSummary: true,
    };
  }

  private async scheduleDailyReminder(time: string): Promise<void> {
    try {
      // Cancel existing daily reminders
      await this.cancelDailyReminders();

      const [hours, minutes] = time.split(':').map(Number);
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hours, minutes, 0, 0);

      // If the time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      PushNotification.localNotificationSchedule({
        channelId: NOTIFICATION_CHANNEL_ID,
        title: "Time for your daily 1% progress! 🎯",
        message: "Complete today's micro-step and keep your streak alive!",
        date: scheduledTime,
        repeatType: 'day',
        allowWhileIdle: true,
        id: 1, // Fixed ID for daily reminder
        userInfo: { type: 'daily_reminder' },
      });

      console.log('[NotificationService] Daily reminder scheduled for:', scheduledTime);
    } catch (error) {
      console.error('[NotificationService] Failed to schedule daily reminder:', error);
      throw error;
    }
  }

  private async cancelDailyReminders(): Promise<void> {
    try {
      // Cancel the daily reminder notification
      PushNotification.cancelLocalNotification('1');
    } catch (error) {
      console.error('[NotificationService] Failed to cancel daily reminders:', error);
    }
  }

  public async cancelAllNotifications(): Promise<void> {
    try {
      PushNotification.cancelAllLocalNotifications();
      console.log('[NotificationService] All notifications cancelled');
    } catch (error) {
      console.error('[NotificationService] Failed to cancel all notifications:', error);
    }
  }

  public async sendTestNotification(): Promise<TestNotificationResponse> {
    try {
      const permissions = await this.checkPermissions();
      
      if (!permissions.granted) {
        return {
          success: false,
          message: 'Notification permissions not granted',
          timestamp: new Date().toISOString(),
        };
      }

      PushNotification.localNotification({
        channelId: NOTIFICATION_CHANNEL_ID,
        title: "Test Notification 🔔",
        message: "Great! Your notifications are working perfectly.",
        playSound: true,
        soundName: 'default',
        vibrate: true,
        userInfo: { type: 'test' },
      });

      return {
        success: true,
        message: 'Test notification sent successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('[NotificationService] Failed to send test notification:', error);
      return {
        success: false,
        message: 'Failed to send test notification',
        timestamp: new Date().toISOString(),
      };
    }
  }

  public async updateNotificationTime(time: string): Promise<void> {
    try {
      const settings = await this.loadSettings();
      if (settings && settings.enabled) {
        await this.scheduleDailyReminder(time);
      }
    } catch (error) {
      console.error('[NotificationService] Failed to update notification time:', error);
      throw error;
    }
  }
}

export default NotificationService.getInstance();