/**
 * life-pay-transaction controller
 */

// import { factories } from '@strapi/strapi'
// import { Strapi, RequestContext } from '@strapi/strapi';
import { Context } from 'koa';

// export default factories.createCoreController('api::life-pay-transaction.life-pay-transaction');
export default {
  async post(ctx: Context) {
    console.log('TEEEST', ctx.request.body, ctx.state.user);
    ctx.body = ctx.request.body;
  },
};
