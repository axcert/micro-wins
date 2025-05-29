import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosRequestConfig } from 'axios';
import apiClient from './apiClient';
import * as Sentry from '@sentry/react-native';

const OFFLINE_QUEUE_KEY = 'offlineQueue';

export const queueRequest = async (request: AxiosRequestConfig): Promise<void> => {
  try {
    const existingQueue = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    const queue = existingQueue ? JSON.parse(existingQueue) : [];
    queue.push(request);
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const executeRequestQueue = async (): Promise<void> => {
  try {
    const existingQueue = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    const queue = existingQueue ? JSON.parse(existingQueue) : [];

    while (queue.length > 0) {
      const request = queue.shift();
      await apiClient(request);
    }
    
    await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);
  } catch (error) {
    Sentry.captureException(error);
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  }
};