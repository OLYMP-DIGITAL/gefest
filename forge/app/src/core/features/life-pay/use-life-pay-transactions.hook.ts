import { LifePayTransaction } from './life-pay.types';
import { getUserTransactions } from './life-pay.api';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../users/users.atoms';
import { lifePayTransactionsAtom } from './life-pay.atom';

export const useLifePayTransactions = () => {
  const user = useRecoilValue(userAtom);
  const [transactions, setTransactions] = useRecoilState(
    lifePayTransactionsAtom
  );

  useEffect(() => {
    if (user) {
      console.log('USER UPDATED', user?.email);

      getUserTransactions().then((trs) => {
        if (Array.isArray(trs)) {
          setTransactions(trs);
        }
      });
    }
  }, [user]);

  const fetchTransactions = useCallback(() => {
    getUserTransactions().then((trs) => {
      if (Array.isArray(trs)) {
        setTransactions(trs);
      }
    });
  }, []);

  return { transactions, fetchTransactions };
};
