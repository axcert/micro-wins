import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const StreakCounter = ({ streak }) => {
  return (
    <View style={tw`flex-row items-center mb-4`}>
      <Text style={tw`text-lg font-bold`}>Streak:</Text>
      <Text style={tw`text-lg font-bold text-blue-500 ml-2`}>{streak} days</Text>
    </View>
  );
};

export default StreakCounter;