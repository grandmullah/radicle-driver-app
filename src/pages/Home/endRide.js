import React, { useRef } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Dimensions ,Box} from 'react-native';
import { Icon } from '@rneui/base';
import { useToast } from 'native-base';
import { wsProvider } from '../onboard/registrationScreen';
import { useSelector,useDispatch } from 'react-redux';
import { ApiPromise } from '@polkadot/api';
import { updateState, updaterideState } from '../../app/features/rideSlice';
import { RatingScreen } from '../Notifcations/Feeback';

const { width } = Dimensions.get('window');

export const EndRide = () => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const toast = useToast()
  const toastIdRef = React.useRef()
  const {Pair}= useSelector(state => state.crypto)
  const dispatch = useDispatch()
  // Initialize PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: slideAnimation }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: async (_, gesture) => {
        if (gesture.dx > width / 2) {
          // Accepted
          Animated.timing(slideAnimation, {
            toValue: width,
            duration: 300,
            useNativeDriver: false,
          }).start();


          console.log('accepted')
          //make api call 
          await handleAccept()
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
  const handleComplete= async () => {

     dispatch(updateState('completing'))
    }



  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        <Icon name="arrow-back" size={24} color="white" style={styles.arrow} />
        <Icon name="arrow-forward" size={24} color="white" style={styles.arrow} />
      </View>
      <Animated.View style={[styles.slideContainer, slideStyles]} {...panResponder.panHandlers}>
        <Text onPress={handleComplete} style={styles.text}> END RIDE</Text>
      </Animated.View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  arrow: {
    marginHorizontal: 10,
  },
  slideContainer: {
    width: width - 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 128, 0)', // Fallback color if gradient is not supported
    background: 'linear-gradient(to bottom, #00ff00, #FF0000)', // Gradient green background
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
