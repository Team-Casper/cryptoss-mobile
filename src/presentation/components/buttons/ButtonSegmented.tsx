import {colors, height, scale, width} from '@utils/index';
import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';

export type ButtonSegmentedProps = {
  selectedTabIdx: number;
  setSelectedTabIdx: (idx: number) => void;
  tabTitleList: string[];
  style: ViewStyle;
};

const mono200 = colors.chosenOptionBackgroundColor;
const mono300 = '#d0d7dd';
const mono400 = colors.gray_2;
const mono500 = '#7c8992';
const mono600 = colors.gray_1;

const _ButtonSegmented: React.FC<ButtonSegmentedProps> = props => {
  const {selectedTabIdx, setSelectedTabIdx, tabTitleList, style} = props;

  return (
    <View style={[_styles.ListTabWrapper, style]}>
      {tabTitleList.map((val: string, idx) => (
        <React.Fragment key={idx}>
          <View
            style={{
              width: 0,
              height: 20 * height,
              borderWidth: 0.5 * height,
              borderColor:
                idx !== 0 &&
                idx !== selectedTabIdx &&
                idx !== selectedTabIdx + 1
                  ? colors.gray_3 //mono300
                  : mono200,
            }}
          />
          <Pressable onPress={() => setSelectedTabIdx(idx)}>
            {({pressed}) => (
              <View
                style={[
                  selectedTabIdx === idx
                    ? _styles.TabElement_selected
                    : _styles.TabElement_unSelected,
                  {
                    width:
                      ((335 - 8 - 3 * (tabTitleList.length - 1)) * width) /
                      tabTitleList.length,
                  },
                ]}>
                <Text
                  style={[
                    selectedTabIdx === idx
                      ? {color: mono600}
                      : {color: mono400},
                    pressed && {color: mono500},
                  ]}>
                  {val}
                </Text>
              </View>
            )}
          </Pressable>
        </React.Fragment>
      ))}
    </View>
  );
};

const _styles = StyleSheet.create({
  ListTabWrapper: {
    width: 335 * width,
    height: 40 * height,
    backgroundColor: mono200,
    borderRadius: 15 * height,
    padding: 4 * height,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  TabElement_selected: {
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 12 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TabElement_unSelected: {
    height: '90%',
    backgroundColor: mono200,
    borderRadius: 12 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ButtonSegmented = _ButtonSegmented;
