import {HideKeyboard} from '@screens/common';
import {_globalStyles} from '@screens/styles';
import {height, width, colors} from '@utils/index';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon_ArrowLeft from '@assets/icons/icon_arrow_left.svg';
import CountDown from 'react-native-countdown-component';
import {authenticatePhone} from 'api/auth';
import { LinearGradient } from 'expo-linear-gradient';

export const Onboarding_3 = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {phoneNumber} = route.params;
  const [certificationNumber, setCertificationNumber] = useState('');
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  //const [isCountDownDisplayed, setIsCountDownDisplayed] = useState(true);

  return (
    <HideKeyboard>
      <View
        style={[
          _globalStyles.outerContainerStyle,
          {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingTop: 83 * height,
            paddingHorizontal: 20 * height,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={{
            marginLeft: -10 * height,
            marginBottom: 20 * height,
            width: 50 * height,
            height: 50 * height,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Icon_ArrowLeft width={32 * height} height={32 * height} />
        </TouchableOpacity>
        <Text
          style={[
            _globalStyles.mainText,
            {textAlign: 'left', marginBottom: 30 * height},
          ]}>
          {phoneNumber.slice(0, 3) +
            '-' +
            phoneNumber.slice(3, 7) +
            '-' +
            phoneNumber.slice(7)}
          으로{'\n'}인증번호를 보냈어요
        </Text>
        <Text style={_globalStyles.mainText}>인증번호를 입력해주세요</Text>
        <View style={{marginTop: 10 * height}}>
          <TextInput
            style={[
              _globalStyles.textInputStyle,
              {
                borderColor: isTextInputFocused
                  ? colors.consentColor // focusedBorderColor
                  : colors.blurredBorderColor,
              },
            ]}
            onFocus={() => setIsTextInputFocused(true)}
            onBlur={() => setIsTextInputFocused(false)}
            onChangeText={setCertificationNumber}
            value={certificationNumber}
            keyboardType={'phone-pad'}
            placeholder={'6자리 숫자'}
            placeholderTextColor={colors.blurredTextColor}
            maxLength={6}
            textContentType={'oneTimeCode'}
          />
          {/*isCountDownDisplayed && (
            <CountDown
              size={36}
              until={18}
              onFinish={() => {
                //setIsCountDownDisplayed(false);
              }}
              timeToShow={['M', 'S']}
              digitStyle={{
                backgroundColor: 'transparent',
                height: 20 * height,
                width: 15 * width,
              }}
              showSeparator={true}
              timeLabels={{}}
              separatorStyle={_styles.timerTextStyle}
              digitTxtStyle={_styles.timerTextStyle}
              style={{display: isCountDownDisplayed ? 'flex' : 'none'}}
            />
            )*/}

          <View
            style={{
              marginTop: 45 * height,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{flexDirection: 'column'}}>
              <Text
                style={{
                  //textDecorationLine: 'underline',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: 14 * height,
                  lineHeight: 14 * height,
                  textAlign: 'center',
                  color: colors.blurredTextColor,
                }}>
                인증번호가 안와요
              </Text>
              <View
                style={{
                  height: 1.1 * height,
                  marginTop: 0 * height,
                  width: '100%',
                  backgroundColor: colors.blurredTextColor,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView
          style={{position: 'absolute', bottom: 57 * height}}
          behavior={'padding'}>
          <TouchableOpacity
            onPress={async () => {
              const pass = await authenticatePhone(
                phoneNumber,
                certificationNumber,
              );
              if (pass) navigation.navigate('Onboarding_4');
            }}
            style={{opacity: certificationNumber.length == 6 ? 1 : 0.5}}>
            <LinearGradient
              style={{
                width: 375 * width,
                height: 54 * height,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              colors={['#4CB6C4', '#2ED8A7']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              >
              <Text style={_globalStyles.confirmButtonText}>확인</Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </HideKeyboard>
  );
};

const _styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 30,
    backgroundColor: 'orange',
  },
  timerTextStyle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12 * height,
    lineHeight: 20 * height,
    color: colors.blurredTextColor,
  },
});
