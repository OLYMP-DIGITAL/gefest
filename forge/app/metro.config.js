/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
  };

  config.resolver = {
    ...resolver,
    assetExts: [...resolver.assetExts, 'ttf', 'otf'],
    // sourceExts: [...resolver.sourceExts, 'svg'],
  };

  config.resolver.extraNodeModules = {
    src: `${__dirname}/src`,
    core: `${__dirname}/src/core`,
    assets: `${__dirname}/src/assets`,

    'react-native-reanimated': path.resolve(
      __dirname,
      'node_modules/react-native-reanimated'
    ),
  };

  return config;
})();
