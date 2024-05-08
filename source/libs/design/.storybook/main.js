const path = require('path')

function makeConfig(useRspack = false) {
  const framework = useRspack ? 'storybook-react-rspack' : '@storybook/react-webpack5'
  const addons = useRspack
    ? []
    : [
        {
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
        },
      ]
  return {
    core: {
      disableTelemetry: true,
    },

    framework: {
      name: framework,
      options: {
        // todo formikProps 在 react 组件中赋值，需要对接 HMR API
        // 这块不熟 先禁用 HMR
        fastRefresh: false,
      },
    },

    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

    addons: ['@storybook/addon-essentials', '@nrwl/react/plugins/storybook', ...addons],

    // https://storybook.js.org/docs/api/main-config-typescript#skipbabel
    typescript: {
      check: false,
      reactDocgen: false,
    },
  }
}

module.exports = makeConfig(true)
// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
