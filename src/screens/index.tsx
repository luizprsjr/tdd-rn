import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './HomeScreen';
import {WeatherScreen} from './WeatherScreen';

export type RootStackParamList = {
  Home: undefined;
  Weather: {
    latitude: number;
    longitude: number;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Weather" component={WeatherScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
