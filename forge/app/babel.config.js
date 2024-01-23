/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
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
