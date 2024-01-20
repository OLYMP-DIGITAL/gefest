import api from 'core/services/api';
import { LifePayTransaction } from '../life-pay/life-pay.types';
import { Transaction } from './ym-transactions.types';

export enum YmTransactionsRoute {
  user = 'transaction/user',
  make = 'transaction/make',
  get = 'transaction/:id',
}

export const makeYmTransaction = (value: number): Promise<Transaction> => {
  return api.post<Transaction>(YmTransactionsRoute.make, { value });
};

export const getYmTransaction = (paymentId: string): Promise<Transaction> => {
  return api.get<Transaction>(
    YmTransactionsRoute.get.replace(/:id/g, paymentId)
  );
};

export const fetchUserYmTransactions = (): Promise<LifePayTransaction> => {
  return api.get<LifePayTransaction>(YmTransactionsRoute.user);
};
