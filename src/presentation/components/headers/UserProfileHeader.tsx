import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import SamplePf_1 from '@assets/images/sample_pf_1.svg';
import Icon_Copy from '@assets/icons/icon_copy.svg';
import Icon_Edit from '@assets/icons/icon_edit.svg';
import {colors, height, width} from '@utils/index';
import {_globalStyles} from '@screens/styles';
import {ScrollView} from 'react-native-gesture-handler';

export const UserProfileHeader = ({
  hideHoldingAPTAmountDisplay,
}: {
  hideHoldingAPTAmountDisplay: boolean;
}) => {
  const [showProfileInfoEditModal, setShowProfileInfoEditModal] =
    useState(true);

  return (
    <React.Fragment>
      <Modal transparent={true} visible={showProfileInfoEditModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 321 * width,
              height: 402 * height,
              backgroundColor: 'white',
              borderRadius: 16 * height,
              paddingVertical: 20 * height,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 16 * height,
              }}>
              <Text style={[_styles.nameText]}>김블록</Text>
              <Icon_Edit
                width={12 * height}
                height={12 * height}
                style={{left: 44 * width, position: 'absolute'}}
              />
            </View>
            <SamplePf_1 height={165 * height} width={'100%'} />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: 'pink',
                height: 80 * height,
                paddingLeft: 30 * width,
              }}>
              <Text>내 NFT 목록</Text>
              <ScrollView
                horizontal
                style={{height: 58 * height, overflow: 'visible'}}>
                <View
                  style={{
                    width: 58 * height,
                    height: 58 * height,
                    backgroundColor: 'yellow',
                    marginRight: 15 * width,
                  }}
                />
                <View
                  style={{
                    width: 58 * height,
                    height: 58 * height,
                    backgroundColor: 'yellow',
                    marginRight: 15 * width,
                  }}
                />
                <View
                  style={{
                    width: 58 * height,
                    height: 58 * height,
                    backgroundColor: 'yellow',
                    marginRight: 15 * width,
                  }}
                />
                <View
                  style={{
                    width: 58 * height,
                    height: 58 * height,
                    backgroundColor: 'yellow',
                    marginRight: 15 * width,
                  }}
                />
                <View
                  style={{
                    width: 58 * height,
                    height: 58 * height,
                    backgroundColor: 'yellow',
                    marginRight: 15 * width,
                  }}
                />
                <View
                  style={{
                    width: 58 * height,
                    height: 58 * height,
                    backgroundColor: 'yellow',
                    marginRight: 15 * width,
                  }}
                />
                <View
                  style={{
                    width: 58 * height,
                    height: 58 * height,
                    backgroundColor: 'yellow',
                    marginRight: 15 * width,
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <View style={_styles.headerContainer}>
        <View style={_styles.profilePictureContainer}>
          <SamplePf_1 width={63 * height} height={63 * height} />
        </View>
        <View style={_styles.userNameConatiner}>
          <Text style={[_globalStyles.confirmButtonText, {color: 'black'}]}>
            김블록
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[_globalStyles.subMiniText, {marginRight: 3 * height}]}>
              0x00...1234
            </Text>
            <Icon_Copy
              fill={colors.blurredTextColor}
              width={12 * height}
              height={12 * height}
            />
          </View>
        </View>
        <View
          style={[
            _styles.holdingAPTAmountDisplayContainer,
            hideHoldingAPTAmountDisplay && {opacity: 0},
          ]}>
          <Text
            style={[
              _globalStyles.confirmButtonText,
              {color: colors.gray_2, lineHeight: 0},
            ]}>
            APT
          </Text>
          <Text
            style={[
              _globalStyles.confirmButtonText,
              {
                color: colors.pointColor_light,
                fontSize: 25 * height,
                lineHeight: 0,
              },
            ]}>
            10,000
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const _styles = StyleSheet.create({
  nameText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16 * height,
    lineHeight: 16 * height,
    color: colors.gray_1,
  },
  headerContainer: {
    width: '100%',
    height: 70 * height,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5 * height,
  },
  userNameConatiner: {
    height: 43 * height,
    marginHorizontal: 20 * width,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profilePictureContainer: {
    width: 63 * height,
    height: 63 * height,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.chosenOptionBackgroundColor,
  },
  holdingAPTAmountDisplayContainer: {
    width: 140 * width,
    height: 65 * height,
    backgroundColor: 'white',
    borderRadius: 16 * height,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 19 * width,
  },
});
