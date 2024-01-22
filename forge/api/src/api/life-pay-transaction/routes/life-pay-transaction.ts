/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
/**
 * life-pay-transaction router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::life-pay-transaction.life-pay-transaction');

export default {
  routes: [
    {
      method: 'POST',
      path: '/life-pay-transaction',
      handler: 'life-pay-transaction.post',
    },
    {
      method: 'POST',
      path: '/life-pay-transaction/crypto',
      handler: 'life-pay-transaction.crypto',
    },
    {
      method: 'POST',
      path: '/life-pay-transaction/points',
      handler: 'life-pay-transaction.points',
    },
    {
      method: 'GET',
      path: '/life-pay-transaction/user',
      handler: 'life-pay-transaction.user',
    },
    {
      method: 'POST',
      path: '/life-pay-transaction/test',
      handler: 'life-pay-transaction.test',
    },
  ],
};
