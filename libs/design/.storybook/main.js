const path = require('path');
module.exports = {
  core: {
    disableTelemetry: true,
  },

  framework: {
    // name: '@storybook/react-webpack5',
    name: 'storybook-react-rspack',
    options: {
      fastRefresh: true,
    },
  },

  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@nrwl/react/plugins/storybook',
    // {
    //   name: 'storybook-addon-swc',
    //   options: {
    //     swcLoaderOptions /* https://storybook.js.org/addons/storybook-addon-swc */: {
    //       jsc /* https://swc.rs/docs/configuration/compilation#jsctransformlegacydecorator */: {
    //         parser: {
    //           decorators: true
    //         },
    //         transform: {
    //           legacyDecorator: true
    //         }
    //       }
    //     }
    //
    //   }
    // },
  ],

  // https://storybook.js.org/docs/api/main-config-typescript#skipbabel
  typescript: {
    check: false,
    reactDocgen: false,
  }
};

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
