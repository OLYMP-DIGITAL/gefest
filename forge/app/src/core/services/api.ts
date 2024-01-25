/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import env, { envKyes } from './env';

const BEARER = 'Bearer';

class Api {
  token = env[envKyes.defaultToken];

  async get<T>(route: string): Promise<T> {
    return fetch(`${env[envKyes.apiHost]}/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${BEARER} ${this.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Обработка данных защищенного ресурса
        return data as T;
      })
      .catch((error) => {
        console.error('Error:', error);
        return {} as T;
      });
  }

  post<T>(route: string, data: any = {}): Promise<T> {
    const raw = data instanceof FormData ? data : JSON.stringify(data);
    const headers = new Headers();

    if (!(data instanceof FormData)) {
      headers.append('Content-Type', 'application/json');
    }

    headers.append('accept', '*/*');
    if (this.token) {
      headers.append('Authorization', `${BEARER} ${this.token}`);
    }

    const requestOptions = {
      body: raw,
      method: 'POST',
      headers: headers,
      redirect: 'follow',
    };

    return fetch(
      `${
        route.startsWith('http')
          ? route
          : `${env[envKyes.apiHost]}/api/${route}`
      }`,
      requestOptions as any
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Обработка данных защищенного ресурса
        return data as T;
      })
      .catch((error) => {
        console.error('Error:', error);
        return {} as T;
      });
  }

  put<T>(route: string, data: any = {}): Promise<T> {
    const raw = JSON.stringify(data);
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('accept', '*/*');

    if (this.token) {
      headers.append('Authorization', `${BEARER} ${this.token}`);
    }

    const requestOptions = {
      body: raw,
      method: 'PUT',
      headers: headers,
      redirect: 'follow',
    };

    return fetch(`${env[envKyes.apiHost]}/api/${route}`, requestOptions as any)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Обработка данных защищенного ресурса
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
