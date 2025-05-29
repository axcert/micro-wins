import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store';
import { RootStack } from './navigation/RootStack';
import { ErrorBoundary } from './ErrorBoundary';

Sentry.init({ 
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0,
});

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    </ErrorBoundary>
  );
};

export default Sentry.wrap(App);