import { YooCheckout } from '@a2seven/yoo-checkout';
import { APP_KEY, SHOP_ID } from '../src/api/config/constants';
import { Strapi } from '@strapi/strapi';

const lifePay = require('../src/libs/life-pay');

export default {
  updateLifePayTransactionStatus: {
    task: async (options) => {
      const strapi: Strapi = options.strapi;

      console.log('[CRON JOB => updateLifePayTransactionStatus]');

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
          },
        }
      );

      try {
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
            const transaction = transactions[i];
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
              const entry = await strapi.entityService.update(
                'api::life-pay-transaction.life-pay-transaction',
                transaction.id,
                {
                  data: {
                    ...transaction,
                    status: responseTransaction.status,
                  },
                }
              );

              strapi.log.info('Updated life-pay-transaction');
              console.log({ entry });
            }
          }
        } else {
          strapi.log.error(
            '[CRON JOB => updateLifePayTransactionStatus] Не найдено не одной транзакции для проверки статуса'
          );
          console.error(transactions);
        }
      } catch (error) {
        strapi.log.error('[CRON JOB => updateLifePayTransactionStatus]');
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
