import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import {height, width} from '@utils/globalConfig';
import {WithLocalSvg} from 'react-native-svg';
import {BottomSheet} from '@screens/common/BottomSheet';
import {PermissionRequestContent} from '@assets/index';

export const Onboarding_1 = ({navigation}: {navigation: any}) => {
  const [showModal, setShowModal] = useState(false);

  const modalContent = () => {
    return (
      <View style={_styles.modalContainerStyle}>
        <View style={{marginLeft: 8 * height}}>
          <WithLocalSvg
            height={333 * height}
            width={360 * height}
            asset={PermissionRequestContent}
          />
        </View>
        <OneButtonFooter
          containerStyle={{
            marginTop: 15 * height,
          }}
          onPress={() => navigation.navigate('Onboarding_2')}
          buttonText={'계속하기'}
        />
      </View>
    );
  };

  return (
    <View style={_styles.outerContainerStyle}>
      <View style={{height: 260 * height}}>
        <Text style={[_styles.mainText, {marginBottom: 17 * height}]}>
          크립토의 모든 것{'\n'}크립토스에서 쉽고 간편하게
        </Text>
        <Text style={_styles.subText}>
          크립토스는 완전한 <Text style={_styles.highlightText}>탈중앙</Text>{' '}
          지갑입니다{'\n'}
          <Text style={_styles.highlightText}>전화번호</Text>만으로 쉽고
          간편하게 가상자산을 주고 받으세요
        </Text>
      </View>
      <OneButtonFooter
        containerStyle={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 35 * height,
        }}
        onPress={() => setShowModal(true)}
        buttonText={'시작하기'}
      />
      {showModal && (
        <BottomSheet
          setBottomSheetState={setShowModal}
          bottomSheetStyleProps={{
            dim: true,
            containerStyle: {
              borderTopRightRadius: 20 * height,
              borderTopLeftRadius: 20 * height,
            },
            bottomSheetHeight: 460 * height,
            bottomSheetWidth: 375 * width,
          }}
          bottomSheetContent={modalContent}
        />
      )}
    </View>
  );
};

const _styles = StyleSheet.create({
  outerContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24 * height,
    lineHeight: 32 * height,
    textAlign: 'center',
    color: '#000000',
  },
  subText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14 * height,
    lineHeight: 22 * height,
    textAlign: 'center',
    color: '#828282',
  },
  highlightText: {
    fontWeight: '700',
    color: '#2ED8A7',
  },
  modalContainerStyle: {
    width: 360 * width,
    height: 455 * height,
    borderTopRightRadius: 20 * height,
    borderTopLeftRadius: 20 * height,
    paddingTop: 12 * height,
  },
});
