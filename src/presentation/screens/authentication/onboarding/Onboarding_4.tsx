import {_globalStyles} from '@screens/styles';
import {colors, height, width} from '@utils/index';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import Icon_Delete from '@assets/icons/icon_delete.svg';
import LinearGradient from 'react-native-linear-gradient';
import Icon_ArrowLeft from '@assets/icons/icon_arrow_left.svg';
import {storeData} from '@utils/AsyncStorage';

const isNum = (val: string) => /^\d+$/.test(val);

export const Onboarding_4 = ({navigation}: {navigation: any}) => {
  const [phase, setPhase] = useState(0); // phase 0 - 비밀번호 입력, phase 1 - 비밀번호 확인
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
          (phase === 0 ? password : confirmPassword).length > idx
            ? ['#4CB6C4', '#2ED8A7']
            : [colors.blurredTextColor, colors.blurredTextColor]
        }
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 1}}
      />
    );
  };

  const checkPasswordMatch = async (confirmPasswordString: string) => {
    if (password === confirmPasswordString) {
      // TO-DO : 앞서 입력한 정보에 기반해 새로운 계정+지갑 생성
      await storeData('password', password);
      navigation.navigate('Onboarding_5');
    } else {
      setMismatchError(true);
      setPassword('');
      setConfirmPassword('');
      setPhase(0);
    }
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
      switch (phase) {
        case 0:
          if (password.length < 6) {
            setPassword(password + val);
            if (password.length >= 5) {
              setPhase(1);
              setMismatchError(false);
            }
          }
          return;
        case 1:
          if (confirmPassword.length < 6) {
            setConfirmPassword(confirmPassword + val);
            if (confirmPassword.length >= 5)
              checkPasswordMatch(confirmPassword + val);
          }
          return;
      }
    }
    if (val === 'back') {
      switch (phase) {
        case 0:
          if (password.length > 0)
            setPassword(password.substring(0, password.length - 1));
          return;
        case 1:
          if (confirmPassword.length > 0)
            setConfirmPassword(
              confirmPassword.substring(0, confirmPassword.length - 1),
            );
          return;
      }
    }
  };

  const onGoBackPressed = () => {
    setConfirmPassword('');
    setPassword('');
    setPhase(0);
  };

  return (
    <View
      style={[
        _globalStyles.outerContainerStyle,
        {
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingTop: 83 * height,
        },
      ]}>
      {phase === 1 && (
        <TouchableOpacity
          onPress={() => {
            onGoBackPressed();
          }}
          style={{
            position: 'absolute',
            top: 70 * height,
            left: 10 * height,
            width: 50 * height,
            height: 50 * height,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Icon_ArrowLeft width={32 * height} height={32 * height} />
        </TouchableOpacity>
      )}
      <Text
        style={[
          _globalStyles.mainText,
          {
            textAlign: 'left',
            marginBottom: 30 * height,
            marginTop: 40 * height,
            paddingHorizontal: 20 * height,
          },
        ]}>
        {phase === 0
          ? '크립토스에서 사용할' + '\n' + '비밀번호를 입력해주세요'
          : '비밀번호를' + '\n' + '한번 더 입력해주세요'}
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
            //backgroundColor: 'pink',
            marginTop: mismatchError ? -10 * height : 20 * height,
            marginBottom: 30 * height,
          }}>
          <View
            style={{
              //backgroundColor: 'yellow',
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
