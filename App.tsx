import React from 'react';
import {RootNavigator} from './src/presentation/screens/RootNavigator';

import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {SWRConfig} from 'swr';
import axios from 'axios';
import {RecoilRoot} from 'recoil';
import { StatusBar } from 'expo-status-bar';

function App(): JSX.Element {
  return (
    <>
      <RecoilRoot>
        <SWRConfig
          value={{
            fetcher: (url: string) => axios.get(url).then(res => res.data),
          }}>
          {/* <Operator /> */}
          <RootNavigator />
          <StatusBar style="auto" />
        </SWRConfig>
      </RecoilRoot>
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
