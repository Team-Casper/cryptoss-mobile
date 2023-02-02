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
import {getAptosAccountState} from '../../../utils/aptos/account';
import {AptosClient, CoinClient} from 'aptos';
import {NODE_URL} from '@utils/aptos/core/constants';
import numeral from 'numeral';
import {getData} from '@utils/AsyncStorage';

interface GetAccountResourcesProps {
  address?: string;
  nodeUrl?: string;
}

export const getAccountResources = async ({
  nodeUrl = NODE_URL,
  address,
}: GetAccountResourcesProps) => {
  const client = new AptosClient(nodeUrl);
  if (address) {
    const accountResources = await client.getAccountResources(address);
    return accountResources;
  }
  return undefined;
};

const getAccountBalanceFromAccountResources = (
  accountResources: any,
): Number => {
  if (accountResources) {
    const accountResource = accountResources
      ? accountResources?.find(
          (r: any) =>
            r.type === '0x1::Coin::CoinStore<0x1::TestCoin::TestCoin>',
        )
      : undefined;
    const tokenBalance = accountResource
      ? (accountResource.data as {coin: {value: string}}).coin.value
      : undefined;
    return Number(tokenBalance);
  }
  return -1;
};

export const UserProfileHeader = ({
  hideHoldingAPTAmountDisplay,
}: {
  hideHoldingAPTAmountDisplay: boolean;
}) => {
  const [showProfileInfoEditModal, setShowProfileInfoEditModal] =
    useState(false);
  const [
    finalSavedProfilePictureImageUrl,
    setFinalSavedProfilePictureImageUrl,
  ] = useState(
    'https://pbs.twimg.com/profile_images/1562384922241024003/ugOUrz2R_400x400.jpg',
  );
  const [currentProfilePictureImageUrl, setCurrentProfilePictureImageUrl] =
    useState('');
  const [chosenNftIdx, setChosenNftIdx] = useState(-2); // 초기값
  const [holdingNftList, setHoldingNftList] = useState<NftInfo[]>([
    {
      imageUrl:
        'https://www.finder.com/finder-us/wp-uploads/2022/03/Larva-Labs_supplied_390x440.png',
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/yfRQyA1UzkKyB_vTrLkobf6xGnuNcKCRgezt7mcsxlpJU-7erg6kCrII_HgzKLchuBV0ODba_EH_BGvmu-TEijrigeXCz0eCqMyPf-k9hBCnx64QgEfHghRFZmH0vgkAHoXo3NPB8C3OaYCcc5xnNTs',
    },
    {
      imageUrl:
        'https://pbs.twimg.com/profile_images/1562384922241024003/ugOUrz2R_400x400.jpg',
    },
    {
      imageUrl:
        'https://pbs.twimg.com/media/FlOUXzKXwAEaHPD?format=jpg&name=large',
    },
    {
      imageUrl: 'https://pbs.twimg.com/media/FnK5eHLWIAEJ9Dp.jpg',
    },
    {
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv_2ZIC6d9fELYvZc5rwNeG8O347S5KXijDdC46xOomTpvKP_2qSpf1nYj24PEHQYCAJk&usqp=CAU',
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/y60KH8wArPNVy4kslnWZFX_rDIxxPNmMLsWTwz9GiGnfCmygzsgk2ZItVZ74vBPHyqhT6nzSiWZU8TxFJEo8FN20wtnEPkGDrNksVfP2wmz66xRANzAAdOy11VBosgRmTykIsBMs',
    },
  ]);

  useEffect(() => {
    if (currentProfilePictureImageUrl.length <= 0) {
      setCurrentProfilePictureImageUrl(finalSavedProfilePictureImageUrl);
    }
    if (chosenNftIdx === -2) {
      const indexOfCurrenProfileNft = holdingNftList
        .map((val: NftInfo) => val.imageUrl)
        .indexOf(finalSavedProfilePictureImageUrl);
      setChosenNftIdx(indexOfCurrenProfileNft);
    }
  }, []);

  const [tokenBalanceString, setTokenBalanceString] = useState('');

  useEffect(() => {
    getBalance();
  }, []);

  const [accountAddress, setAccountAddress] = useState<any>();
  const [nickname, setNickname] = useState<any>();

  const getBalance = async () => {
    const nickname = await getData('nickname');
    setNickname(nickname);
    const account = await getAptosAccountState();
    setAccountAddress(account?.address().hex());
    const accountResources = await getAccountResources({
      address: account?.address().hex(),
      nodeUrl: NODE_URL,
    });

    const accountResource = accountResources
      ? accountResources?.find(
          r => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
        )
      : undefined;
    const tokenBalance = accountResource
      ? (accountResource.data as {coin: {value: string}}).coin.value
      : undefined;
    setTokenBalanceString(
      await numeral(tokenBalance).divide(100000000).format('0,0.0000'),
    );
  };

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
          <Image
            source={{uri: currentProfilePictureImageUrl}}
            style={{height: 165 * height, width: '60%'}}
            resizeMode="contain"
          />
          <View style={_styles.myNftListOuterContainer}>
            <Text
              style={[
                _styles.listTitleText,
                {marginBottom: 7 * height, marginTop: 12 * height},
              ]}>
              내 NFT 목록
            </Text>
            <ScrollView
              horizontal
              style={{
                height: 58 * height,
                overflow: 'visible',
              }}>
              {holdingNftList.map((nftInfo: NftInfo, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={1}
                    onPress={() => {
                      setChosenNftIdx(idx);
                      setCurrentProfilePictureImageUrl(nftInfo.imageUrl);
                    }}
                    style={_styles.nftImageElementContainer}>
                    <Image
                      resizeMode="stretch"
                      style={[
                        {width: 58 * height, height: '100%'},
                        chosenNftIdx === idx && {
                          borderWidth: 3 * height,
                          borderColor: colors.gray_1,
                        },
                      ]}
                      source={{uri: nftInfo.imageUrl}}
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
  }, [currentProfilePictureImageUrl, chosenNftIdx, holdingNftList]);

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
          <Image
            style={{width: 63 * height, height: '100%'}}
            source={{uri: finalSavedProfilePictureImageUrl}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowProfileInfoEditModal(true);
          }}
          activeOpacity={1}
          style={_styles.userNameConatiner}>
          <Text style={[_globalStyles.confirmButtonText, {color: 'black'}]}>
            {nickname || '김블록'}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[_globalStyles.subMiniText, {marginRight: 3 * height}]}>
              {(accountAddress &&
                accountAddress.slice(0, 6) +
                  '....' +
                  accountAddress.slice(62, 66)) ||
                '0x0000...0000'}
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
            {tokenBalanceString}
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
    paddingLeft: 30 * width,
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
