/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { Currency } from '../../currency/currency.types';
import { getCurrentShareValue } from '../../shares/get-current-share-value';
import { getUserLimit } from '../../users/methods/get-user-limit';
import { User } from '../../users/users.types';
import { Transaction, TransactionStatus } from '../transaction.types';

export interface CreateTransactionOptions {
  user: User;
  rate: number; // курс доллара в копейках
  count: number; // количество акций
  currency: Currency; // валюта в которой совершается транзакция
  transactionId: string;
  transactionLink: string; // ссылка на проведение транзакции

  status?: TransactionStatus;
}

export const createTransaction = async ({
  rate,
  user,
  count,
  status,
  currency,
  transactionId,
  transactionLink,
}: CreateTransactionOptions): Promise<any> => {
  try {
    const shareValue = await getCurrentShareValue();

    if (!shareValue || !shareValue.value) {
      console.log(
        '[MAKE TRANSACTION] Неудалось получить стоимость доли',
        shareValue
      );
      throw new Error('Неудалось получить стоимость доли');
    }

    console.log(
      '[MAKE TRANSACTION] Получена стоимость доли: ',
      shareValue.value
    );

    // Цена долей в центах по последней цене акции (в центах)
    const cents: number = shareValue.value * count;

    // ==================== ПОДСЧЁТ ЛИМИТА НА ПОКУПАЕМЫЕ ДОЛИ ================
    const limit = await getUserLimit(user);

    if (cents > limit) {
      throw new Error('Limit of transactions');
    }

    // ==================== Сохранение данных транзакции в БД ================
    const model: Transaction = {
      user: user,
      currency,
      status: status || TransactionStatus.open,
      amount: cents,
      dollarRate: rate,
      shareCount: count,
      shareValue: shareValue.value,
      transactionId: transactionId,
      transactionLink: transactionLink,
    };

    const transaction = await strapi.entityService.create(
      'api::life-pay-transaction.life-pay-transaction',
      {
        data: model as any,
      }
    );

    return transaction;
  } catch (error) {
    console.log('Ошибка при создании транзакции:', error.details.errors);
    return Promise.reject(error);
  }
};
