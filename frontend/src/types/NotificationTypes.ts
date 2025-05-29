export interface NotificationPreferences {
  notificationTime: string;
  notificationDays: number[];
  notificationGoals: string[];
}

export interface NotificationHistory {
  id: string;
  title: string;
  body: string;
  sentAt: string;
  deliveryStatus: 'sent' | 'delivered' | 'failed';
}