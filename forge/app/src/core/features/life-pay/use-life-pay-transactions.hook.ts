/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../users/users.atoms';
import { getUserTransactions } from './life-pay.api';
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
