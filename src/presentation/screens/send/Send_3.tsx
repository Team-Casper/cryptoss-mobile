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
import LottieView from 'lottie-react-native';

export const Send_3 = ({navigation, route}: {navigation: any; route: any}) => {
  const {personName, amountToSend} = route.params;
  const [displayLottie_1, setDisplayLottie_1] = useState(true);
  return (
    <View style={[_globalStyles.outerContainerStyle]}>
      {displayLottie_1 && (
        <LottieView
          source={{
            uri: 'https://assets5.lottiefiles.com/packages/lf20_gf4wkujg.json', // 'https://assets5.lottiefiles.com/private_files/lf30_c860hfww.json',
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
      )}
      <View style={{paddingBottom: 15 * height}}>
        <Text style={_styles.confirmText}>
          <Text style={{fontWeight: '700'}}>{personName}</Text>님에게{'\n'}
          <Text style={{fontWeight: '700'}}>{amountToSend} APT</Text>를 보내고
          있어요
        </Text>
        <Text style={[_styles.subText, {marginTop: 15 * height}]}>
          잠시만 기다려주세요
        </Text>
      </View>
      {displayLottie_1 && (
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
      )}
    </View>
  );
};

const _styles = StyleSheet.create({
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
