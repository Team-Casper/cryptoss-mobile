import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Onboarding_1 = ({navigation}: {navigation: any}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Onboarding 1</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Onboarding_2')}
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
