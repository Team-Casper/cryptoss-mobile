import React from 'react';
import {RootNavigator} from './src/presentation/screens/RootNavigator';

import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {SWRConfig} from 'swr';
import axios from 'axios';
import Operator from 'swrapi/Operator';

function App(): JSX.Element {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url: string) => axios.get(url).then(res => res.data),
        }}>
        {/* <Operator /> */}
        <RootNavigator />
      </SWRConfig>
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
