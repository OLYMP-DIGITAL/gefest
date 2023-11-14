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
  });
};
