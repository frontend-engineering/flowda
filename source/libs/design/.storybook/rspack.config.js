/* https://github.com/rspack-contrib/rspack-examples/blob/main/rspack/react-storybook/.storybook/rspack.config.js */
const path = require('path');
module.exports = ({config}) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = {
        ...config.resolve.alias,
        '@flowda/types': path.resolve(__dirname, '../../types/src/index.ts'),
        '@flowda/shared': path.resolve(__dirname, '../../shared/src/index.ts')
    };
    return config;
};
