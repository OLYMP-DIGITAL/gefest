import api from 'core/services/api';
import { MakeTransactionResponse } from './transactions.types';

export enum TransactionsRoute {
  make = 'transaction/make',
}

export const makeTransaction = (
  value: number
): Promise<MakeTransactionResponse> => {
  return api.post<MakeTransactionResponse>(TransactionsRoute.make, { value });
};
