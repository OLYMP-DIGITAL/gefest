/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import Constants from 'expo-constants';

export enum envKyes {
  apiHost = 'API_HOST',
  defaultToken = 'DEFAULT_TOKEN',
}

const env: Env =
  Constants.expoConfig?.extra &&
  Constants.expoConfig?.extra[__DEV__ ? 'development' : 'production'];

export const getEnv = (key: envKyes) => {
  return env[key];
};

export default env;
