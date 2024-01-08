import { atom } from 'recoil';
import { Transaction } from './transactions.types';

export enum TransactionAtomKeys {
  transactions = 'transactions',
}

export const transactionsAtom = atom<Transaction[]>({
  key: TransactionAtomKeys.transactions,
  default: [],
});
