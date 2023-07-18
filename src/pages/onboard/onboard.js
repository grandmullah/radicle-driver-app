
import React from 'react';

import { Button, Icon } from '@rneui/themed';
import Onboarding from 'react-native-onboarding-swiper';
import { VStack } from 'native-base';
import { generateMnemonic } from '../../app/features/cryptoSlice';
import { useDispatch,useSelector } from 'react-redux';
import Loading from '../Home/loading';

export const Onboard = ({navigation}) => {
  const dispatch = useDispatch()
  const {state} = useSelector(state => state.crypto)
    return(
        <VStack h={'100%'}>
                      {
                (state == 'loading') && <Loading/>
            }
        <Onboarding
    showDone={false}
    onSkip={async() => {
      dispatch(generateMnemonic())
      navigation.navigate('Registration')
    } }
    pages={[
      {
        title: 'Hey!',
        subtitle: 'Welcome to Radicle!',
        backgroundColor: '#03353C',
        image: (
          <Icon
            name="hand-peace-o"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Send Messages',
        subtitle: 'Home of curiosity and fas rides ',
        backgroundColor: '#03353C',
        image: (
          <Icon
            name="paper-plane-o"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Get Notified',
        subtitle: 'We will send you notification as soon as something happened',
        backgroundColor: '#03353C',
        image: (
          <Icon name="bell-o" type="font-awesome" size={100} color="white" />
        ),
      },
      {
        title: "That's Enough",
        subtitle: (
          <Button
            title={'Get Started'}
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={'white'}
            borderRadius={5}
            textStyle={{ color: '#003c8f' }}
            onPress={async () => {
              
              dispatch(generateMnemonic())
              navigation.navigate('Registration')
            }}
          />
        ),
        backgroundColor: '#449342',
        image: (
          <Icon name="rocket" type="font-awesome" size={100} color="white" />
        ),
      },
    ]}
  />
        </VStack>
    )}
