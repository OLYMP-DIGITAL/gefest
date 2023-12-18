// *****************************************************************************
// =============================== CONSTANTS ===================================
// *****************************************************************************
const LIFE_PAY_AUTH_URL = 'https://api-ecom.life-pay.ru/v1/auth';

const LIFE_PAY_API_KEY = '371e8d524a252852cd186df76dfe4a5b';
const LIFE_PAY_SERVICE_ID = 89264;

// *****************************************************************************
// =============================== INTERFACES ==================================
// *****************************************************************************
export interface LifePayAuthPayload {
  api_key: string;
  service_id: number;
}

export interface LifePayAuthResponse {
  jwt: string;
  lp_public: string;
}

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

      console.log('Результат аутентифиации', response);

      this.jwt = response.jwt;
      await strapi.store.set({ key: 'lpJwt', value: response.jwt });
      strapi.log.info(
        `Установлена переменная lifePay jwt: ${await strapi.store.get({
          key: 'lpJwt',
        })}`
      );
    } catch (error) {
      strapi.log.error('Произошла ошибка при аутентификации на LifePay');
    }
  }
}

module.exports = new LifePay();
