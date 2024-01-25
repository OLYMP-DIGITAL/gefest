/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
const { merge } = require('webpack-merge');

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // console.log('Default webpackconfig', config);

  return merge(config, {
    entry: {
      main: path.resolve(__dirname, 'src/index.ts'),
    },

    resolve: {
      preferRelative: true,
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },

    module: {
      rules: [
        {
          test: /\.ttf$/,
          loader: 'url-loader', // or directly file-loader
          include: path.resolve(
            __dirname,
            'node_modules/react-native-vector-icons'
          ),
        },
      ],
    },
  });
};
