/**
 * A set of functions called "actions" for `transaction`
 */
import { ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout';

const SHOP_ID = '284512';
const APP_KEY = 'test_K6ytkqh91lioiAtww7Gp0HJLxJRlvXPaSwSc6drYaoU';

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

    // const checkout = new YooCheckout({
    //   shopId: SHOP_ID,
    //   secretKey: APP_KEY,
    // });
  },

  make: async (ctx, next) => {
    const { value } = ctx.request.body;
    const config = await strapi.entityService.findOne('api::config.config', 1);

    ctx.body = 'some result';

    // const checkout = new YooCheckout({
    //   shopId: SHOP_ID,
    //   secretKey: APP_KEY,
    // });

    // const idempotenceKey = makeid(30);

    // const createPayload: ICreatePayment = {
    //   amount: {
    //     value: Number(value).toFixed(2),
    //     currency: 'RUB',
    //   },
    //   payment_method_data: {
    //     type: 'bank_card',
    //   },
    //   confirmation: {
    //     type: 'redirect',
    //     return_url: 'https://www.google.com/search?q=hello+world',
    //   },
    // };

    // try {
    //   const payment = await checkout.createPayment(
    //     createPayload,
    //     idempotenceKey
    //   );

    //   console.log('[Payment body] ', payment);

    //   ctx.body = payment;
    // } catch (error) {
    //   console.error('[Payment exception] ', error);
    //   ctx.body = error;
    // }
  },
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
};
