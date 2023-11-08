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
    core: `${__dirname}/core`,

    'react-native-reanimated': path.resolve(
      __dirname,
      'node_modules/react-native-reanimated'
    ),
  };

  return config;
})();
