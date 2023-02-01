import {_globalStyles} from '@screens/styles';
import {
  addComma,
  addCommaInNumberString,
  colors,
  formatPhoneNumber,
  height,
  width,
} from '@utils/index';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon_ArrowLeft from '@assets/icons/icon_arrow_left.svg';
import {HideKeyboard} from '@screens/common';
import LinearGradient from 'expo-linear-gradient';
import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import LottieView from 'lottie-react-native';

export const Send_3 = ({navigation, route}: {navigation: any; route: any}) => {
  const {personName, amountToSend, personPhoneNumber} = route.params;
  const [displayLottie_1, setDisplayLottie_1] = useState(true);

  useEffect(() => {
    if (displayLottie_1) {
      setTimeout(() => {
        setDisplayLottie_1(false);
      }, 4000);
    }
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${
          '[크립토스] ' +
          'ㅇㅇㅇ' +
          '님이 송금한 ' +
          addComma(amountToSend) +
          ' APT (' +
          addComma(amountToSend * 20000) +
          '원) 가 ' +
          formatPhoneNumber(personPhoneNumber) +
          ' 님의 크립토스 지갑에 입금되었습니다.'
        } \n\n${'아래 링크를 통해 지금 바로 크립토스를 시작해보세요!'} \n\n ${'https://cryptoss.xyz/'}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('activityType!');
        } else {
          console.log('Share!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={[_globalStyles.outerContainerStyle]}>
      {displayLottie_1 ? (
        <LottieView
          source={{
            uri: 'https://assets5.lottiefiles.com/packages/lf20_gf4wkujg.json',
          }}
          style={{
            position: 'absolute',
            width: 375 * width,
            height: 200 * height,
            top: 60 * height,
          }}
          autoPlay={true}
          loop={displayLottie_1}
        />
      ) : (
        <LottieView
          source={{
            uri: 'https://assets10.lottiefiles.com/packages/lf20_ysasslfv.json', //  'https://assets10.lottiefiles.com/packages/lf20_txJcSM.json',
          }}
          style={{
            position: 'absolute',
            width: 200 * width,
            height: 120 * height,
            top: 75 * height,
          }}
          autoPlay={true}
          loop={false}
        />
      )}
      <View style={{paddingBottom: 15 * height}}>
        <Text style={_styles.confirmText}>
          <Text style={{fontWeight: '700'}}>{personName}</Text>님에게{'\n'}
          <Text style={{fontWeight: '700'}}>{amountToSend} APT</Text>를{' '}
          {displayLottie_1 ? '보내고 있어요' : '보냈어요'}
        </Text>
        {displayLottie_1 && (
          <Text style={[_styles.subText, {marginTop: 15 * height}]}>
            잠시만 기다려주세요
          </Text>
        )}
      </View>
      {displayLottie_1 ? (
        <OneButtonFooter
          disabled
          containerStyle={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 35 * height,
            opacity: 0.5,
          }}
          onPress={() => {}}
          buttonText={'보내는 중 ...'}
        />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 35 * height,
            paddingHorizontal: 10 * height,
          }}>
          <View style={_styles.footerContainer}>
            <TouchableOpacity
              onPress={() => {
                onShare();
              }}
              style={[_styles.footerButtonStyle]}
              activeOpacity={1}>
              <Text style={[_styles.footerButtonTextStyle]}>{'공유하기'}</Text>
            </TouchableOpacity>
          </View>
          <OneButtonFooter
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            buttonText={'홈으로'}
            containerStyle={{width: '50%'}}
            buttonWidth={155 * width}
          />
        </View>
      )}
    </View>
  );
};

const _styles = StyleSheet.create({
  footerContainer: {
    width: '50%',
    paddingBottom: height * 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonStyle: {
    width: width * 155,
    height: height * 54,
    borderRadius: height * 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blurredBorderColor,
    flexDirection: 'row',
  },
  footerButtonTextStyle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16 * height,
    lineHeight: 25 * height,
    textAlign: 'center',
    color: '#333333',
  },
  confirmText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 24 * height,
    lineHeight: 40 * height,
    color: colors.gray_1,
    textAlign: 'center',
  },
  subText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14 * height,
    lineHeight: 24 * height,
    color: colors.gray_3,
    textAlign: 'center',
  },
});
function alert(message: any) {
  throw new Error('Function not implemented.');
}
