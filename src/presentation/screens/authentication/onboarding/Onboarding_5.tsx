import {OneButtonFooter} from '@components/buttons/OneButtonFooter';
import {_globalStyles} from '@screens/styles';
import {colors, height, width} from '@utils/index';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {getData, storeData} from '@utils/AsyncStorage';
import useWalletState from 'hooks/useWalletState';
import {FaucetClient} from 'aptos';
import {createNewAccount} from '@utils/aptos/account';
import {
  FAUCET_URL,
  NODE_URL,
  USER_PHONE_NUM_ASYNC_STORAGE_KEY,
} from '@utils/aptos/core/constants';
import {registerAccountAddress} from 'api/auth';
import {onboardingUserState} from 'store/onboardingUserState';
import {useRecoilState} from 'recoil';

export const Onboarding_5 = ({navigation}: {navigation: any}) => {
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [displayLottie, setDisplayLottie] = useState(true);
  const [userState, setUserState] = useRecoilState(onboardingUserState);
  const {aptosAccount, updateWalletState} = useWalletState();

  const createAccountOnClick = async () => {
    // const client = new AptosClient(NODE_URL);
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
    const account = createNewAccount();
    await faucetClient.fundAccount(account.address(), 0);
    await updateWalletState({aptosAccountState: account});
    console.log(account);
    await storeData('aptosAccountState', account);
    const privateKeyObject = account?.toPrivateKeyObject();
    const privateKeyHex = privateKeyObject?.privateKeyHex;
    const publicKeyHex = privateKeyObject?.publicKeyHex;
    const address = privateKeyObject?.address;
    await registerAccountAddress(userState[0].phoneNumber, address);
  };

  useEffect(() => {
    if (displayLottie && !nextButtonVisible) {
      setTimeout(() => {
        setDisplayLottie(false);
        setNextButtonVisible(true);
      }, 4000);
    }
  }, []);

  return (
    <View style={[_globalStyles.outerContainerStyle]}>
      {displayLottie && (
        <LottieView
          source={{
            uri: 'https://assets4.lottiefiles.com/packages/lf20_lovdaj01.json',
          }}
          style={{
            position: 'absolute',
            top: 15 * height,
            backgroundColor: 'transparent',
          }}
          autoPlay={true}
          loop={false}
        />
      )}

      <Text
        style={[
          _globalStyles.confirmButtonText,
          {color: colors.blurredTextColor, marginBottom: 13 * height},
        ]}>
        로그인 완료!🎉
      </Text>
      <Text style={[_globalStyles.bigText]}>
        {userState[0]?.nickname}님,{'\n'}환영합니다!
      </Text>

      <OneButtonFooter
        containerStyle={{
          marginTop: 40 * height,
          opacity: nextButtonVisible ? 1 : 0,
        }}
        buttonWidth={260 * width}
        onPress={async () => {
          await createAccountOnClick();
          await storeData('onboarding', 'true');
          navigation.navigate('HomeScreen');
        }}
        buttonText={'지금 바로 크립토스 시작하기 →'}
      />
    </View>
  );
};

const _styles = StyleSheet.create({});
