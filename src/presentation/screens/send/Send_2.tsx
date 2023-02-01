import {_globalStyles} from '@screens/styles';
import {colors, height, width} from '@utils/index';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import Icon_Delete from '@assets/icons/icon_delete.svg';
import Icon_ArrowLeft from '@assets/icons/icon_arrow_left.svg';
import { LinearGradient } from 'expo-linear-gradient';

const isNum = (val: string) => /^\d+$/.test(val);

export const Send_2 = ({navigation, route}: {navigation: any; route: any}) => {
  const {personName, amountToSend, personPhoneNumber} = route.params;
  const [password, setPassword] = useState('');
  const [mismatchError, setMismatchError] = useState(false);

  const numberPadsList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '',
    '0',
    'back',
  ];

  const passwordCircleElement = (idx: number) => {
    return (
      <LinearGradient
        key={idx}
        style={{
          width: 20 * width,
          height: 20 * height,
          borderRadius: 50,
        }}
        colors={
          password.length > idx
            ? ['#4CB6C4', '#2ED8A7']
            : [colors.blurredTextColor, colors.blurredTextColor]
        }
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 1}}
      />
    );
  };

  const keyPadElement = (val: string) => (
    <TouchableOpacity
      key={val}
      disabled={val.length <= 0}
      onPress={() => {
        onKeyPadElementPressed(val);
      }}
      style={{
        width: '33.33%',
        height: 90 * height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {val === 'back' ? (
        <Icon_Delete width={31 * height * 1.2} height={20 * height * 1.2} />
      ) : (
        <Text style={_styles.keyPadTextStyle}>{val}</Text>
      )}
    </TouchableOpacity>
  );

  const onKeyPadElementPressed = (val: string) => {
    if (isNum(val)) {
      if (password.length < 6) {
        setPassword(password + val);
        if (password.length >= 5) {
          // to-do : 비밀번호가 일치하는지 일치하지 않는지 확인 후 일치할 경우 다음 페이지로 넘겨줘야함.
          // 일치하지 않을 경우 setMismatchError(true)로 바꾸고 다음 페이지로 못넘어가게 막고, setPassword('') 해주어야함
          navigation.navigate('Send_3', {
            personName: personName,
            personPhoneNumber: personPhoneNumber,
            amountToSend: amountToSend,
          });
        }
      }
    }
    if (val === 'back') {
      if (password.length > 0)
        setPassword(password.substring(0, password.length - 1));
    }
  };

  return (
    <View
      style={[
        _globalStyles.outerContainerStyle,
        {
          justifyContent: 'flex-start',
          paddingTop: 83 * height,
        },
      ]}>
      <Text
        style={[
          _globalStyles.mainText,
          {
            textAlign: 'center',
            marginBottom: 30 * height,
            marginTop: 40 * height,
            paddingHorizontal: 20 * height,
          },
        ]}>
        {'비밀번호를 입력해주세요'}
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 375 * width,
        }}>
        {mismatchError && (
          <Text style={_styles.errorTextStyle}>
            비밀번호가 일치하지 않습니다.{'\n'}다시 입력해주세요.
          </Text>
        )}
        <View
          style={{
            height: 100 * height,
            width: 375 * width,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: mismatchError ? -10 * height : 20 * height,
            marginBottom: 30 * height,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: 240 * width,
              justifyContent: 'space-between',
            }}>
            {[0, 1, 2, 3, 4, 5].map(idx => passwordCircleElement(idx))}
          </View>
        </View>
        <FlatList
          data={numberPadsList}
          numColumns={3}
          horizontal={false}
          bounces={true}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          focusable={true}
          renderItem={data => (
            <React.Fragment key={data.index}>
              {keyPadElement(data.item)}
            </React.Fragment>
          )}
        />
      </View>
    </View>
  );
};

const _styles = StyleSheet.create({
  keyPadTextStyle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 25 * height,
    lineHeight: 30 * height,
    textAlign: 'center',
    color: '#000000',
  },
  errorTextStyle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13 * height,
    lineHeight: 15 * height,
    textAlign: 'center',
    color: 'red',
  },
});
