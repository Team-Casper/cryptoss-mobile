import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import {height, width} from '@utils/globalConfig';
import {WithLocalSvg} from 'react-native-svg';
import {BottomSheet} from '@screens/common/BottomSheet';
import PermissionRequestContent from '@assets/images/permission_request_content.svg';
import {_globalStyles} from '@screens/styles';

export const Onboarding_1 = ({navigation}: {navigation: any}) => {
  const [showModal, setShowModal] = useState(false);

  const modalContent = () => {
    return (
      <View style={_styles.modalContainerStyle}>
        <View style={{marginLeft: 8 * height}}>
          <PermissionRequestContent
            height={333 * height}
            width={360 * height}
          />
        </View>
        <OneButtonFooter
          containerStyle={{
            position: 'absolute',
            bottom: 15 * height,
          }}
          onPress={() => navigation.navigate('Onboarding_2')}
          buttonText={'계속하기'}
        />
      </View>
    );
  };

  return (
    <View style={_globalStyles.outerContainerStyle}>
      <View style={{height: 260 * height}}>
        <Text style={[_globalStyles.mainText, {marginBottom: 17 * height}]}>
          크립토의 모든 것{'\n'}크립토스에서 쉽고 간편하게
        </Text>
        <Text style={_globalStyles.subText}>
          크립토스는 완전한{' '}
          <Text style={_globalStyles.highlightText}>탈중앙</Text> 지갑입니다
          {'\n'}
          <Text style={_globalStyles.highlightText}>전화번호</Text>만으로 쉽고
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
  modalContainerStyle: {
    width: 360 * width,
    height: 455 * height,
    borderTopRightRadius: 20 * height,
    borderTopLeftRadius: 20 * height,
    paddingTop: 12 * height,
  },
});
