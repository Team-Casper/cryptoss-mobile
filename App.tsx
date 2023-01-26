import React from 'react';
import {RootNavigator} from './src/presentation/screens/RootNavigator';

import {SafeAreaView, ScrollView, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <RootNavigator />
    </SafeAreaView>
  );

  /*
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <RootNavigator />
      </ScrollView>
    </SafeAreaView>
  );
  */
}

export default App;
