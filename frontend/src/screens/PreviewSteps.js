import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem, Button } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';

export default function PreviewSteps({ route }) {
  const { goal, steps } = route.params;
  const { navigate } = useNavigation();

  const startGoal = () => {
    // Save goal and steps to backend
    navigate('GoalList');
  }
  
  return (
    <View>
      <Text h3>{goal}</Text>
      <FlatList
        data={steps}
        renderItem={({item, index}) => (
          <ListItem>
            <ListItem.Title>{index + 1}. {item.title}</ListItem.Title>
          </ListItem>  
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Start Goal" onPress={startGoal} />
    </View>
  );
}