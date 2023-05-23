import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { MainNav } from './src';

export default function App() {
  return (
    <NativeBaseProvider>
      <MainNav />
    </NativeBaseProvider>
  );
}

