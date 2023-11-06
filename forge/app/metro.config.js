const path = require('path');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

module.exports = makeMetroConfig({
  resolver: {
    extraNodeModules: {
      core: `${__dirname}/core`,
      'react-native-reanimated': path.resolve(
        __dirname,
        'node_modules/react-native-reanimated'
      ),
    },
  },
});
