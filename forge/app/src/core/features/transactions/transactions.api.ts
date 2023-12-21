import api from 'core/services/api';
import { MakeTransactionResponse, Transaction } from './transactions.types';
import { LifePayTransaction } from '../life-pay/life-pay.types';

export enum TransactionsRoute {
  user = 'transaction/user',
  make = 'transaction/make',
  get = 'transaction/:id',
}

export const makeTransaction = (value: number): Promise<Transaction> => {
  return api.post<Transaction>(TransactionsRoute.make, { value });
};

export const getTransaction = (paymentId: string): Promise<Transaction> => {
  return api.get<Transaction>(TransactionsRoute.get.replace(/:id/g, paymentId));
};

export const fetchUserTransactions = (): Promise<LifePayTransaction> => {
  return api.get<LifePayTransaction>(TransactionsRoute.user);
};
