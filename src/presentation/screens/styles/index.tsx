import {width, height} from '@utils/index';
import {StyleSheet} from 'react-native';

export const _globalStyles = StyleSheet.create({
  outerContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    //fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24 * height,
    lineHeight: 32 * height,
    textAlign: 'center',
    color: '#000000',
  },
  subText: {
    //fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14 * height,
    lineHeight: 22 * height,
    textAlign: 'center',
    color: '#828282',
  },
  confirmButtonText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16 * height,
    lineHeight: 25 * height,
    textAlign: 'center',
    color: 'white',
  },
  highlightText: {
    fontWeight: '700',
    color: '#2ED8A7',
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
});
