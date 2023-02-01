import {_globalStyles} from '@screens/styles';
import {colors, height, width} from '@utils/globalConfig';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const MyTransactionRecordsScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={_styles.outerContainerStyle}>
      <Text style={[_globalStyles.mainText, {lineHeight: 29 * height}]}>
        거래이력
      </Text>
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
  outerContainerStyle: {
    flex: 1,
    backgroundColor: colors.homeScreenBackgroundColor,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 60 * height,
    paddingHorizontal: 20 * width,
  },
});
