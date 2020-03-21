// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../medical_visual/index.html'),
        assetsRoot: path.resolve(__dirname, '../medical_visual'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/medical/',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 80,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        context: [ //代理路径
            '/medical-backend',
        ],
        proxyPath: 'http://app.pku.edu.cn/',
        // proxyTable: {
        //     '/api': {
        //         target: 'http://app.pku.edu.cn:8103',
        //         changeOrigin: true,
        //         pathRewrite:{
        //             '^/api':'/api'
        //         }
        //     },
        //     '/app': {
        //         target: 'http://app.pku.edu.cn:8103',
        //         changeOrigin: true,
        //         pathRewrite:{
        //             '^/app':'/app'
        //         }
        //     },
        // },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}