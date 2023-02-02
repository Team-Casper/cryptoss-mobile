import {atom, RecoilState} from 'recoil';
// import { recoilPersist } from 'recoil-persist';
import {v1} from 'uuid';
// const { persistAtom } = recoilPersist();

export const onboardingUserState = atom({
  key: `onboardingUserState${v1()}`,
  default: [
    {
      nickname: '',
      phoneNumber: '',
    },
  ],
  // effects_UNSTABLE: [persistAtom],
});
