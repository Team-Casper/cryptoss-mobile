import axios from 'axios';

/**
 * Request to authenticate phone number. If phone number is valid, a 6-digit verification code expired in 5 minutes will be sent via sms. If you want to receive a newly generated verification code (whatever the reason is), you can request again, and then the previous code will be expired.
 */
const requestForPhoneAuthentication = async ({
  _nickname,
  _phone_number,
  _teleco_code,
}: any) => {
  try {
    const res = await axios.post('/verification/start', {
      nickname: _nickname,
      phone_number: _phone_number,
      teleco_code: _teleco_code,
    });

    console.log(res);
  } catch (error) {}
};

/**
 * Authenticate the phone user has using the verification code.
 */
const authenticatePhone = async ({_phone_number, _verification_code}: any) => {
  try {
    const res = await axios.post('/verification/check', {
      phone_number: _phone_number,
      verification_code: _verification_code,
    });
  } catch (error) {}
};

/**
 * Request to register account address to cryptoss account.
 */
const registerAccountAddress = async ({_phone_number, _address}: any) => {
  try {
    const res = await axios.post('/account/address', {
      phone_number: _phone_number,
      address: _address,
    });
  } catch (error) {}
};

/**
 * Get account by phone number.
 */
const getAccountByPhoneNumber = async ({_phone_number}: any) => {
  try {
    const res = await axios.get(`/account/${_phone_number}`);
  } catch (error) {}
};

/**
 * Set profile picture with a NFT owned by user.
 */
const setProfilePictureWithNFT = async ({_phone_number}: any) => {
  try {
    const res = await axios.post(`/profile`, {
      phone_number: _phone_number,
    });
  } catch (error) {}
};

/**
 * Reset account by phone number
 */
const resetAccount = async ({_phone_number}: any) => {
  try {
    const res = await axios.post(`/reset`, {
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
