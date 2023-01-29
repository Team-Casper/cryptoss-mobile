import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {_globalStyles} from '@screens/styles';
import {height, width, colors} from '@utils/index';
import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import {BottomSheet, HideKeyboard} from '@screens/common';
import Icon_Close from '@assets/icons/icon_close.svg';
import Icon_Check from '@assets/icons/icon_check.svg';
import Icon_View_More from '@assets/icons/icon_view_more.svg';

export const Onboarding_2 = ({navigation}: {navigation: any}) => {
  const [nickName, setNickName] = useState('');
  const [mobileCarrier, setMobileCarrier] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusedInputIdx, setFocusedInputIdx] = useState(-1); // -1은, 아무데도 focus 되지 않은 상태
  const [showMobileCarrierOptionModal, setShowMobileCarrierOptionModal] =
    useState(false);
  const [chosenMobileCarrierIdx, setChosenMobileCarrierIdx] = useState(0);
  const [showConsentToTermsModal, setShowConsentToTermsModal] = useState(false);
  const [consentToTerms_1, setConsentToTerms_1] = useState(false);
  const [consentToTerms_2, setConsentToTerms_2] = useState(false);
  const [consentToTerms_3, setConsentToTerms_3] = useState(false);

  const isUserInfoFilledIn = () => {
    return (
      nickName.length > 0 &&
      mobileCarrier.length > 0 &&
      phoneNumber.length >= 10
    );
  };

  const isConsentToTermsOkay = () => {
    return consentToTerms_1 && consentToTerms_2;
  };

  const setConsentToTerms = (idx: number) => {
    switch (idx) {
      case 0:
        setConsentToTerms_1(!consentToTerms_1);
        return;
      case 1:
        setConsentToTerms_2(!consentToTerms_2);
        return;
      case 2:
        setConsentToTerms_3(!consentToTerms_3);
        return;
    }
  };

  const consentToTerms = (idx: number) => {
    switch (idx) {
      case 0:
        return consentToTerms_1;
      case 1:
        return consentToTerms_2;
      case 2:
        return consentToTerms_3;
    }
  };

  const setConsentToAllTerms = (bool: boolean) => {
    setConsentToTerms_1(bool);
    setConsentToTerms_2(bool);
    setConsentToTerms_3(bool);
  };

  const isConsentToAllTerms = () => {
    return consentToTerms_1 && consentToTerms_2 && consentToTerms_3;
  };

  const mobileCarrierList = [
    'SKT',
    'KT',
    'LG U +',
    'SKT 알뜰폰',
    'KT 알뜰폰',
    'LG U+ 알뜰폰',
  ];

  const chooseMobileCarrierOption = (idx: number) => {
    setChosenMobileCarrierIdx(idx);
    setMobileCarrier(mobileCarrierList[idx]);
  };

  const MobileCarrierOptionModalContent = () => {
    return (
      <View style={_styles.modalContainerStyle}>
        <TouchableOpacity
          onPress={() => setShowMobileCarrierOptionModal(false)}
          style={_styles.modalCloseIconStyle}>
          <Icon_Close
            width={30 * height}
            height={30 * height}
            fillOpacity={0.2}
          />
        </TouchableOpacity>
        <Text style={_styles.modalTitleText}>통신사 선택</Text>
        {mobileCarrierList.map((val: string, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              chooseMobileCarrierOption(idx);
              setShowMobileCarrierOptionModal(false);
            }}
            style={[
              _styles.optionElementContainer,
              {
                backgroundColor:
                  chosenMobileCarrierIdx === idx
                    ? colors.chosenOptionBackgroundColor
                    : 'white',
              },
            ]}>
            <Text
              style={[
                _styles.optionElementText,
                {
                  color:
                    chosenMobileCarrierIdx === idx
                      ? 'black'
                      : colors.blurredTextColor,
                },
              ]}>
              {val}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const ConsentToTermsModalContent = () => {
    return (
      <View
        style={[
          _styles.modalContainerStyle,
          {height: 410 * height, paddingHorizontal: 20 * width},
        ]}>
        <TouchableOpacity
          onPress={() => setShowConsentToTermsModal(false)}
          style={_styles.modalCloseIconStyle}>
          <Icon_Close
            width={30 * height}
            height={30 * height}
            fillOpacity={0.2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setConsentToAllTerms(!isConsentToAllTerms())}
          style={{
            width: 335 * width,
            height: 55 * height,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderWidth: 1 * height,
            paddingHorizontal: 20 * width,
            borderColor: isConsentToAllTerms()
              ? colors.consentColor
              : colors.blurredBorderColor,
            marginBottom: 20 * height,
            marginTop: 5 * height,
          }}
          activeOpacity={1}>
          <Icon_Check
            width={20 * height}
            height={20 * height}
            fill={
              isConsentToAllTerms()
                ? colors.consentColor
                : colors.blurredBorderColor
            }
          />
          <Text
            style={{
              marginLeft: 15 * width,
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 17 * height,
              lineHeight: 32 * height,
            }}>
            약관에 모두 동의
          </Text>
        </TouchableOpacity>
        {[
          '크립토스 필수 항목 모두 동의',
          '휴대폰 본인확인 서비스',
          '마케팅 정보 수신 동의 (선택)',
        ].map((val: string, idx) => {
          return (
            <TouchableOpacity
              key={val}
              activeOpacity={1}
              onPress={() => setConsentToTerms(idx)}
              style={{
                width: '100%',
                height: 45 * height,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingHorizontal: 20 * width,
              }}>
              <Icon_Check
                width={17 * height}
                height={17 * height}
                fill={
                  consentToTerms(idx)
                    ? colors.consentColor
                    : colors.blurredBorderColor
                }
              />
              <Text
                style={{
                  marginLeft: 15 * width,
                  marginRight: 6 * height,
                  fontStyle: 'normal',
                  fontWeight: '300',
                  fontSize: 15 * height,
                  lineHeight: 32 * height,
                }}>
                {val}
              </Text>
              <Icon_View_More
                width={10 * height}
                height={10 * height}
                fill={'gray'}
              />
            </TouchableOpacity>
          );
        })}
        <OneButtonFooter
          disabled={!isConsentToTermsOkay()}
          containerStyle={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 35 * height,
            opacity: isConsentToTermsOkay() ? 1 : 0.5,
          }}
          onPress={() =>
            navigation.navigate('Onboarding_3', {phoneNumber: phoneNumber})
          }
          buttonText={'확인'}
        />
      </View>
    );
  };

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
        <Text style={_globalStyles.mainText}>사용자 정보를</Text>
        <Text style={_globalStyles.mainText}>입력해주세요</Text>
        <View style={{marginTop: 24 * height}}>
          <Text
            style={[
              _globalStyles.textInputTitleText,
              {
                color:
                  focusedInputIdx === 0
                    ? colors.focusedTextColor
                    : colors.blurredTextColor,
              },
            ]}>
            닉네임
          </Text>
          <TextInput
            style={[
              _globalStyles.textInputStyle,
              {
                borderColor:
                  focusedInputIdx === 0
                    ? colors.focusedBorderColor
                    : colors.blurredBorderColor,
              },
            ]}
            onFocus={() => setFocusedInputIdx(0)}
            onBlur={() => setFocusedInputIdx(-1)}
            onChangeText={setNickName}
            value={nickName}
            placeholder={'닉네임'}
          />
          <Text
            style={[
              _globalStyles.textInputTitleText,
              {
                color:
                  focusedInputIdx === 1
                    ? colors.focusedTextColor
                    : colors.blurredTextColor,
              },
            ]}>
            통신사
          </Text>
          <TextInput
            style={[
              _globalStyles.textInputStyle,
              {
                borderColor:
                  focusedInputIdx === 1
                    ? colors.focusedBorderColor
                    : colors.blurredBorderColor,
              },
            ]}
            value={mobileCarrier}
            editable={false}
            placeholder={'통신사'}
            onTouchStart={() => {
              setFocusedInputIdx(1);
              Keyboard.dismiss();
              setShowMobileCarrierOptionModal(true);
            }}
          />
          <Text
            style={[
              _globalStyles.textInputTitleText,
              {
                color:
                  focusedInputIdx === 2
                    ? colors.focusedTextColor
                    : colors.blurredTextColor,
              },
            ]}>
            휴대폰번호
          </Text>
          <TextInput
            style={[
              _globalStyles.textInputStyle,
              {
                borderColor:
                  focusedInputIdx === 2
                    ? colors.focusedBorderColor
                    : colors.blurredBorderColor,
              },
            ]}
            onFocus={() => setFocusedInputIdx(2)}
            onBlur={() => setFocusedInputIdx(-1)}
            onChangeText={(text: string) => {
              setPhoneNumber(text);
              if (text.length >= 11) Keyboard.dismiss();
            }}
            value={phoneNumber}
            placeholder={'휴대폰번호'}
            keyboardType={'phone-pad'}
            maxLength={11}
          />
        </View>

        <OneButtonFooter
          disabled={!isUserInfoFilledIn()}
          containerStyle={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 35 * height,
            opacity: isUserInfoFilledIn() ? 1 : 0.5,
          }}
          onPress={() => setShowConsentToTermsModal(true)}
          buttonText={'다음'}
        />

        {showMobileCarrierOptionModal && (
          <BottomSheet
            setBottomSheetState={setShowMobileCarrierOptionModal}
            bottomSheetStyleProps={{
              dim: true,
              containerStyle: {
                borderTopRightRadius: 20 * height,
                borderTopLeftRadius: 20 * height,
              },
              bottomSheetHeight: 520 * height,
              bottomSheetWidth: 375 * width,
            }}
            bottomSheetContent={MobileCarrierOptionModalContent}
          />
        )}
        {showConsentToTermsModal && (
          <BottomSheet
            setBottomSheetState={setShowConsentToTermsModal}
            bottomSheetStyleProps={{
              dim: true,
              containerStyle: {
                borderTopRightRadius: 20 * height,
                borderTopLeftRadius: 20 * height,
              },
              bottomSheetHeight: 410 * height,
              bottomSheetWidth: 375 * width,
            }}
            bottomSheetContent={ConsentToTermsModalContent}
          />
        )}
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
  optionElementContainer: {
    width: 335 * width,
    height: 61 * height,
    borderRadius: 15 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionElementText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18 * height,
    lineHeight: 32 * height,
    textAlign: 'center',
  },
  modalTitleText: {
    marginBottom: 26 * height,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20 * height,
    lineHeight: 32 * height,
    color: 'black',
  },
  modalContainerStyle: {
    width: 375 * width,
    height: 520 * height,
    borderTopRightRadius: 20 * height,
    borderTopLeftRadius: 20 * height,
    paddingHorizontal: 20 * width,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalCloseIconStyle: {
    width: '100%',
    height: 55 * height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
