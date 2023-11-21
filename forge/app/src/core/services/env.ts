import Constants from 'expo-constants';

export enum envKyes {
  apiHost = 'API_HOST',
  defaultToken = 'DEFAULT_TOKEN',
}

const env: Env =
  Constants.expoConfig?.extra &&
  Constants.expoConfig?.extra[__DEV__ ? 'development' : 'production'];

export default env;
