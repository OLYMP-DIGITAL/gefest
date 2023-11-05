const path = require('path');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

module.exports = makeMetroConfig({
  watchFolders: ['../odysseus'],

  resolver: {
    unstable_enableSymlinks: true,
  },
});
