import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react-native';

import AppNavigator from './navigation/AppNavigator';
import { store } from './store';
import ErrorBoundary from './components/common/ErrorBoundary';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 10000,
});

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ErrorBoundary>
    </Provider>
  );
};

export default Sentry.wrap(App);