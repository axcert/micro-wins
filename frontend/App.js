import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import AuthStack from './src/navigation/AuthStack';
import HomeScreen from './src/screens/Home';
import store from './src/store/store';
import CreateGoal from './src/screens/CreateGoal';
import PreviewSteps from './src/screens/PreviewSteps';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { registerForPushNotificationsAsync } from './src/utils/notifications';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Navigation setup... */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;