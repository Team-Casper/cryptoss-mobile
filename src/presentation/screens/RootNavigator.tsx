import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OnboardingNavigator} from './authentication/onboarding';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

function SendNavigator() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Send Screen</Text>
    </View>
  );
}

// TO-DO : user state 에 따라 해당 user가 이미 한번 onboarding을 진행한 상태면 다시 앱에 진입했을때 곧바로 main 화면으로 보내주기
export const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="OnboardingNavigator">
          <Stack.Screen
            component={OnboardingNavigator}
            name="OnboardingNavigator"
          />
          <Stack.Screen component={HomeScreen} name="HomeScreen" />
          <Stack.Screen component={SendNavigator} name="SendNavigator" />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
