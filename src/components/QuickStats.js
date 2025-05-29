import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const QuickStats = ({ completed, remaining, daysLeft }) => {
  return (
    <View style={tw`flex-row justify-between`}>
      <View style={tw`items-center`}>
        <Text style={tw`text-2xl font-bold`}>{completed}</Text>
        <Text style={tw`text-gray-500`}>Completed</Text>
      </View>
      <View style={tw`items-center`}>
        <Text style={tw`text-2xl font-bold`}>{remaining}</Text>
        <Text style={tw`text-gray-500`}>Remaining</Text>
      </View>
      <View style={tw`items-center`}>
        <Text style={tw`text-2xl font-bold`}>{daysLeft}</Text>
        <Text style={tw`text-gray-500`}>Days Left</Text>
      </View>
    </View>
  );
};

export default QuickStats;