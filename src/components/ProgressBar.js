import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import tw from 'tailwind-react-native-classnames';

const ProgressBar = ({ progress }) => {
  return (
    <View style={tw`w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-4`}>
      <Animated.View style={[tw`h-full bg-blue-500 rounded-full`, progress]} />
    </View>
  );
};

export default ProgressBar;