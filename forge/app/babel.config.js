module.exports = function (api) {
  const plugins = [
    '@babel/plugin-proposal-export-namespace-from', // need for reanimated
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          core: './core',
        },
      },
    ],
  ];

  api.cache(true);
  return {
    plugins,
    presets: ['babel-preset-expo'],
  };
};
