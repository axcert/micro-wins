export interface NotificationToken {
  id: string;
  user_id: string;
  token: string;
  platform: 'ios' | 'android';
  device_id: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  daily_reminder: boolean;
  reminder_time: string; // HH:mm format
  timezone: string;
  milestone_notifications: boolean;
  streak_notifications: boolean;
  goal_completion_notifications: boolean;
  sound_enabled: boolean;
  vibration_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationHistory {
  id: string;
  user_id: string;
  type: 'daily_reminder' | 'milestone' | 'streak' | 'goal_completion' | 'test';
  title: string;
  body: string;
  data?: Record<string, any>;
  status: 'sent' | 'delivered' | 'failed' | 'read';
  sent_at: string;
  delivered_at?: string;
  read_at?: string;
  error_message?: string;
}

export interface RegisterTokenRequest {
  token: string;
  platform: 'ios' | 'android';
  device_id: string;
}

export interface UpdatePreferencesRequest {
  daily_reminder?: boolean;
  reminder_time?: string;
  timezone?: string;
  milestone_notifications?: boolean;
  streak_notifications?: boolean;
  goal_completion_notifications?: boolean;
  sound_enabled?: boolean;
  vibration_enabled?: boolean;
}

export interface TestNotificationRequest {
  type?: 'daily_reminder' | 'milestone' | 'streak' | 'goal_completion';
  title?: string;
  body?: string;
  data?: Record<string, any>;
}

export interface NotificationHistoryFilter {
  type?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
  per_page?: number;
  page?: number;
}

export interface CachedNotificationData {
  data: any;
  timestamp: number;
  expiresAt: number;
}