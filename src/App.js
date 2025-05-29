import React from 'react';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react-native';
import ErrorBoundary from './components/ErrorBoundary'; 
// ... existing imports

Sentry.init({
  dsn: 'your-sentry-dsn',
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 10000,
  tracesSampleRate: 0.5, // Adjust as needed
});

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              {/* ... routes */} 
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default Sentry.wrap(App);