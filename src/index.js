import React from 'react';
import {View, StyleSheet} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, NavStack } from './navigation';
import { Provider, useDispatch } from 'react-redux';
import { store } from './app/store';
import messaging from '@react-native-firebase/messaging';
import notifee  from '@notifee/react-native';
import { acceptRide } from './app/features/rideSlice';



messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    await notifee.requestPermission()
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    const d = JSON.parse(remoteMessage.data.data)
      if(d.type === 'requests'){
        await notifee.displayNotification({
            title: 'Ride Request',
            body: 'is requesting a Ride ',
            data:remoteMessage.data,
            android: {
                channelId: channelId,
                actions: [
                {
                    title: 'Accept',
                    icon: 'https://my-cdn.com/icons/snooze.png',
                    pressAction: {
                    id: 'accept',
                    launchActivity: 'default',
                    },
                },
                {
                    title: 'Reject',
                    icon: 'https://my-cdn.com/icons/snooze.png',
                    pressAction: {
                    id: 'reject',
                    
                    },
                },
                ],
            },
          });
      }


  
})




export const MainNav = () => {

    return (
        // add provirer store
        <SafeAreaProvider>
            <Provider store = {store}>
                <NavigationContainer>
                    <NavStack/>
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({})
