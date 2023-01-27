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
import {height, width} from '@utils/index';
import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import {BottomSheet} from '@screens/common/BottomSheet';

const colors = {
  focusedTextColor: '#4CB6C4',
  blurredTextColor: '#828282',
  focusedBorderColor: '#4CB6C4',
  blurredBorderColor: '#D9D9D9',
  chosenOptionBackgroundColor: '#D9D9D9',
};

export const Onboarding_2 = ({navigation}: {navigation: any}) => {
  const [nickName, setNickName] = useState('');
  const [mobileCarrier, setMobileCarrier] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusedInputIdx, setFocusedInputIdx] = useState(-1); // -1은, 아무데도 focus 되지 않은 상태
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [chosenMobileCarrierIdx, setChosenMobileCarrierIdx] = useState(0);

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
    setTimeout(() => setShowOptionModal(false), 300); // 0.3초 후에 모달 닫힘
  };

  const modalContent = () => {
    return (
      <View style={_styles.modalContainerStyle}>
        <Text style={_styles.modalTitleText}>통신사 선택</Text>
        {mobileCarrierList.map((val: string, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => chooseMobileCarrierOption(idx)}
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

  return (
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
            _styles.textInputTitleText,
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
            _styles.textInputStyle,
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
            _styles.textInputTitleText,
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
            _styles.textInputStyle,
            {
              borderColor:
                focusedInputIdx === 1
                  ? colors.focusedBorderColor
                  : colors.blurredBorderColor,
            },
          ]}
          value={mobileCarrier}
          editable={false}
          onTouchStart={() => {
            setFocusedInputIdx(1);
            Keyboard.dismiss();
            setShowOptionModal(true);
          }}
        />
        <Text
          style={[
            _styles.textInputTitleText,
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
            _styles.textInputStyle,
            {
              borderColor:
                focusedInputIdx === 2
                  ? colors.focusedBorderColor
                  : colors.blurredBorderColor,
            },
          ]}
          onFocus={() => setFocusedInputIdx(2)}
          onBlur={() => setFocusedInputIdx(-1)}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType={'phone-pad'}
          maxLength={11}
        />
      </View>
      <OneButtonFooter
        containerStyle={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 35 * height,
        }}
        onPress={() => navigation.navigate('Onboarding_3')}
        buttonText={'확인'}
      />
      {showOptionModal && (
        <BottomSheet
          setBottomSheetState={setShowOptionModal}
          bottomSheetStyleProps={{
            dim: true,
            containerStyle: {
              borderTopRightRadius: 20 * height,
              borderTopLeftRadius: 20 * height,
            },
            bottomSheetHeight: 520 * height,
            bottomSheetWidth: 375 * width,
          }}
          bottomSheetContent={modalContent}
        />
      )}
    </View>
  );
};

const _styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 30,
    backgroundColor: 'orange',
  },
  textInputStyle: {
    paddingHorizontal: 18 * width,
    marginTop: 10 * height,
    width: 335 * width,
    height: 54 * height,
    borderWidth: 1,
    borderRadius: 13 * height,
  },
  textInputTitleText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12 * height,
    lineHeight: 20 * height,
    marginTop: 20 * height,
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
    paddingTop: 30 * height,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
