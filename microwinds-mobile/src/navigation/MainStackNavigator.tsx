// ...existing imports
import TaskScreen from '@/screens/goals/TaskScreen';
import SuccessScreen from '@/screens/goals/SuccessScreen';

// Add to RootStackParamList
export type RootStackParamList = {
  // ...
  Task: { goalId: string; stepId: string };
  Success: { goalId: string };
}

const MainStack = createNativeStackNavigator<RootStackParamList>();

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      {/* ...other screens */}
      
      <MainStack.Screen 
        name="Task"
        component={TaskScreen}
        options={{ title: "Today's Task" }}
      />

      <MainStack.Screen 
        name="Success"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}