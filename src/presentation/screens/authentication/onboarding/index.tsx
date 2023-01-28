import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Onboarding_1} from './Onboarding_1';
import {Onboarding_2} from './Onboarding_2';
import {Onboarding_3} from './Onboarding_3';
import {Onboarding_4} from './Onboarding_4';
import {Onboarding_5} from './Onboarding_5';

const Stack = createNativeStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Onboarding_1">
      <Stack.Screen component={Onboarding_1} name="Onboarding_1" />
      <Stack.Screen component={Onboarding_2} name="Onboarding_2" />
      <Stack.Screen component={Onboarding_3} name="Onboarding_3" />
      <Stack.Screen component={Onboarding_4} name="Onboarding_4" />
      <Stack.Screen component={Onboarding_5} name="Onboarding_5" />
    </Stack.Navigator>
  );
};
