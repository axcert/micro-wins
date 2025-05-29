import { Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';

export const handleError = (error, retry) => {
  Sentry.captureException(error);
  
  if (error.response) {
    // The request was made and the server responded with a status code outside 2xx range 
    console.error('API Error:', error.response.data);
    console.error('Status Code:', error.response.status);

    if (error.response.status === 401) {
      // Handle unauthorized error
    }

  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
    
    Alert.alert(
      'Network Error',
      'Unable to connect. Please check your internet connection and try again.',
      [{
        text: 'Retry',
        onPress: retry
      }]  
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error setting up request:', error.message);
  }
};