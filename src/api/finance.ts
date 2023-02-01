import axios from 'axios';

/**
 * When sending an asset to a user who is not registered to cryptoss, the asset is sent to escrow. When the receiver register to cryptoss, the asset will be sent to the receiver. However, if the receiver do not register to cryptoss in x-days, the asset will be sent back to the sender.
 */
const sendAssetToEscrow = async ({
  _sender_phone_number,
  _receiver_phone_number,
  _amount,
}: any) => {
  try {
    const res = await axios.post('/escrow', {
      sender_phone_number: _sender_phone_number,
      receiver_phone_number: _receiver_phone_number,
      amount: _amount,
    });

    console.log(res);
  } catch (error) {}
};

export {sendAssetToEscrow};
