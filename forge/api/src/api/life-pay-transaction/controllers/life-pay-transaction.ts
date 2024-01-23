/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
/**
 * life-pay-transaction controller
 */

// import { factories } from '@strapi/strapi'
// import { Strapi, RequestContext } from '@strapi/strapi';
import { Context } from 'koa';
import { Currency } from '../../../libs/finance/currency/currency.types';
import { getUSDRateFromCBR } from '../../../libs/finance/currency/helpers/get-usd-rate-from-cbr';
import { generateRandomString } from '../../../libs/finance/helpers/gerate-random-string';
import { ShareCost } from '../../../libs/finance/shares/shares.types';
import { getUserLimit } from '../../../libs/finance/users/methods/get-user-limit';
import { User } from '../../../libs/finance/users/users.types';
import { makePointTransaction } from '../../../libs/finance/payment-systems/points/make-point-transaction';

const LIFE_PAY_AUTH_URL = 'https://api-ecom.life-pay.ru/v1/auth';
const LIFE_PAY_CREATE_INVOICE_URL = 'https://api-ecom.life-pay.ru/v1/invoices';

const LIFE_PAY_API_KEY = process.env.LIFE_PAY_API_KEY as string;
const LIFE_PAY_SERVICE_ID = Number(process.env.LIFE_PAY_SERVICE_ID);

const PLISIO_API_KEY = process.env.PLISIO_API_KEY!;
const PLISIO_NEW_INVOICE_URL = 'https://plisio.net/api/v1/invoices/new?';

// export default factories.createCoreController('api::life-pay-transaction.life-pay-transaction');
export default {
  async test(ctx: Context) {
    try {
      const user: User = ctx.state.user;

      // Количество приобретаемых долей
      const count: number = (ctx.request as any).body.count;

      const transaction = await makePointTransaction(user, count);

      return { user, count, transaction };
    } catch (error) {
      strapi.log.error(
        `Произошла ошибка при покупке долей за баллы: ${error.message}`
      );

      return ctx.badRequest(error.message);
    }
  },

  async user(ctx: Context) {
    try {
      console.log('CHECK USER', ctx.state.user);

      const userTransactions = await strapi.entityService.findMany(
        'api::life-pay-transaction.life-pay-transaction',
        {
          filters: {
            $and: [
              {
                $or: [
                  { status: 'success' },
                  { status: 'open' },
                  { status: 'pending' },
                ],
              },
              {
                user: {
                  id: ctx.state.user.id,
                },
              },
            ],
          },
        }
      );

      ctx.body = userTransactions;
    } catch (error) {
      console.error('[Произошла ошибка при создании транзакции] ', error);
      return ctx.badRequest(error.message);
    }
  },

  async post(ctx: Context) {
    try {
      console.log('[LIFE PAY TRANSACTION] Поступил запрос на полу');
      const user: User = ctx.state.user;

      // Количество приобретаемых долей
      const count: number = (ctx.request as any).body.count;

      console.log('[LIFE PAY TRANSACTION] Получение курса долара...');

      // Курс доллара в копейках
      const rate: number = await getUSDRateFromCBR();

      if (!rate) {
        throw new Error('Неудалось получить курс доллара');
      }

      console.log('[LIFE PAY TRANSACTION] Получен курс доллара: ', rate);
      console.log('[LIFE PAY TRANSACTION] Получение стоимости доли...');

      // Текущая стоимость доли
      const shareValue: ShareCost = await strapi
        .query('api::share-amount.share-amount')
        .findOne({ orderBy: { createdAt: 'desc' } });

      if (!shareValue || !shareValue.value) {
        console.log(
          '[LIFE PAY TRANSACTION] Неудалось получить стоимость доли',
          shareValue
        );
        throw new Error('Неудалось получить стоимость доли');
      }

      console.log(
        '[LIFE PAY TRANSACTION] Получена стоимость доли: ',
        shareValue.value
      );

      // =============== Сумма в рублях для создания тразакции =================
      // Цена долей в центах по последней цене акции (в центах)
      const cents: number = shareValue.value * count;

      // Перевод цены покупаемых долей в рубли
      const kopeck: number = (cents * rate) / 100;

      // Добавление 5%
      const additionalPercent = 5;
      const finalAmountRubls = (kopeck * (1 + additionalPercent / 100)) / 100;

      // ==================== ПОДСЧЁТ ЛИМИТА НА ПОКУПАЕМЫЕ ДОЛИ ================
      console.log('[LIFE PAY TRANSACTION] Проверка на лимит покупаемы долей');
      const limit = await getUserLimit();

      console.log('[LIFE PAY TRANSACTION] LIMIT', {
        limit,
        cents,
        calc: cents * (1 + additionalPercent / 100),
      });

      if (cents > limit) {
        throw new Error('Limit of transactions');
      }

      console.log('[LIFE PAY TRANSACTION] Авторизация в системе LifePay');

      // Авторизация в системе LifePay
      const lifePayAuth: LifePayAuthResponse = (await authOnLifePay()) as any;

      if (!lifePayAuth.jwt) {
        throw new Error('Неудалось авторизоваться в Lifepay');
      }

      const orderId = `order-${generateRandomString(10)}`;

      // Создании LifePay транзакции
      const transactionPayload = {
        jwt: lifePayAuth.jwt,
        name: 'покупка долей',
        amount: finalAmountRubls,
        order_id: orderId,
        currency_code: Currency.rub,
        service_id: LIFE_PAY_SERVICE_ID,
      };

      console.log(
        '[LIFE PAY TRANSACTION] Отравка запроса в LifePay на создание транзакции... ',
        transactionPayload
      );

      const lifePayTransaction: LifePayCreateInvoice =
        await makeLifepPayInvoice(transactionPayload);

      if (!lifePayTransaction) {
        throw new Error(
          'Непредсказуемая ошибка при создании транзакции на LifePay'
        );
      }

      console.log(
        '[LIFE PAY TRANSACTION] Транзакция от LifePay получена',
        lifePayTransaction
      );

      if (lifePayTransaction.error) {
        throw new Error(lifePayTransaction.message);
      }

      // ==================== Сохранение данных транзакции в БД ================
      const transactionModel: LifePayEntry = {
        user,
        orderId,
        amount: cents,
        dollarRate: rate,
        shareCount: count,
        shareValue: shareValue.value,
        transactionId: lifePayTransaction.id,
        transactionLink: lifePayTransaction.form_link,
      };

      await strapi.entityService.create(
        'api::life-pay-transaction.life-pay-transaction',
        {
          data: transactionModel,
        }
      );

      // ==================== Формирование результата пользователю==============
      const result: LifePayCreateInvoiceResponse = {
        link: lifePayTransaction.form_link,
      };

      ctx.body = result;
    } catch (error) {
      console.error('[Произошла ошибка при создании транзакции] ', error);
      return ctx.badRequest(error.message);
    }
  },

  async crypto(ctx: Context) {
    try {
      console.log('[LIFE PAY TRANSACTION] Поступил запрос на оплату в крипте');
      const user: User = ctx.state.user;

      // Количество приобретаемых долей
      const count: number = (ctx.request as any).body.count;

      console.log('[LIFE PAY TRANSACTION] Получение стоимости доли...');

      // Текущая стоимость доли
      const shareValue: ShareCost = await strapi
        .query('api::share-amount.share-amount')
        .findOne({ orderBy: { createdAt: 'desc' } });

      if (!shareValue || !shareValue.value) {
        console.log(
          '[LIFE PAY TRANSACTION] Неудалось получить стоимость доли',
          shareValue
        );
        throw new Error('Неудалось получить стоимость доли');
      }

      console.log(
        '[LIFE PAY TRANSACTION] Получена стоимость доли: ',
        shareValue.value
      );

      // =============== Сумма в рублях для создания тразакции =================
      // Цена долей в центах по последней цене акции (в центах)
      const cents: number = shareValue.value * count;

      // ==================== ПОДСЧЁТ ЛИМИТА НА ПОКУПАЕМЫЕ ДОЛИ ================
      console.log('[LIFE PAY TRANSACTION] Проверка на лимит покупаемы долей');
      const limit = await getUserLimit();

      console.log('[LIFE PAY TRANSACTION] LIMIT', {
        limit,
        cents,
      });

      if (cents > limit) {
        throw new Error('Limit of transactions');
      }

      const orderId = `order-${generateRandomString(10)}`;
      console.log(
        '[LIFE PAY TRANSACTION] Подготовка к созданию инвойса в системе Plisio',
        { orderId }
      );

      const searchParams = new URLSearchParams();
      searchParams.append('api_key', PLISIO_API_KEY);
      searchParams.append('source_currency', 'USD');
      searchParams.append('source_amount', (cents / 100).toFixed(2));
      searchParams.append('order_number', orderId);
      searchParams.append('currency', 'USDT_BSC'); // валюта, в которой предлагать оплачивать по умолчанию
      searchParams.append(
        'allowed_psys_cids',
        'BTC,LTC,ETH,BNB,USDT_BSC,USDT_TRX,USDT'
      ); // все валюты доступные для оплаты
      searchParams.append('email', user.email);
      searchParams.append('order_name', `Buy ${count} shares`);
      searchParams.append('callback_url', 'ethereum.org');

      const plisioMakeInvoiceUrl =
        PLISIO_NEW_INVOICE_URL + searchParams.toString();

      console.log('[LIFE PAY TRANSACTION] Выполняем запрос к Plisio');
      const rawResponse = await fetch(plisioMakeInvoiceUrl);
      const output = (await rawResponse.json()) as any;
      if (output.status !== 'success') {
        throw new Error(
          `Plisio has returned an error: ${JSON.stringify(output)}`
        );
      }
      const plisioTransactionId = output.data.txn_id!;
      const plisioInvoiceUrl = output.data.invoice_url!;
      console.log('[LIFE PAY TRANSACTION] получены от Plisio:', {
        plisioTransactionId,
        plisioInvoiceUrl,
      });

      // ==================== Сохранение данных транзакции в БД ================
      const transactionModel: LifePayEntry = {
        user,
        orderId,
        amount: cents,
        dollarRate: null, // пока что неизвестен
        shareCount: count,
        shareValue: shareValue.value,
        transactionId: plisioTransactionId,
        transactionLink: plisioInvoiceUrl, // ссылка пока что неизвестна
      };

      console.log('[LIFE PAY TRANSACTION] сохранение Plisio транзакции в БД', {
        transactionModel,
      });
      await strapi.entityService.create(
        'api::life-pay-transaction.life-pay-transaction',
        {
          data: transactionModel,
        }
      );
      console.log('[LIFE PAY TRANSACTION] транзакция Plisio в БД сохранена');

      // ==================== Формирование результата пользователю==============
      const result: LifePayCreateInvoiceResponse = {
        link: plisioInvoiceUrl,
      };

      ctx.body = result;
    } catch (error) {
      console.error('[Произошла ошибка при создании транзакции] ', error);
      return ctx.badRequest(error.message);
    }
  },

  async points(ctx: Context) {
    const user: User = ctx.state.user;

    try {
      // Количество приобретаемых долей
      const count: number = (ctx.request as any).body.count;

      const transaction = await makePointTransaction(user, count);

      return { user, count, transaction };
    } catch (error) {
      strapi.log.error(
        `Произошла ошибка при покупке долей за баллы (user: ${user.id}): ${error.message}`
      );

      return ctx.badRequest(error.message);
    }
  },
};

async function makeLifepPayInvoice({
  amount,
  currency_code,
  name,
  order_id,
  service_id,
  jwt,
}: LifePayCreateInvoicePayload & {
  jwt: string;
}): Promise<LifePayCreateInvoice> {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${jwt}`);

  var raw = JSON.stringify({
    name,
    amount,
    order_id,
    service_id,
    currency_code,
  } as LifePayCreateInvoicePayload);

  var requestOptions = {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  };

  return fetch(LIFE_PAY_CREATE_INVOICE_URL, requestOptions)
    .then((response) => {
      console.log('[LIFE PAY CREATE REQUEST RESPONSE]', response);
      return response;
    })
    .then((response) => response.json()) as Promise<LifePayCreateInvoice>;
}

async function authOnLifePay() {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    service_id: LIFE_PAY_SERVICE_ID,
    api_key: LIFE_PAY_API_KEY,
  } as LifePayAuthPayload);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  return fetch(LIFE_PAY_AUTH_URL, requestOptions).then((response) =>
    response.json()
  );
}

interface LifePayEntry {
  user: any;
  amount: number;
  shareValue: number;
  shareCount: number;
  dollarRate: number;
  orderId: string;
  transactionId: string;
  transactionLink: string;
}

interface LifePayCreateInvoiceResponse {
  link: string;
}

interface LifePayAuthPayload {
  api_key: string;
  service_id: number;
}

interface LifePayAuthResponse {
  jwt: string;
  lp_public: string;
}

// ================================ INVOICES ===================================
interface LifePayCreateInvoicePayload {
  order_id: string;
  amount: number;
  currency_code: Currency;
  service_id: number;
  name: string;
}

enum LifePayInvoiceStatus {
  open = 'open', // счет открыт
  pending = 'pending', // началась оплата по ссылке, необходимо отобразить лоадер на форме
  success = 'success', // счет успешно оплачен
  blocked = 'blocked', // средства захолдированы, но еще не оплачены/возвращены (двухстадийная оплата)
  error = 'error', // счет нельзя оплатить (истек)
}

interface LifePayCreateInvoice {
  amount: number;
  currency_code: Currency;
  email: string;
  form_link: string;
  id: string;
  is_recurrent: boolean;
  name: string;
  order_id: string;
  phone: number;
  send_receipt_through: null;
  service_id: number;
  short_id: number;
  status: LifePayInvoiceStatus;
  url_error: string;
  url_success: string;
  error?: string;
  message?: string;
}
