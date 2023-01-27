import React from 'react';
import {RootNavigator} from './src/presentation/screens/RootNavigator';

import {SafeAreaView, ScrollView, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <>
      <RootNavigator />
    </>
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
