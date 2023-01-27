import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Onboarding_2 = ({navigation}: {navigation: any}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Onboarding 2</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Onboarding_3')}
        style={_styles.button}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const _styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 30,
    backgroundColor: 'orange',
  },
});
