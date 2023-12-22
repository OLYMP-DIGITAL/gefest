import { useCallback, useEffect, useState } from 'react';
import { Transaction } from '../transactions/transactions.types';
import { fetchUserTransactions } from '../transactions/transactions.api';
import { LifePayTransaction } from './life-pay.types';

export const useLifePayTransactions = () => {
  const [transactions, setTransactions] = useState<LifePayTransaction[]>([]);

  useEffect(() => {
    fetchUserTransactions().then((trs) => {
      if (Array.isArray(trs)) {
        setTransactions(trs);
      }
    });
  }, []);

  const fetchTransactions = useCallback(() => {
    fetchUserTransactions().then((trs) => {
      if (Array.isArray(trs)) {
        setTransactions(trs);
      }
    });
  }, []);

  return { transactions, fetchTransactions };
};
