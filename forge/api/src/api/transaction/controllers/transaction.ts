/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
/**
 * A set of functions called "actions" for `transaction`
 */
import {
  ICreatePayment,
  IPaymentStatus,
  YooCheckout,
} from '@a2seven/yoo-checkout';
import { APP_KEY, SHOP_ID } from '../../config/constants';

enum Currency {
  rub = 'RUB',
  usd = 'USD',
}

export interface Transaction {
  value: number;
  currency: Currency;
  payment: string;
  confirmation_url: string;
  status: IPaymentStatus;
  user: any;
}

function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default {
  async user(ctx) {
    try {
      const transactions = await strapi
        .query('api::transaction.transaction')
        .findMany({
          where: {
            user: ctx.state.user,
          },
        });

      console.log('User transactions', transactions);

      ctx.body = transactions;
    } catch (error) {
      ctx.body = error;
    }
  },

  async get(ctx) {
    const { id } = ctx.request.params;

    try {
      const transaction = await strapi
        .query('api::transaction.transaction')
        .findOne({
          where: {
            payment: id,
          },
        });

      ctx.body = transaction;
    } catch (e) {
      ctx.body = e;
    }
  },

  async check(ctx) {
    const { id } = ctx.request.body;

    const checkout = new YooCheckout({
      shopId: SHOP_ID,
      secretKey: APP_KEY,
    });

    try {
      const payment = await checkout.getPayment(id);
      console.log('[SUCCESS CHECK PAYMENT]: ', payment);
      ctx.body = payment;
    } catch (error) {
      console.error('[ERROR CHECK PAYMENT]', error);
      ctx.body = error;
    }
  },

  make: async (ctx, next) => {
    const { value } = ctx.request.body;
    const config = await strapi.entityService.findOne('api::config.config', 1);

    const checkout = new YooCheckout({
      shopId: SHOP_ID,
      secretKey: APP_KEY,
    });

    const idempotenceKey = makeid(30);

    const createPayload: ICreatePayment = {
      amount: {
        value: Number(value).toFixed(2),
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: config.payloadRedirect as string,
      },
    };

    try {
      const payment = await checkout.createPayment(
        createPayload,
        idempotenceKey
      );

      console.log('[Payment body] ', payment);

      const data: Transaction = {
        confirmation_url: payment.confirmation.confirmation_url,
        currency: payment.amount.currency as Currency,
        payment: payment.id,
        status: payment.status,
        value: value,
        user: ctx.state.user,
      };

      const transaction = await strapi.entityService.create(
        'api::transaction.transaction',
        {
          data,
        }
      );

      ctx.body = transaction;
      // ctx.body = 'some body';
    } catch (error) {
      console.error('[Payment exception] ', error);
      ctx.body = error;
    }
  },

  testAction: async (ctx, next) => {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
};
