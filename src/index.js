import React from 'react';
import {View, StyleSheet} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './navigation';

export const MainNav = () => {
    return (
        // add provirer store
        <SafeAreaProvider>
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({})
