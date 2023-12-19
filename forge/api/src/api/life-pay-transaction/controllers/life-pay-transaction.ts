/**
 * life-pay-transaction controller
 */

// import { factories } from '@strapi/strapi'
// import { Strapi, RequestContext } from '@strapi/strapi';
import { Context } from 'koa';

const LIFE_PAY_AUTH_URL = 'https://api-ecom.life-pay.ru/v1/auth';
const LIFE_PAY_CREATE_INVOICE_URL = 'https://api-ecom.life-pay.ru/v1/invoices';

const LIFE_PAY_API_KEY = '371e8d524a252852cd186df76dfe4a5b';
const LIFE_PAY_SERVICE_ID = 89264;

// export default factories.createCoreController('api::life-pay-transaction.life-pay-transaction');
export default {
  async user(ctx: Context) {
    try {
      console.log('CHECK USER', ctx.state.user);

      const userTransactions = await strapi.entityService.findMany(
        'api::life-pay-transaction.life-pay-transaction',
        {
          filters: {
            status: 'success',
          },
        }
      );

      ctx.body = userTransactions;
    } catch (error) {
      console.error('[Произошла ошибка при создании транзакции] ', error);
      return ctx.badRequest(error.message, error);
    }
  },

  async post(ctx: Context) {
    try {
      console.log('[LIFE PAY TRANSACTION] Поступил запрос на полу');
      const user: User = ctx.state.user;

      // Количество приобретаемых долей
      const count: number = ctx.request.body.count;

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
      const finalAmount = (kopeck * (1 + additionalPercent / 100)) / 100;

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
        amount: finalAmount,
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
      return ctx.badRequest(error.message, error);
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

async function getUSDRateFromCBR() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

    if (!response.ok) {
      console.error('Ошибка получения данных от Центрального банка России.');
      return null;
    }

    const data: any = await response.json();

    const usdRateInRubles = Math.trunc(data.Valute.USD.Value * 100); // Возвращаем результат в копейках
    console.log(`Текущий курс доллара к рублю: ${usdRateInRubles} коп.`);

    return usdRateInRubles;
  } catch (error) {
    console.error('Произошла ошибка при отправке запроса:', error.message);
    return null;
  }
}

function generateRandomString(length) {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
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
interface ShareCost {
  id: number;
  value: number;
  news: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: null;
  confirmationToken: null;
  confirmed: true;
  blocked: false;
  createdAt: string;
  updatedAt: string;
  name: string;
  phone: string;
  passportConfirmed: true;
  lastname: string;
  middlename: string;
  referal: number;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
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
enum Currency {
  rub = 'RUB',
}
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
