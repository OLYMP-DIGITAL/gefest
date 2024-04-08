/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import api from 'core/services/api';
import { ReferralEarning } from './referral-earning.types';

export enum ReferralEarningRoutes {
  get = 'referral-earnings',
}

export const getReferralEarnings = async () => {
  return await api.get<ReferralEarning[]>(ReferralEarningRoutes.get);
};
