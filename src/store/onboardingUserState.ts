import {atom, RecoilState} from 'recoil';
// import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

export const onboardingUserState = atom({
  key: 'onboardingUserState',
  default: {
    nickname: '',
  },
  // effects_UNSTABLE: [persistAtom],
});
