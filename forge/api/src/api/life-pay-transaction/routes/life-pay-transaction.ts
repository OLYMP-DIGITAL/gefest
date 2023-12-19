/**
 * life-pay-transaction router
 */

import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::life-pay-transaction.life-pay-transaction');

export default {
  routes: [
    {
      method: 'POST',
      path: '/life-pay-transaction',
      handler: 'life-pay-transaction.post',
    },
    {
      method: 'GET',
      path: '/life-pay-transaction/user',
      handler: 'life-pay-transaction.user',
    },
  ],
};
