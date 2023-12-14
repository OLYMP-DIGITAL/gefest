import { atom } from 'recoil';

export const ShareAmountAtomKey = 'SHARE_AMOUNT';

export const shareAmountAtom = atom<number | null>({
  key: ShareAmountAtomKey,
  default: null,
});
