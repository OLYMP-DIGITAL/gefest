interface Env {
  API_HOST: string;
  DEFAULT_TOKEN: string;
  DEFAULT_LANGUAGE: string;
}

interface ExpoConfig {
  extra: {
    production: Env;
    development: Env;
  };
}

const defaultEnv: Env = {
  // API_HOST: 'http://192.168.185.96:1337',
  API_HOST: 'http://localhost:1337',
  DEFAULT_TOKEN: '',
  // 'f76dad5e7237954f090db5ddd99eae2c57641fdeb15fad3bebc0b34672bc608ba13b781486201a92caa84fc79284f385364cd275c15e4fcc241e948ec65a683244d3ce5780669f88d21f075a658fdbc9fe4d10981cdee0fc085b636170c0d7e1ad26e11340188e66be73c935019eaf5637d3f04edd8abc1cd51dd5f18b78af86',
  DEFAULT_LANGUAGE: 'ru',
};

module.exports = ({ config }: { config: ExpoConfig }): ExpoConfig => {
  return {
    ...config,

    extra: {
      production: { ...defaultEnv },
      development: { ...defaultEnv },
    },
  };
};
