import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import {_globalStyles} from '@screens/styles';
import {colors, height, width} from '@utils/index';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {storeData} from '@utils/AsyncStorage';

export const Onboarding_5 = ({navigation}: {navigation: any}) => {
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [displayLottie, setDisplayLottie] = useState(true);

  useEffect(() => {
    if (displayLottie && !nextButtonVisible) {
      setTimeout(() => {
        setDisplayLottie(false);
        setNextButtonVisible(true);
      }, 4000);
    }
  }, []);

  return (
    <View style={[_globalStyles.outerContainerStyle]}>
      {displayLottie && (
        <LottieView
          source={{
            uri: 'https://assets4.lottiefiles.com/packages/lf20_lovdaj01.json',
          }}
          style={{
            position: 'absolute',
            top: 15 * height,
            backgroundColor: 'transparent',
          }}
          autoPlay={true}
          loop={false}
        />
      )}

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
          opacity: nextButtonVisible ? 1 : 0.3,
        }}
        buttonWidth={260 * width}
        onPress={async () => {
          await storeData('onboarding', 'true');
          navigation.navigate('HomeScreen');
        }}
        buttonText={'지금 바로 크립토스 시작하기 →'}
      />
    </View>
  );
};

const _styles = StyleSheet.create({});
