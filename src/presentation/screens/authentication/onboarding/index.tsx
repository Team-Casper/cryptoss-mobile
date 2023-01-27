import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Onboarding_1} from './Onboarding_1';
import {Onboarding_2} from './Onboarding_2';
import {Onboarding_3} from './Onboarding_3';

const Stack = createNativeStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Onboarding_1">
      <Stack.Screen component={Onboarding_1} name="Onboarding_1" />
      <Stack.Screen component={Onboarding_2} name="Onboarding_2" />
      <Stack.Screen component={Onboarding_3} name="Onboarding_3" />
    </Stack.Navigator>
  );
};
