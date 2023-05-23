import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Icon } from '@rneui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from '../pages/Home/MapScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export const AppStack = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreens}
          options={{
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
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell" color={color} size={size} />
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
            <Stack.Screen  name='home' component={MapScreen}/>
        </Stack.Navigator>
    )
}

const AppScreens =() => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='app' component={MapScreen} />
        </Stack.Navigator>
    )
}

const NotifcationScreens =() => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="notifications"  component={MapScreen}/>
        </Stack.Navigator>
    )
}

