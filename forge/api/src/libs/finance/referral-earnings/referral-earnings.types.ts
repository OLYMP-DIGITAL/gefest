import { Transaction } from '../transactions/transaction.types';
import { User } from '../users/users.types';

export interface ReferralEarning {
  user: User;
  value: number;
  referrer: User;
  transaction: Transaction;
}
