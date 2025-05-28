import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';


const SuccessAnimation = ({ visible }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (visible) {
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={successAnimation}
        autoPlay={false}
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default SuccessAnimation;