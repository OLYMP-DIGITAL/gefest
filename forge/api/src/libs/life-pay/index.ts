// *****************************************************************************
// =============================== CONSTANTS ===================================

import { LifePayAuthPayload, LifePayAuthResponse } from './life-pay.types';

// *****************************************************************************
const LIFE_PAY_AUTH_URL = 'https://api-ecom.life-pay.ru/v1/auth';

const LIFE_PAY_API_KEY = '371e8d524a252852cd186df76dfe4a5b';
const LIFE_PAY_SERVICE_ID = 89264;

class LifePay {
  jwt = '';

  async auth() {
    try {
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

      const response: LifePayAuthResponse = (await fetch(
        LIFE_PAY_AUTH_URL,
        requestOptions
      ).then((response) => response.json())) as LifePayAuthResponse;

      this.jwt = response.jwt;
    } catch (error) {
      strapi.log.error(
        `Произошла ошибка при аутентификации на LifePay: ${error.message}`
      );
    }
  }

  async get(id: string) {
    if (this._jwtExist()) {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${this.jwt}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      return fetch(
        `https://api-ecom.life-pay.ru/v1/invoices/${id}`,
        requestOptions
      ).then((result) => result.json());
    } else {
      strapi.log.warn('Попытка получить информацию о транзакции без jwt');
    }
  }

  _jwtExist(): boolean {
    return !!this.jwt;
  }
}

module.exports = new LifePay();
