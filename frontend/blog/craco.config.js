const path = require('path');

module.exports = {
    babel: {
        presets: ['@emotion/babel-preset-css-prop'],
    },
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
};