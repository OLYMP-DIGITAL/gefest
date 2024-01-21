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
      method: 'GET',
      path: '/life-pay-transaction/user',
      handler: 'life-pay-transaction.user',
    },
    {
      method: 'GET',
      path: '/life-pay-transaction/test',
      handler: 'life-pay-transaction.test',
    },
  ],
};
