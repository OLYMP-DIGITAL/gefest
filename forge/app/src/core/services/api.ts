import env, { envKyes } from './env';
import { getToken } from './token';

const appToken =
  'f76dad5e7237954f090db5ddd99eae2c57641fdeb15fad3bebc0b34672bc608ba13b781486201a92caa84fc79284f385364cd275c15e4fcc241e948ec65a683244d3ce5780669f88d21f075a658fdbc9fe4d10981cdee0fc085b636170c0d7e1ad26e11340188e66be73c935019eaf5637d3f04edd8abc1cd51dd5f18b78af86'; // Полученный токен JWT
class Api {
  async get<T>(route: string): Promise<T> {
    // const token = (await getToken()) || appToken;
    const token = appToken;

    return fetch(`${env[envKyes.apiHost]}/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Обработка данных защищенного ресурса
        console.log('Reponse data!', data);
        return data as T;
      })
      .catch((error) => {
        console.error('Error:', error);
        return {} as T;
      });
  }

  async post<T>(route: string, data: any = {}): Promise<T> {
    const raw = JSON.stringify(data);
    const token = await getToken();
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('accept', '*/*');

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    const requestOptions = {
      body: raw,
      method: 'POST',
      headers: headers,
      redirect: 'follow',
    };

    return fetch(`${env[envKyes.apiHost]}/${route}`, requestOptions as any)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Обработка данных защищенного ресурса
        console.log('Reponse data!', data);
        return data as T;
      })
      .catch((error) => {
        console.error('Error:', error);
        return {} as T;
      });
  }
}

const api = new Api();

export default api;
