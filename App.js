import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { MainNav } from './src';
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

navigator.geolocation = require('@react-native-community/geolocation');
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <MainNav />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

