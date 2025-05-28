import React from 'react';
import { Provider } from 'react-redux'; // Redux Provider
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



const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={HomeScreen} />
        <Stack.Screen name="CreateGoal" component={CreateGoal} />
        <Stack.Screen name="PreviewSteps" component={PreviewSteps} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
          
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;