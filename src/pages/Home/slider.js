import React, { useRef } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const AcceptScreen = () => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  // Initialize PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: slideAnimation }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > width / 2) {
          // Accepted
          Animated.timing(slideAnimation, {
            toValue: width,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          // Not accepted
          Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const slideStyles = {
    transform: [{ translateX: slideAnimation }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slideContainer, slideStyles]} {...panResponder.panHandlers}>
        <Text style={styles.text}>Slide to Accept</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0, 128, 0)', // Fallback color if gradient is not supported
    background: 'linear-gradient(to bottom, #00ff00, #008000)', // Gradient green background
  },
  slideContainer: {
    width: width - 50,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

