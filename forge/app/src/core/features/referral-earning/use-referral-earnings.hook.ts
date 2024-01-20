import { useEffect, useState } from 'react';
import { ReferralEarning } from './referral-earning.types';
import { getReferralEarnings } from './referral-earning.api';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { referralEarningsAtom } from './referral-earning.atoms';

export const useReferralEarnings = () => {
  const toast = useToast();
  const { t } = useTranslation();

  const [referralEarnings, setReferalEarnings] =
    useRecoilState(referralEarningsAtom);

  useEffect(() => {
    getReferralEarnings()
      .then(setReferalEarnings)
      .catch((e) => toast.show(t('finance.referralEarnings.getError')));
  }, []);

  return referralEarnings;
};
