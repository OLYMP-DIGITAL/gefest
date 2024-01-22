/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { User } from 'core/features/users/users.types';
import { Currency } from '../currency/currency.types';

export enum TransactionType {
  crypto = 'crypto',
  points = 'points',
  lifePay = 'lifePay',
}

export enum TransactionStatus {
  open = 'open', // счет открыт
  pending = 'pending', // началась оплата по ссылке, необходимо отобразить лоадер на форме
  success = 'success', // счет успешно оплачен
  blocked = 'blocked', // средства захолдированы, но еще не оплачены/возвращены (двухстадийная оплата)
  error = 'error', // счет нельзя оплатить (истек)
}

export interface Transaction {
  id: number;
  user: User;
  amount: number;
  status: TransactionStatus;
  currency: Currency;
  shareValue: number;
  shareCount: number;
  dollarRate: number;
  transactionId: string;
  transactionLink: string;
}
