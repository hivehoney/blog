const path = require('path')

module.exports = {
    plugin: [
        {
            plugin: path,
            options: {
                source: 'options',
                baseUrl: './',
                alias: {
                    '@components': path.resolve(__dirname, 'src/components'),
                    '@utils': path.resolve(__dirname, 'src/utils'),
                    '@assets': path.resolve(__dirname, 'src/assets'),
                    '@pages': path.resolve(__dirname, 'src/pages'),
                    '@styles': path.resolve(__dirname, 'src/styles'),
                    '@routes': path.resolve(__dirname, 'src/routes'),
                },
            }
        }
    ]
};