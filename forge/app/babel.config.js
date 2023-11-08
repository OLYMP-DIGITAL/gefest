module.exports = function (api) {
  const plugins = [
    '@babel/plugin-proposal-export-namespace-from', // need for reanimated
    'react-native-reanimated/plugin',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@core': './core',
          '@assets': './assets',
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
