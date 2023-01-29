import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import {_globalStyles} from '@screens/styles';
import {colors, height, width} from '@utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Onboarding_5 = ({navigation}: {navigation: any}) => {
  return (
    <View style={[_globalStyles.outerContainerStyle]}>
      <Text
        style={[
          _globalStyles.confirmButtonText,
          {color: colors.blurredTextColor, marginBottom: 13 * height},
        ]}>
        로그인 완료!🎉
      </Text>
      <Text style={[_globalStyles.bigText]}>김블록님,{'\n'}환영합니다!</Text>

      <OneButtonFooter
        containerStyle={{
          marginTop: 40 * height,
          // opacity: isConsentToTermsOkay() ? 1 : 0.5,
        }}
        buttonWidth={260 * width}
        onPress={() => navigation.navigate('HomeScreen')}
        buttonText={'지금 바로 크립토스 시작하기 →'}
      />
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
