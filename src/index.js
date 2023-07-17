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
