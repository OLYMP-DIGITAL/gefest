import { LifePayTransaction } from './life-pay.types';
import { getUserTransactions } from './life-pay.api';
import { useCallback, useEffect, useState } from 'react';

export const useLifePayTransactions = () => {
  const [transactions, setTransactions] = useState<LifePayTransaction[]>([]);

  useEffect(() => {
    getUserTransactions().then((trs) => {
      if (Array.isArray(trs)) {
        setTransactions(trs);
      }
    });
  }, []);

  const fetchTransactions = useCallback(() => {
    getUserTransactions().then((trs) => {
      if (Array.isArray(trs)) {
        setTransactions(trs);
      }
    });
  }, []);

  return { transactions, fetchTransactions };
};
