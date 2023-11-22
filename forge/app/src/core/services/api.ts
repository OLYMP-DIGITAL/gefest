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
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Обработка данных защищенного ресурса
        console.log('Response data!', data);
        return data as T;
      })
      .catch((error) => {
        console.error('Error:', error);
        return {} as T;
      });
  }

  post<T>(route: string, data: any = {}): Promise<T> {
    const raw = JSON.stringify(data);
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('accept', '*/*');
    headers.append('Authorization', `${BEARER} ${this.token}`);

    const requestOptions = {
      body: raw,
      method: 'POST',
      headers: headers,
      redirect: 'follow',
    };

    return fetch(`${env[envKyes.apiHost]}/api/${route}`, requestOptions as any)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Обработка данных защищенного ресурса
        console.log('Response data!', data);
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
