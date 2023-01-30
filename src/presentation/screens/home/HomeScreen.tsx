import {colors, height, width, formatPhoneNumber} from '@utils/index';
import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SamplePf_1 from '@assets/images/sample_pf_1.svg';
import SamplePf_2 from '@assets/images/sample_pf_2.svg';
import SamplePf_3 from '@assets/images/sample_pf_3.svg';
import SamplePf_4 from '@assets/images/sample_pf_4.svg';
import SamplePf_5 from '@assets/images/sample_pf_5.svg';
import SamplePf_6 from '@assets/images/sample_pf_6.svg';
import Icon_Copy from '@assets/icons/icon_copy.svg';
import Icon_Search from '@assets/icons/icon_search.svg';
import UserDefaultProfileImage from '@assets/images/user_default_profile_image.svg';
import {_globalStyles} from '@screens/styles';
import Contacts, {iosEnableNotesUsage} from 'react-native-contacts';

const getSampleProfilePicture = (idx: number) => {
  const newIdx = idx % 5;
  switch (newIdx) {
    case 0:
      return <SamplePf_2 width={63 * height} height={63 * height} />;
    case 1:
      return <SamplePf_3 width={63 * height} height={63 * height} />;
    case 2:
      return <SamplePf_4 width={63 * height} height={63 * height} />;
    case 3:
      return <SamplePf_5 width={63 * height} height={63 * height} />;
    case 4:
      return <SamplePf_6 width={63 * height} height={63 * height} />;
  }
};

interface SimplifiedContact {
  name: string;
  number: string;
}

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const [searchString, setSearchString] = useState('');
  const [contactLists, setContactLists] = useState<SimplifiedContact[]>([]);
  const [filteredContactLists, setFilteredContactLists] = useState<
    SimplifiedContact[]
  >([]);

  useEffect(() => {
    if (contactLists.length === 0) {
      iosEnableNotesUsage(false);
      Contacts.checkPermission().then(result =>
        console.log('checkPermission:' + result),
      );
      Contacts.getAll().then(contacts => {
        const simplifiedContacts = contacts.map(
          (val: Contacts.Contact, idx) => {
            return {
              name: val.familyName + val.givenName,
              number: val.phoneNumbers[0]?.number
                .replace('-', '')
                .replace('-', ''),
            };
          },
        );
        setContactLists(simplifiedContacts);
        setFilteredContactLists(simplifiedContacts);
      });
    }
  }, []);

  useEffect(() => {
    if (searchString.length > 0) {
      const searchResult = contactLists.filter(val =>
        val.number.includes(searchString),
      );
      if (searchString.length >= 11 && searchResult.length === 0) {
        // 연락처에 등록된 사용자가 아닐때
        setFilteredContactLists([
          {
            name: formatPhoneNumber(searchString),
            number: '번호로 전송하기',
          },
        ]);
      } else {
        setFilteredContactLists(searchResult);
      }
    } else {
      setFilteredContactLists(contactLists);
    }
  }, [searchString]);

  const headerComponent = () => {
    return (
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
        <View style={_styles.holdingAPTAmountDisplayContainer}>
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
    );
  };

  const searchComponent = useMemo(() => {
    return (
      <View
        style={{
          backgroundColor: 'rgba(118, 118, 128, 0.12)',
          width: 331 * width,
          height: 36 * height,
          borderRadius: 10 * height,
          marginVertical: 15 * height,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 15 * width,
        }}>
        <Icon_Search
          width={18 * height}
          height={18 * height}
          fill={'rgba(60, 60, 67, 0.6)'}
        />
        <TextInput
          style={{
            backgroundColor: 'transparent',
            height: 36 * height,
            borderRadius: 10 * height,
            paddingLeft: 10 * width,
          }}
          onChangeText={setSearchString}
          value={searchString}
          placeholder={'번호 검색 / 직접 입력'}
          placeholderTextColor={'rgba(60, 60, 67, 0.6)'}
          maxLength={11}
          keyboardType={'number-pad'}
        />
      </View>
    );
  }, [searchString]);

  const contactListsDisplay = useMemo(
    () => (
      <>
        {filteredContactLists.map((data: SimplifiedContact, idx) => {
          return (
            <View key={idx} style={_styles.contactElementContainer}>
              <View style={_styles.profilePictureContainer}>
                {data.number === '번호로 전송하기' ? (
                  <UserDefaultProfileImage
                    width={35 * height}
                    height={35 * height}
                    fill={'white'}
                  />
                ) : (
                  getSampleProfilePicture(idx)
                )}
              </View>
              <View style={{flexDirection: 'column', marginLeft: 13 * width}}>
                <Text style={[_globalStyles.contactUserNameText]}>
                  {data.name}
                </Text>
                <Text style={[_globalStyles.contactNumberText]}>
                  {formatPhoneNumber(data.number)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SendNavigator', {
                    screen: 'Send_1',
                    params: {
                      personName: data.name,
                      personPhoneNumber: data.number,
                    },
                  })
                }
                style={_styles.sendButtonConatiner}>
                <Text
                  style={[_globalStyles.subMiniText, {color: colors.gray_3}]}>
                  전송
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </>
    ),
    [filteredContactLists],
  );

  return (
    <View style={_styles.outerContainerStyle}>
      {headerComponent()}
      {searchComponent}
      <ScrollView style={{width: 375 * width}}>
        <Text style={[_globalStyles.subTitleText, {marginBottom: 5 * height}]}>
          연락처
        </Text>
        <View
          style={{
            width: 335 * width,
            borderRadius: 20 * height,
            backgroundColor: 'white',
            marginBottom: 40 * height,
          }}>
          {contactListsDisplay}
        </View>
      </ScrollView>
    </View>
  );
};

const _styles = StyleSheet.create({
  outerContainerStyle: {
    flex: 1,
    backgroundColor: colors.homeScreenBackgroundColor,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 60 * height,
    paddingHorizontal: 20 * width,
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
  contactElementContainer: {
    width: '100%',
    height: 85 * height,
    flexDirection: 'row',
    borderRadius: 20 * height,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10 * width,
  },
  sendButtonConatiner: {
    backgroundColor: colors.gray_6,
    width: 40 * width,
    height: 24 * height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 18 * width,
    borderRadius: 4 * height,
  },
});
