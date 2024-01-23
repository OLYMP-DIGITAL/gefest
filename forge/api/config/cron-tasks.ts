/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { YooCheckout } from '@a2seven/yoo-checkout';
import { APP_KEY, SHOP_ID } from '../src/api/config/constants';
import { Strapi } from '@strapi/strapi';
import {
  Transaction,
  TransactionStatus,
} from '../src/libs/finance/transactions/transaction.types';
import { ReferralEarning } from '../src/libs/finance/referral-earnings/referral-earnings.types';
import { UsersUID } from '../src/libs/finance/users/users.types';
import { calculateReferralValue } from '../src/libs/finance/referral-earnings/methods/calculate-referral-value';

const lifePay = require('../src/libs/finance/payment-systems/life-pay');

const PLISIO_API_KEY = process.env.PLISIO_API_KEY!;
const PLISIO_OPERATION_DETAILS_URL = 'https://plisio.net/api/v1/operations';

async function updateSingleCryptoTransaction(strapi: Strapi, transaction: any) {
  async function updateTransactionStatus(status: string) {
    await strapi.entityService.update(
      'api::life-pay-transaction.life-pay-transaction',
      transaction.id,
      {
        data: {
          ...transaction,
          status,
        },
      }
    );
  }

  const transactionId = transaction.transactionId;
  const url = `${PLISIO_OPERATION_DETAILS_URL}/${transactionId}?api_key=${PLISIO_API_KEY}`;
  console.log(
    `[CRON JOB => updateLifePayTransactionStatus] Обновляем информацию о Plisio траназакции ${transactionId} по url ${url}`
  );
  const rawResponse = await fetch(url);
  if (!rawResponse.ok) {
    console.error(
      `[CRON JOB => updateLifePayTransactionStatus] Получен плохой ответ от Plisio по url ${url} для транзакции ${transactionId}. Cтавим статус транзакции: error`
    );
    return await updateTransactionStatus('error');
  }
  const output = (await rawResponse.json()) as any;

  if (output.status !== 'success') {
    throw new Error(`Plisio has returned an error: ${JSON.stringify(output)}`);
  }

  const plisioStatus = output.data.status;
  if (plisioStatus === 'new') {
    console.log(
      `[CRON JOB => updateLifePayTransactionStatus] Plisio транзакция ${transactionId} все еще ожидает оплаты. Статус: ${plisioStatus}`
    );
    return;
  }

  if (['pending', 'pending internal'].includes(plisioStatus)) {
    console.error(
      `[CRON JOB => updateLifePayTransactionStatus] Cтавим статус pending для транзакции ${transactionId}`
    );
    return await updateTransactionStatus('pending');
  }

  if (['cancelled', 'expired'].includes(plisioStatus)) {
    console.error(
      `[CRON JOB => updateLifePayTransactionStatus] Cтавим статус blocked (${plisioStatus}) для транзакции ${transactionId}`
    );
    return await updateTransactionStatus('blocked');
  }

  if (plisioStatus === 'cancelled duplicate') {
    if (output.data.child_ids && output.data.child_ids.length === 1) {
      const newTransactionId = output.data.child_ids[0];
      console.log(
        `[CRON JOB => updateLifePayTransactionStatus] Plisio изменил id транзакции с ${transactionId} на ${newTransactionId}, обновляем id и в нашей БД. Реальный статус транзакции будет узнан в следующем запуске этой cron задачи.`
      );
      await strapi.entityService.update(
        'api::life-pay-transaction.life-pay-transaction',
        transaction.id,
        {
          data: {
            ...transaction,
            transactionId: newTransactionId,
          },
        }
      );
    } else {
      console.log(
        `[CRON JOB => updateLifePayTransactionStatus] Получен статус cancelled duplicate от Plisio, но не получен новый id транзакции. Помечаем тразакцию ${transactionId} как error.`
      );
      await updateTransactionStatus('error');
    }
    return;
  }

  if (plisioStatus === 'error') {
    console.error(
      `[CRON JOB => updateLifePayTransactionStatus] Cтавим статус error для транзакции ${transactionId}`
    );
    return await updateTransactionStatus('error');
  }

  // К этому моменту может оставаться только успех
  // mismatch - клиент переплатил, но для нас это нестрашно
  if (!['success', 'completed', 'mismatch'].includes(plisioStatus)) {
    console.error(
      `[CRON JOB => updateLifePayTransactionStatus] Неизвестный статус ${plisioStatus} у транзакции ${transactionId}. Plisio url: ${url}`
    );
    return await updateTransactionStatus('error');
  }

  const paidInCurrency = output.data.currency;
  const rate = output.data.source_rate;

  if (paidInCurrency && rate) {
    await strapi.entityService.update(
      'api::life-pay-transaction.life-pay-transaction',
      transaction.id,
      {
        data: {
          ...transaction,
          status: 'success',
          currency: paidInCurrency,
          dollarRate: parseFloat(rate),
        },
      }
    );
    console.log(
      `[CRON JOB => updateLifePayTransactionStatus] Успешно учтановили статус success, rate и currency у crypto / plisio транзакции ${transactionId}!`
    );
  } else {
    console.error(
      `[CRON JOB => updateLifePayTransactionStatus] Plisio не вернул paidInCurrency или rate. Все равно помечаем транзакцию как выполненную, но не заполняем эти поля. Plisio url: ${url}`
    );
    await updateTransactionStatus('success');
  }
}

export default {
  updateLifePayTransactionStatus: {
    task: async (options) => {
      const strapi: Strapi = options.strapi;

      console.log('[CRON JOB => updateLifePayTransactionStatus]');

      try {
        // Собираем неоконченные платежи
        const transactions = await strapi
          .query('api::life-pay-transaction.life-pay-transaction')
          .findMany({
            where: {
              status: TransactionStatus.open,
              currency: 'RUR',
              $or: [
                {
                  status: TransactionStatus.open,
                },
                {
                  status: TransactionStatus.pending,
                },
              ],
            },

            populate: ['user'],
          });

        if (!lifePay.jwt) {
          strapi.log.info('[NEW LIFEPAY CONNECTION]');
          await lifePay.auth();
        } else {
          strapi.log.info('[PREVIOUS LIFEPAY CONNECTION in use]', lifePay.jwt);
        }

        if (transactions && transactions.length) {
          strapi.log.info(
            '[CRON JOB => updateLifePayTransactionStatus] Надены трнзакции для проверки'
          );
          console.log(transactions);

          for (let i = 0; i < (transactions as []).length; i++) {
            const transaction: Transaction = transactions[i];
            console.log('FETCHINB DATA FOR TRANSACTION', transaction);

            const responseTransaction = await lifePay.get(
              transaction.transactionId
            );
            console.log('RESPONSE TRANSACTION', responseTransaction);

            // ... и если статус платёжки обновился
            if (responseTransaction.status !== transaction.status) {
              console.log(
                '[CRON JOB => updateTransactionStatuses] Founded payment to update status',
                {
                  transaction: {
                    id: transaction.transactionId,
                    status: transaction.status,
                  },
                  responseTransaction: {
                    id: responseTransaction.id,
                    status: responseTransaction.status,
                  },
                }
              );

              // ... то обновляем запись и в нашей базе данных
              const entry = await strapi
                .query('api::life-pay-transaction.life-pay-transaction')
                .update({
                  where: { id: transaction.id },
                  data: {
                    ...transaction,
                    status: responseTransaction.status,
                  },
                });

              strapi.log.info('Updated life-pay-transaction');
              console.log({ entry });

              // Есть ли пользователя транзакции реферер? Транзакция выполнена?
              if (
                transaction.user.referal &&
                entry.status === TransactionStatus.success
              ) {
                const referrerId = +transaction.user.referal;

                const referrer = await strapi.query(UsersUID).findOne({
                  where: {
                    id: referrerId,
                  },
                });

                // Существует ли реферер?
                if (referrer) {
                  strapi.log.info(
                    `[CRON JOB => updateLifePayTransactionStatus] Начисление реферального процента`
                  );

                  const referralValue = await calculateReferralValue(
                    transaction.shareCount * transaction.shareValue
                  );

                  strapi.log.info(
                    `[CRON JOB => updateLifePayTransactionStatus] Вычислена реферальная сумма: ${referralValue}`
                  );

                  const referralEarning = await strapi.db
                    .query('api::referral-earning.referral-earning')
                    .create({
                      data: {
                        referrer,
                        transaction,
                        user: transaction.user,
                        value: referralValue,
                      } as ReferralEarning,
                    });

                  if (!referralEarning) {
                    throw new Error('Ошибка создания реферального начисления');
                  }

                  strapi.log.info(
                    `[CRON JOB => updateLifePayTransactionStatus] Начисление реферального процента `
                  );
                }
              }
            }
          }
        } else {
          strapi.log.error(
            '[CRON JOB => updateLifePayTransactionStatus] Не найдено не одной транзакции для проверки статуса'
          );
          console.error(transactions);
        }
      } catch (error) {
        strapi.log.error(
          `[CRON JOB => updateLifePayTransactionStatus] => ${error.message}`
        );
        console.log(error);
      }
    },
    options: {
      rule: '*/1 * * * *',
    },
  },

  updateCryptoTransactionStatus: {
    task: async (options) => {
      const strapi: Strapi = options.strapi;

      console.log('[CRON JOB => updateCryptoTransactionStatus]');

      // Собираем неоконченные платежи
      const transactions = await strapi.entityService.findMany(
        'api::life-pay-transaction.life-pay-transaction',
        {
          filters: {
            $or: [
              {
                status: 'open',
              },
              {
                status: 'pending',
              },
            ],
            currency: null,
          },
        }
      );

      try {
        if (!transactions || !transactions.length) {
          console.log(
            '[CRON JOB => updateCryptoTransactionStatus] Не найдено ни одной крипто транзакции для проверки статуса'
          );
          return;
        }
        (transactions as []).forEach(async (tx) => {
          try {
            await updateSingleCryptoTransaction(strapi, tx);
          } catch (error) {
            console.error(
              '[CRON JOB => updateCryptoTransactionStatus]',
              tx,
              error
            );
          }
        });
      } catch (error) {
        strapi.log.error('[CRON JOB => updateCryptoTransactionStatus]');
        console.log(error);
      }
    },
    options: {
      rule: '*/1 * * * *',
    },
  },

  updateTransactionStatuses: {
    task: async ({ strapi }: { strapi: Strapi }) => {
      console.log('[CRON JOB => updateTransactionStatuses]');

      // Собираем неоконченные платежи
      const transactions = await strapi.entityService.findMany(
        'api::transaction.transaction',
        {
          filters: {
            $or: [
              {
                status: 'pending',
              },
              {
                status: 'waiting_for_capture',
              },
            ],
          },
        }
      );

      try {
        if (Array.isArray(transactions) && transactions.length) {
          console.log(
            '[CRON JOB => updateTransactionStatuses] Founded panding or waiting transaction'
          );

          const checkout = new YooCheckout({
            shopId: SHOP_ID,
            secretKey: APP_KEY,
          });
          // Перебираем найденные платежы
          transactions.forEach(async (transaction) => {
            // Запрашиваем текущее состояние
            const payment = await checkout.getPayment(
              transaction.payment as string
            );

            // ... и если статус платёжки обновился
            if (payment.status !== transaction.status) {
              console.log(
                '[CRON JOB => updateTransactionStatuses] Founded payment to update status',
                {
                  transaction: {
                    id: transaction.payment,
                    status: transaction.status,
                  },
                  payment: {
                    id: payment.id,
                    status: payment.status,
                  },
                }
              );

              // ... то обновляем запись и в нашей базе данных
              const entry = await strapi.entityService.update(
                'api::transaction.transaction',
                transaction.id,
                {
                  data: {
                    ...transaction,
                    status: payment.status,
                  },
                }
              );
            }
          });
        } else {
          console.log(
            '[CRON JOB => updateTransactionStatuses] Panding or waiting payments not founded!'
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    options: {
      rule: '*/1 * * * *',
    },
  },
};

// async function makeLifepPayInvoice({
//   amount,
//   currency_code,
//   name,
//   order_id,
//   service_id,
//   jwt,
// }: LifePayCreateInvoicePayload & {
//   jwt: string;
// }): Promise<LifePayCreateInvoice> {
//   var myHeaders = new Headers();
//   myHeaders.append('Content-Type', 'application/json');
//   myHeaders.append('Authorization', `Bearer ${jwt}`);

//   var raw = JSON.stringify({
//     name,
//     amount,
//     order_id,
//     service_id,
//     currency_code,
//   } as LifePayCreateInvoicePayload);

//   var requestOptions = {
//     body: raw,
//     method: 'POST',
//     headers: myHeaders,
//   };

//   return fetch(LIFE_PAY_CREATE_INVOICE_URL, requestOptions)
//     .then((response) => {
//       console.log('[LIFE PAY CREATE REQUEST RESPONSE]', response);
//       return response;
//     })
//     .then((response) => response.json()) as Promise<LifePayCreateInvoice>;
// }
