import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Icon } from '@rneui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from '../pages/Home/MapScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const AppStack = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          headerShown:false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreens}
          options={{
            headerShown:false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotifcationScreens}
          options={{
            headerShown:false,
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <Icon name="notifications" color={color} size={size} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={AppScreens}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="menu" color={color} size={size} />
            ),
          }}
        />
        </Tab.Navigator>
    );
}

const HomeScreens =() => {
    return (
        <Stack.Navigator>
            <Stack.Screen  name='home' component={MapScreen} options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }}/>
        </Stack.Navigator>
    )
}

const AppScreens =() => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='app' component={MapScreen}options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }} />
        </Stack.Navigator>
    )
}

const NotifcationScreens =() => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="notifications"  component={MapScreen}options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }}/>
        </Stack.Navigator>
    )
}

