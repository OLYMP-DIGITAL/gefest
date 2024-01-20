import { atom } from 'recoil';
import { ReferralEarning } from './referral-earning.types';

export const REFERRAL_EARNINGS_ATOM_KEY = 'REFERAL_EARNINGS_ATOM_KEY';

export const referralEarningsAtom = atom<ReferralEarning[]>({
  key: REFERRAL_EARNINGS_ATOM_KEY,
  default: [],
});
