import React, {useState} from 'react';
import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CryptossDimensions, height, width} from '@utils/index';

export interface bottomSheetStyleProps {
  dim: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  bottomSheetHeight?: number;
  bottomSheetWidth?: number;
}

export interface bottomSheetProps {
  setBottomSheetState: (v: boolean) => void;
  bottomSheetStyleProps: bottomSheetStyleProps;
  bottomSheetContent: () => JSX.Element;
}

const _BottomSheet = (props: bottomSheetProps) => {
  const insets = useSafeAreaInsets();
  CryptossDimensions.getInstance(insets);
  const {setBottomSheetState, bottomSheetStyleProps, bottomSheetContent} =
    props;
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

  return (
    <View
      style={{
        position: 'absolute',
        marginTop:
          height * -812 +
          insets.bottom +
          (bottomSheetStyleProps.bottomSheetHeight
            ? bottomSheetStyleProps.bottomSheetHeight * height
            : 0),
      }}>
      <View
        style={[
          {
            width: width * 375,
            height: height * 812,
            backgroundColor: bottomSheetStyleProps.dim
              ? 'rgba(0, 0, 0, 0.5)'
              : 'transparent',
          },
        ]}>
        <TouchableWithoutFeedback onPress={() => setBottomSheetState(false)}>
          <View
            style={[
              {
                opacity: 0.5,
                width: '100%',
                height:
                  height * 812 -
                  (bottomSheetStyleProps.bottomSheetHeight === undefined
                    ? bottomSheetHeight
                    : bottomSheetStyleProps.bottomSheetHeight!),
              },
            ]}
          />
        </TouchableWithoutFeedback>
        <View
          onLayout={event =>
            setBottomSheetHeight(event.nativeEvent.layout.height)
          }
          style={[
            {
              backgroundColor: 'white',
              width: bottomSheetStyleProps.bottomSheetWidth,
              height:
                !bottomSheetStyleProps.bottomSheetHeight === undefined
                  ? bottomSheetHeight
                  : bottomSheetStyleProps.bottomSheetHeight,
              maxHeight: height * 812,
              // 따로 bottomSheetHeight 값을 주지 않으면 해당 컨텐츠 height에 맞춘 height을 display 해준다 (maxHeight을 넘기지 않는 선에서)
              //minHeight: height * 316,
            },
            bottomSheetStyleProps.containerStyle,
          ]}>
          {bottomSheetContent()}
        </View>
      </View>
    </View>
  );
};

export const BottomSheet = React.memo(_BottomSheet);
