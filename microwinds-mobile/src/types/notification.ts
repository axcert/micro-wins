export interface NotificationSettings {
  enabled: boolean;
  dailyReminderTime: string; // HH:mm format
  timezone: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  streakReminders: boolean;
  goalCompletionAlerts: boolean;
  weeklyProgressSummary: boolean;
}

export interface NotificationPreferences {
  userId: string;
  settings: NotificationSettings;
  lastUpdated: string;
  deviceToken?: string;
  platform: 'ios' | 'android';
}

export interface NotificationPermissionStatus {
  granted: boolean;
  provisional?: boolean; // iOS only
  alert?: boolean;
  badge?: boolean;
  sound?: boolean;
}

export interface TestNotificationResponse {
  success: boolean;
  message: string;
  timestamp: string;
}