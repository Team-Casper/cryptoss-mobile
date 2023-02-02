import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon_Copy from '@assets/icons/icon_copy.svg';
import Icon_Edit from '@assets/icons/icon_edit.svg';
import {colors, height, width} from '@utils/index';
import {_globalStyles} from '@screens/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import {NftInfo} from '@utils/index';
import IconArrowRight from '@assets/icons/icon_arrow_right.svg';
import {MyNftList} from '@assets/images';
import FastImage from 'react-native-fast-image';

export const UserProfileHeader = ({
  hideHoldingAPTAmountDisplay,
}: {
  hideHoldingAPTAmountDisplay: boolean;
}) => {
  const [showArrow, setShowArrow] = useState(true);
  const [showProfileInfoEditModal, setShowProfileInfoEditModal] =
    useState(false);
  const [
    finalSavedProfilePictureImageUrl,
    setFinalSavedProfilePictureImageUrl,
  ] = useState(MyNftList[0]);
  const [currentProfilePictureImageUrl, setCurrentProfilePictureImageUrl] =
    useState(MyNftList[0]);
  const [chosenNftIdx, setChosenNftIdx] = useState(-2); // 초기값

  useEffect(() => {
    if (chosenNftIdx === -2) {
      const indexOfCurrenProfileNft = MyNftList.indexOf(
        finalSavedProfilePictureImageUrl,
      );
      setChosenNftIdx(indexOfCurrenProfileNft);
    }
  }, []);

  const profileEditModal = useMemo(() => {
    return (
      <View style={_styles.modalDimBackground}>
        <View style={_styles.modalContentContainer}>
          <View style={_styles.nameSectionContainer}>
            <Text style={[_styles.nameText]}>김블록</Text>
            <Icon_Edit
              width={12 * height}
              height={12 * height}
              style={{left: 44 * width, position: 'absolute'}}
            />
          </View>
          <FastImage
            source={currentProfilePictureImageUrl}
            style={{
              height: 165 * height,
              width: 165 * height,
              borderRadius: 18 * height,
            }}
            resizeMode="cover" // "stretch"
          />
          <View style={_styles.myNftListOuterContainer}>
            <Text
              style={[
                _styles.listTitleText,
                {marginBottom: 7 * height, marginTop: 12 * height},
              ]}>
              내 NFT 목록
            </Text>
            {showArrow && (
              <View
                style={{
                  position: 'absolute',
                  right: -15 * height,
                  top: 50 * height,
                  zIndex: 4,
                }}>
                <IconArrowRight
                  width={27 * height}
                  height={27 * height}
                  fill={colors.gray_1}
                />
              </View>
            )}
            <ScrollView
              horizontal
              onTouchStart={() => {
                setShowArrow(false);
              }}
              onTouchEnd={() => {
                setShowArrow(true);
              }}
              style={{
                height: 58 * height,
              }}>
              {MyNftList.map((val: any, idx) => {
                return (
                  <TouchableOpacity
                    key={idx + val}
                    activeOpacity={1}
                    onPress={() => {
                      setChosenNftIdx(idx);
                      setCurrentProfilePictureImageUrl(val);
                    }}
                    style={_styles.nftImageElementContainer}>
                    <FastImage
                      resizeMode="cover" //"stretch"
                      style={[
                        {
                          width: 58 * height,
                          height: '100%',
                          borderRadius: 8 * height,
                        },
                        chosenNftIdx === idx && {
                          borderWidth: 3 * height,
                          borderColor: colors.gray_1,
                        },
                      ]}
                      source={val}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={_styles.twoButtonFooterContainer}>
            <View style={_styles.footerContainer}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentProfilePictureImageUrl(
                    finalSavedProfilePictureImageUrl,
                  );
                  setShowProfileInfoEditModal(false);
                }}
                style={[_styles.footerButtonStyle]}
                activeOpacity={1}>
                <Text style={[_styles.footerButtonTextStyle]}>{'취소'}</Text>
              </TouchableOpacity>
            </View>
            <OneButtonFooter
              onPress={() => {
                setFinalSavedProfilePictureImageUrl(
                  currentProfilePictureImageUrl,
                );
                setShowProfileInfoEditModal(false);
              }}
              buttonText={'완료'}
              containerStyle={{width: '50%', paddingBottom: 0}}
              buttonWidth={143 * width}
            />
          </View>
        </View>
      </View>
    );
  }, [currentProfilePictureImageUrl, chosenNftIdx, showArrow]);

  return (
    <React.Fragment>
      <Modal transparent={true} visible={showProfileInfoEditModal}>
        {profileEditModal}
      </Modal>
      <View style={_styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            setShowProfileInfoEditModal(true);
          }}
          activeOpacity={1}
          style={_styles.profilePictureContainer}>
          <FastImage
            style={{width: 63 * height, height: '100%'}}
            source={finalSavedProfilePictureImageUrl}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowProfileInfoEditModal(true);
          }}
          activeOpacity={1}
          style={_styles.userNameConatiner}>
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
        </TouchableOpacity>
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
  twoButtonFooterContainer: {
    flexDirection: 'row',
    marginTop: 13 * height,
    paddingHorizontal: 10 * height,
  },
  nftImageElementContainer: {
    width: 58 * height,
    height: 58 * height,
    marginRight: 7 * width,
  },
  myNftListOuterContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 100 * height,
    width: (321 - 60) * width,
    marginTop: 7 * height,
  },
  nameSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 16 * height,
    marginBottom: 7 * height,
    marginTop: 8 * height,
  },
  modalDimBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    width: 321 * width,
    height: 410 * height,
    backgroundColor: 'white',
    borderRadius: 16 * height,
    paddingTop: 20 * height,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  footerContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonStyle: {
    width: width * 143,
    height: height * 54,
    borderRadius: height * 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blurredBorderColor,
    flexDirection: 'row',
  },
  footerButtonTextStyle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16 * height,
    lineHeight: 25 * height,
    textAlign: 'center',
    color: '#333333',
  },
  nameText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16 * height,
    lineHeight: 16 * height,
    color: colors.gray_1,
  },
  listTitleText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14 * height,
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
    height: 65 * height,
    position: 'absolute',
    right: 10 * width,
    backgroundColor: 'white',
    borderRadius: 16 * height,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 19 * width,
  },
});
