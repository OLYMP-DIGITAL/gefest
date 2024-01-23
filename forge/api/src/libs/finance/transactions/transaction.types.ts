/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { Currency } from '../currency/currency.types';
import { User } from '../users/users.types';

export interface MakeTransactionFunction {
  (user: User, count: number): Promise<void>;
}

export enum TransactionStatus {
  open = 'open', // счет открыт
  pending = 'pending', // началась оплата по ссылке, необходимо отобразить лоадер на форме
  success = 'success', // счет успешно оплачен
  blocked = 'blocked', // средства захолдированы, но еще не оплачены/возвращены (двухстадийная оплата)
  error = 'error', // счет нельзя оплатить (истек)
}

export interface Transaction {
  id?: number;
  user: User;
  amount: number; // Сумма транзакции в центах
  status: TransactionStatus; // Статус транзакции
  currency: Currency; // Валюта транзакции
  shareValue: number; // Стоимость акции в момент попкупки акции
  shareCount: number; // Количество приобретаемых акций
  dollarRate: number; // Курс доллара в момент покупки акций
  transactionId: string; // Идентификатор транзакции платёжной системы
  transactionLink: string; // Ссылка на которую редиректить пользователя для оплаты
}
