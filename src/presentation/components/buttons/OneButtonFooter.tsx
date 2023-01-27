import React from 'react';
import {
  ColorValue,
  Text,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {width, height, scale} from '@utils/index';
import LinearGradient from 'react-native-linear-gradient';

export type OneButtonFooterProps = {
  onPress: () => void;
  buttonText: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonTextColor?: ColorValue;
  buttonWidth?: number;
  buttonColor?: ColorValue;
  borderWidth?: number;
  borderColor?: ColorValue;
  disabled?: boolean;
  iconRight?: () => JSX.Element;
  iconLeft?: () => JSX.Element;
};

const _OneButtonFooter: React.FC<OneButtonFooterProps> = props => {
  const {
    onPress,
    buttonText,
    containerStyle,
    buttonTextColor,
    buttonWidth,
    buttonColor,
    borderWidth,
    borderColor,
    disabled,
    iconRight,
    iconLeft,
  } = props;
  return (
    <View style={[_styles.footerContainer, containerStyle]}>
      <TouchableOpacity disabled={disabled} activeOpacity={1} onPress={onPress}>
        <LinearGradient
          colors={['#4CB6C4', '#2ED8A7']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            _styles.footerButtonStyle,
            buttonWidth
              ? {
                  width: width * buttonWidth,
                }
              : {},
            buttonColor
              ? {
                  backgroundColor: buttonColor,
                }
              : {},
            borderWidth
              ? {
                  borderWidth: borderWidth,
                }
              : {},
            borderColor
              ? {
                  borderColor: borderColor,
                  borderWidth: 1 * scale,
                }
              : {},
          ]}>
          {iconLeft ? iconLeft() : <></>}
          <Text
            style={[
              _styles.footerButtonTextStyle,
              buttonTextColor
                ? {
                    color: buttonTextColor,
                  }
                : {},
            ]}>
            {buttonText}
          </Text>
          {iconRight ? iconRight() : <></>}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const _styles = StyleSheet.create({
  footerContainer: {
    width: width * 375,
    paddingBottom: height * 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonStyle: {
    width: width * 335,
    height: height * 54,
    borderRadius: height * 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ED8A7',
    flexDirection: 'row',
  },
  footerButtonTextStyle: {
    //fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16 * height,
    lineHeight: 25 * height,
    textAlign: 'center',
    color: '#333333',
  },
});
export const OneButtonFooter = React.memo(_OneButtonFooter);
