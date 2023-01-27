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
  highlightText: {
    fontWeight: '700',
    color: '#2ED8A7',
  },
});
