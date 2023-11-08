interface Env {
  API_HOST: string;
  DEFAULT_LANGUAGE: string;
}

interface ExpoConfig {
  extra: {
    production: Env;
    development: Env;
  };
}

const defaultEnv: Env = {
  API_HOST: 'http://192.168.185.96:1337',
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
