const path = require('path');
module.exports = {
  core: {
    disableTelemetry: true,
  },

  framework: {
    name: '@storybook/react-webpack5',
    // name: 'storybook-react-rspack',
    options: {},
  },

  stories: [
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@nrwl/react/plugins/storybook',
    // 'storybook-addon-swc',
  ],

  // https://storybook.js.org/docs/api/main-config-typescript#skipbabel
  typescript: {
    check: false,
    reactDocgen: false,
  },
  webpackFinal: async (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      // Modify config for development
    }
    if (configType === 'PRODUCTION') {
      // Modify config for production
    }
    if(!config.resolve) {
        config.resolve = {}
    }
    config.resolve.alias = {
        ...config.resolve.alias,
        '@flowda/types': path.resolve(__dirname, '../../types/src/index.ts')
    }
    return config;
  },
};

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
