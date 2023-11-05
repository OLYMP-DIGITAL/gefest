module.exports = function (api) {
  const plugins = [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
  ];

  api.cache(true);
  return {
    plugins,
    presets: ['babel-preset-expo'],
  };
};
