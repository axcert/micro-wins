import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { RootStackParamList } from '@/navigation/MainStackNavigator';

type Props = StackScreenProps<RootStackParamList, 'Success'>;

export default function SuccessScreen({ route, navigation }: Props) {
  const { goalId } = route.params;

  useEffect(() => {
    // Auto navigate to home after 2 seconds
    const timeout = setTimeout(() => {
      navigation.popToTop();
      navigation.navigate('Home');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop={false}
        source={require('@/assets/animations/success.json')}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});