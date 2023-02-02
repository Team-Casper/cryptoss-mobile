import {SERVER_ENDPOINT} from '@utils/aptos/core/constants';
import axios from 'axios';
import {Alert} from 'react-native';

/**
 * Request to authenticate phone number. If phone number is valid, a 6-digit verification code expired in 5 minutes will be sent via sms. If you want to receive a newly generated verification code (whatever the reason is), you can request again, and then the previous code will be expired.
 */
const requestForPhoneAuthentication = async (
  _nickname: string,
  _phone_number: string,
  _teleco_code: string,
) => {
  try {
    const res = await axios.post(`${SERVER_ENDPOINT}/verification/start`, {
      nickname: _nickname,
      phone_number: _phone_number,
      teleco_code: _teleco_code,
    });
    // return res?.data?.verification_code;
  } catch (error) {
    Alert.alert('다시 시도해 주세요.');
  }
};

/**
 * Authenticate the phone user has using the verification code.
 */
const authenticatePhone = async (
  _phone_number: string,
  _verification_code: string,
) => {
  try {
    const res = await axios.post(`${SERVER_ENDPOINT}/verification/check`, {
      phone_number: _phone_number,
      verification_code: _verification_code,
    });

    return res.status === 201;
  } catch (error: any) {
    if (error) {
      Alert.alert('인증 번호를 다시 요청 해주세요.');
    }
  }
};

/**
 * Request to register account address to cryptoss account.
 */
const registerAccountAddress = async (
  _phone_number: string,
  _address: string | undefined,
) => {
  try {
    const res = await axios.post(`${SERVER_ENDPOINT}/account/address`, {
      phone_number: _phone_number,
      address: _address,
    });
  } catch (error) {
    if (error) {
      Alert.alert('계정 등록이 실패하였습니다.');
    }
  }
};

/**
 * Get account by phone number.
 */
const getAccountByPhoneNumber = async (_phone_number: string) => {
  try {
    const res = await axios.get(`${SERVER_ENDPOINT}/account/${_phone_number}`);
    return res.data;
  } catch (error) {
    Alert.alert('다시 시도해주세요.');
  }
};

/**
 * Set profile picture with a NFT owned by user.
 */
const setProfilePictureWithNFT = async ({
  _phone_number,
}: {
  _phone_number: string;
}) => {
  try {
    const res = await axios.post(`${SERVER_ENDPOINT}/profile`, {
      phone_number: _phone_number,
    });
  } catch (error) {}
};

/**
 * Reset account by phone number
 */
const resetAccount = async ({_phone_number}: {_phone_number: string}) => {
  try {
    const res = await axios.post(`${SERVER_ENDPOINT}/reset`, {
      phone_number: _phone_number,
    });
  } catch (error) {}
};

export {
  requestForPhoneAuthentication,
  authenticatePhone,
  registerAccountAddress,
  getAccountByPhoneNumber,
  setProfilePictureWithNFT,
  resetAccount,
};
