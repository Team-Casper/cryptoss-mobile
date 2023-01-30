import {_globalStyles} from '@screens/styles';
import {colors, height} from '@utils/globalConfig';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const MyAssetScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={_globalStyles.outerContainerStyle}>
      <Text>My Asset Screen</Text>
    </View>
  );
};

const _styles = StyleSheet.create({
  footerContainer: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12 * height,
    lineHeight: 16 * height,
    textAlign: 'center',
  },
});
