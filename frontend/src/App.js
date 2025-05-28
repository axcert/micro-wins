import React from 'react';
import { Provider } from 'react-redux'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Sentry from 'sentry-expo';
import SplashScreen from './src/screens/SplashScreen';
import AuthStack from './src/navigation/AuthStack';
import HomeScreen from './src/screens/Home';
import store from './src/store/store';
import CreateGoal from './src/screens/CreateGoal';
import PreviewSteps from './src/screens/PreviewSteps';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ErrorBoundary from './src/components/ErrorBoundary';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  enableInExpoDevelopment: true,
  debug: true,
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateGoal" component={CreateGoal} />  
            <Stack.Screen name="PreviewSteps" component={PreviewSteps} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </Provider>
  );
};

export default Sentry.Native.wrap(App);