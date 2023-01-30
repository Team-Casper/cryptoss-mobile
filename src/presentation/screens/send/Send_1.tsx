import {_globalStyles} from '@screens/styles';
import {
  addComma,
  addCommaInNumberString,
  colors,
  formatPhoneNumber,
  height,
  width,
} from '@utils/index';
import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon_ArrowLeft from '@assets/icons/icon_arrow_left.svg';
import {HideKeyboard} from '@screens/common';
import LinearGradient from 'react-native-linear-gradient';
import {OneButtonFooter} from '@components/buttons/OneButtonFooter';

export const Send_1 = ({navigation, route}: {navigation: any; route: any}) => {
  const {personName, personPhoneNumber} = route.params;
  const [phase, setPhase] = useState(0);
  const [amountToSend, setAmountToSend] = useState<string>(''); // parseFloat(text)

  const goBack = () => {
    switch (phase) {
      case 0: {
        navigation.goBack();
      }
      case 1: {
        setPhase(0);
      }
    }
  };

  return (
    <HideKeyboard>
      <View
        style={[
          _globalStyles.outerContainerStyle,
          _styles.localContainerStyle,
        ]}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={_styles.backButtonContainer}>
          <Icon_ArrowLeft width={32 * height} height={32 * height} />
        </TouchableOpacity>
        <Text style={_styles.mainText}>
          내 앱토스 코인<Text style={{fontWeight: '500'}}>을</Text>
        </Text>
        <Text style={_styles.subText}>전송 가능 코인 {1}개</Text>
        <Text style={[_styles.mainText, {marginTop: 17 * height}]}>
          {personName}
          <Text style={{fontWeight: '500'}}>님에게</Text>
        </Text>
        <Text style={_styles.subText}>
          {formatPhoneNumber(personPhoneNumber)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30 * height,
          }}>
          {phase === 0 && (
            <>
              <TextInput
                style={_styles.amountTextInputStyle}
                onChangeText={setAmountToSend}
                value={amountToSend?.toString()}
                placeholder={'얼마나 보낼까요?'}
                placeholderTextColor={colors.gray_3}
                keyboardType={'numeric'}
              />
              {amountToSend && (
                <Text
                  style={{
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: 35 * height,
                  }}>
                  개
                </Text>
              )}
            </>
          )}
          {phase === 1 && (
            <Text style={_styles.confirmText}>
              <Text style={{fontWeight: '700'}}>
                {addCommaInNumberString(amountToSend)}개
              </Text>{' '}
              보낼까요?
            </Text>
          )}
        </View>
        <Text style={[_styles.subText]}>
          {amountToSend
            ? addComma(parseFloat(amountToSend) * 20000) + '원'
            : ''}
        </Text>
        {phase === 0 && (
          <KeyboardAvoidingView
            style={{position: 'absolute', bottom: 57 * height}}
            behavior={'padding'}>
            <TouchableOpacity
              disabled={amountToSend.length === 0}
              onPress={() => {
                Keyboard.dismiss();
                setPhase(1);
              }}
              style={{opacity: amountToSend ? 1 : 0.5}}>
              <LinearGradient
                style={_styles.footerButtonStyle}
                colors={['#4CB6C4', '#2ED8A7']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <Text style={_globalStyles.confirmButtonText}>
                  {amountToSend
                    ? '보내기'
                    : '상대에게 보낼 금액을 입력해 주세요'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
        {phase === 1 && (
          <OneButtonFooter
            containerStyle={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 35 * height,
            }}
            onPress={() => {
              navigation.navigate('Send_2', {
                personName: personName,
                amountToSend: amountToSend,
              });
            }}
            buttonText={'확인'}
          />
        )}
      </View>
    </HideKeyboard>
  );
};

const _styles = StyleSheet.create({
  localContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 120 * height,
    paddingHorizontal: 20 * height,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50 * height,
    left: 10 * height,
    width: 50 * height,
    height: 50 * height,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footerButtonStyle: {
    width: 375 * width,
    height: 54 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24 * height,
    color: colors.gray_1,
  },
  subText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14 * height,
    lineHeight: 24 * height,
    color: colors.gray_3,
  },
  howMuchText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30 * height,
    lineHeight: 40 * height,
    color: colors.gray_6,
  },
  amountTextInputStyle: {
    width: 284 * width,
    height: 70 * height,
    backgroundColor: colors.gray_6,
    borderBottomWidth: 2 * height,
    borderBottomColor: colors.gray_3,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 35 * height,
    paddingHorizontal: 10 * height,
    marginRight: 10 * height,
  },
  confirmText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 30 * height,
    lineHeight: 35 * height,
    color: colors.gray_1,
  },
});
