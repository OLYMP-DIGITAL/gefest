/**
 * referral-earning controller
 */

import { Strapi } from '@strapi/strapi';
import { Context, Next } from 'koa';
import { calculateReferralValue } from '../../../libs/finance/referral-earnings/methods/calculate-referral-value';
import { TransactionStatus } from '../../../libs/finance/transactions/transaction.types';
import { getUserEarnings } from '../../../libs/finance/referral-earnings/methods/get-user-earnings';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::referral-earning.referral-earning',

  ({ strapi }: { strapi: Strapi }) => ({
    async find(ctx: Context, next: Next) {
      try {
        strapi.log.info(`[referral-earning.find] userId: ${ctx.state.user.id}`);

        // Собираем реферальные начисления пользователя
        const earnings = await getUserEarnings({ userId: ctx.state.user.id });

        return earnings;
      } catch (error) {
        console.error(
          '[Произошла ошибка при получении реферальных начислений]',
          error
        );

        return ctx.badRequest(error.message);
      }
    },
  })
);
