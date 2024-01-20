import { Transaction } from 'core/finance/transaction/transaction.types';
import { User } from '../users/users.types';

export interface ReferralEarning {
  user: User;
  value: number;
  referrer: User;
  createdAt: string;
  updatedAt: string;
  transaction: Transaction;
}

export type ReferrerEarningResponse = ReferralEarning[];
