import {_globalStyles} from '@screens/styles';
import {colors, height, width} from '@utils/globalConfig';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon_ViewMore from '@assets/icons/icon_view_more.svg';

export const CategoriesScreen = ({navigation}: {navigation: any}) => {
  return (
    <ScrollView
      style={_styles.outerContainerStyle}
      contentContainerStyle={_styles.scrollViewContentContainerStyle}>
      <Text
        style={[
          _globalStyles.mainText,
          {
            lineHeight: 29 * height,
            paddingHorizontal: 20 * width,
          },
        ]}>
        설정
      </Text>
      <View style={_styles.menuOuterContainer}>
        <View style={_styles.menuInnerContainer}>
          {[
            '비밀 복구 구문 확인',
            'Node RPC 변경',
            '비밀번호 재설정',
            '친구목록 관리',
            '핸드폰 번호 변경',
            '알림 설정',
          ].map((val: string, idx) => {
            return (
              <View
                key={val}
                style={[
                  _styles.menuElementContainer,
                  {
                    borderTopWidth: idx === 0 ? 0 : 1 * height,
                  },
                ]}>
                <Text style={_styles.menuTitleText}>{val}</Text>
                <Icon_ViewMore height={16 * height} width={16 * height} />
              </View>
            );
          })}
        </View>
      </View>
      <Text
        style={[
          _globalStyles.mainText,
          {
            lineHeight: 29 * height,
            paddingHorizontal: 20 * width,
          },
        ]}>
        정보
      </Text>
      <View style={_styles.menuOuterContainer}>
        <View style={_styles.menuInnerContainer}>
          {[
            '공지사항',
            '크립토스 이용약관',
            '개인정보취급방침',
            '고객센터/운영정책',
            '앱 관리',
          ].map((val: string, idx) => {
            return (
              <View
                key={val}
                style={[
                  _styles.menuElementContainer,
                  {
                    borderTopWidth: idx === 0 ? 0 : 1 * height,
                  },
                ]}>
                <Text style={_styles.menuTitleText}>{val}</Text>
                <Icon_ViewMore height={16 * height} width={16 * height} />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const _styles = StyleSheet.create({
  outerContainerStyle: {
    flex: 1,
    backgroundColor: colors.homeScreenBackgroundColor,
  },
  scrollViewContentContainerStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 60 * height,
    paddingBottom: 5 * height,
  },
  menuOuterContainer: {
    width: 375 * width,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 25 * height,
    paddingHorizontal: 20 * width,
    marginTop: 10 * height,
  },
  menuInnerContainer: {
    marginTop: 8 * height,
    paddingVertical: 2 * height,
    backgroundColor: 'white',
    borderRadius: 20 * height,
    width: '100%',
    paddingHorizontal: 15 * width,
  },
  menuElementContainer: {
    height: 60 * height,
    width: '100%',
    paddingLeft: 10 * width,
    borderTopColor: colors.gray_6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitleText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16 * height,
    lineHeight: 19 * height,
    color: 'black',
  },
});
