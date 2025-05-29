import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const TodaysMission = ({ task }) => {
  return (
    <View style={tw`bg-white shadow-md rounded-lg p-4 mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Today's Mission</Text>
      {task ? (
        <>
          <Text style={tw`text-gray-800`}>{task.title}</Text>
          <Text style={tw`text-gray-600 mt-2`}>{task.description}</Text>
        </>
      ) : (
        <Text style={tw`text-gray-500`}>Loading task...</Text>  
      )}
    </View>
  );
};

export default TodaysMission;