import React from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createGoal } from '../redux/goalSlice';
import tw from 'tailwind-react-native-classnames';

const GoalPreviewScreen = () => {
  const dispatch = useDispatch();
  const { currentGoal, steps } = useSelector((state) => state.goal);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(createGoal(currentGoal));
    } catch (error) {
      console.log('Error refreshing steps:', error);
    }
    setRefreshing(false);
  }, []);

  const renderStep = ({ item, index }) => (
    <View style={tw`p-4 border-b border-gray-200`}>
      <Text>
        <Text style={tw`font-bold`}>{index + 1}. </Text>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={tw`flex-1`}>
      <Text style={tw`text-2xl font-bold p-4 bg-gray-100`}>{currentGoal.text}</Text>
      <FlatList
        data={steps}
        renderItem={renderStep}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity 
        style={tw`bg-blue-500 p-4`}
        onPress={() => console.log('Confirm goal')}
      >
        <Text style={tw`text-white text-center text-lg`}>Start Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoalPreviewScreen;