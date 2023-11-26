import { YooCheckout } from '@a2seven/yoo-checkout';
import { APP_KEY, SHOP_ID } from '../src/api/config/constants';
import { Strapi } from '@strapi/strapi';

export default {
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
