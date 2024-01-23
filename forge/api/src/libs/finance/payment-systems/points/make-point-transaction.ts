/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { User } from '../../users/users.types';
import { Currency } from '../../currency/currency.types';
import { createTransaction } from '../../transactions/methods/create-transaction';
import { getUSDRateFromCBR } from '../../currency/helpers/get-usd-rate-from-cbr';
import { generateRandomString } from '../../helpers/gerate-random-string';
import {
  MakeTransactionFunction,
  TransactionStatus,
} from '../../transactions/transaction.types';
import { getCurrentShareValue } from '../../shares/get-current-share-value';
import { updateUserPoints } from './update-user-points';
import { getConfig } from '../../config/get-config';

export const makePointTransaction: MakeTransactionFunction = async (
  user: User,
  count: number // количество приобретаемых долей
): Promise<any> => {
  try {
    const rate: number = await getUSDRateFromCBR(); // Курс доллара в копейках
    const transactionId = `order-${generateRandomString(10)}`;

    if (!rate) {
      throw new Error('Ошибка при получении курса доллара');
    }

    const config = await getConfig();
    const shareValue = await getCurrentShareValue();

    // Цена долей в центах по последней цене акции (в центах)
    const cents: number = shareValue.value * count;

    console.log('COUNT OF POINTS', {
      cents,
      points: user.points,
    });

    if (cents > user.points) {
      throw new Error('Недостаточно баллов');
    }

    const transactionPayload = {
      rate,
      user,
      count,
      transactionId,

      status: TransactionStatus.success,
      currency: Currency.points,
      transactionLink: `${config.payloadRedirect}/?uid=${generateRandomString(
        5
      )}`,
    };

    console.log('CREATING TRANSACTION ===> ', transactionPayload);
    const transaction = await createTransaction(transactionPayload);

    if (transaction) {
      // Обновление количество баллов пользователя
      await updateUserPoints(user.points - cents, user);
    }

    return transaction;
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};
