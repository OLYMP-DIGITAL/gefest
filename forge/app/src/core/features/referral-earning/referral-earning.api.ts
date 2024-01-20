import api from 'core/services/api';
import { ReferralEarning } from './referral-earning.types';

export enum ReferralEarningRoutes {
  get = 'referral-earnings',
}

export const getReferralEarnings = async () => {
  return await api.get<ReferralEarning[]>(ReferralEarningRoutes.get);
};
