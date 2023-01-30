import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Send_1} from './Send_1';
import {Send_2} from './Send_2';
import {Send_3} from './Send_3';

const Stack = createNativeStackNavigator();

export const SendNavigator = ({navigation}: {navigation: any}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Send_1">
      <Stack.Screen component={Send_1} name="Send_1" />
      <Stack.Screen component={Send_2} name="Send_2" />
      <Stack.Screen component={Send_3} name="Send_3" />
    </Stack.Navigator>
  );
};
