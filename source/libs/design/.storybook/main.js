const path = require('path')

function makeConfig(useRspack = false) {
  const framework = useRspack ? 'storybook-react-rspack' : '@storybook/react-webpack5'
  const addons = useRspack ? [] : [{
    name: 'storybook-addon-swc',
    options: {
      swcLoaderOptions /* https://storybook.js.org/addons/storybook-addon-swc */: {
        jsc /* https://swc.rs/docs/configuration/compilation#jsctransformlegacydecorator */: {
          parser: {
            decorators: true,
          },
          transform: {
            legacyDecorator: true,
          },
        },
      },
    },
  }]
  return {
    core: {
      disableTelemetry: true,
    },

    framework: {
      name: framework,
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
      ...addons,
    ],

    // https://storybook.js.org/docs/api/main-config-typescript#skipbabel
    typescript: {
      check: false,
      reactDocgen: false,
    },
  }
}

// todo: storybook-react-rspack 突然不能解析 css
module.exports = makeConfig(false)
// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
