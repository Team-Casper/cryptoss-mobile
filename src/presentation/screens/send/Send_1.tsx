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
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon_ArrowLeft from '@assets/icons/icon_arrow_left.svg';
import Icon_Safe from '@assets/icons/icon_safe.svg';
import {HideKeyboard} from '@screens/common';
import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import { LinearGradient } from 'expo-linear-gradient';

export const Send_1 = ({navigation, route}: {navigation: any; route: any}) => {
  const {personName, personPhoneNumber} = route.params;
  const [phase, setPhase] = useState(0);
  const [amountToSend, setAmountToSend] = useState<string>(''); // parseFloat(text)
  const [showModal, setShowModal] = useState(false);

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

  const ConfirmModal = () => {
    return (
      <View style={_styles.modalDimBackground}>
        <View style={_styles.modalContentContainer}>
          <Icon_Safe
            width={61 * height}
            height={75 * height}
            style={{marginTop: 8 * height}}
          />
          <Text
            style={[
              {
                fontWeight: '500',
                fontSize: 18 * height,
                lineHeight: 24 * height,
                textAlign: 'center',
                color: colors.gray_1,
              },
              {marginTop: 14 * height, marginBottom: 4 * height},
            ]}>
            {formatPhoneNumber(personPhoneNumber)} 님에 대한
          </Text>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 28 * height,
              textAlign: 'center',
              color: colors.gray_1,
              marginBottom: 5 * height,
              marginTop: 3 * height,
            }}>
            신고내역 0건
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 14 * height,
              lineHeight: 24 * height,
              textAlign: 'center',
              color: colors.gray_3,
            }}>
            참고용이며 거래의 안전을 보장하지 않아요.
          </Text>
          <OneButtonFooter
            onPress={() => {
              setShowModal(false);
              navigation.navigate('Send_2', {
                personName: personName,
                personPhoneNumber: personPhoneNumber,
                amountToSend: amountToSend,
              });
            }}
            buttonText={'확인'}
            buttonWidth={288 * width}
            containerStyle={{bottom: 25 * height, position: 'absolute'}}
          />
        </View>
      </View>
    );
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
              setShowModal(true);
            }}
            buttonText={'확인'}
          />
        )}
        <Modal transparent={true} visible={showModal}>
          {ConfirmModal()}
        </Modal>
      </View>
    </HideKeyboard>
  );
};

const _styles = StyleSheet.create({
  modalDimBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    //paddingBottom: 20 * height,
    alignItems: 'center',
  },
  modalContentContainer: {
    width: 375 * width,
    height: 330 * height,
    backgroundColor: 'white',
    borderRadius: 16 * height,
    paddingTop: 20 * height,
    paddingBottom: 30 * height,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
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
