const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    name: 'webpack-setting',
    mode: 'development', // 실 : production
    devtool: 'eval', // 빠르게
    entry: {
        app: ['./src/index.js'],
    }, // 입력
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    }, // 출력
    module : { //모듈 연결 설정
        rules : [{
            test: /\.js?/, // 대상 설정
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]]
            },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
            ]},
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{ loader: 'file-loader' }]
            },
            {
                test: /.(sass|scss)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
            ]},
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                use: [
                    { loader: 'file-loader' }
                ]
            },
        ],
    },
    devServer: {
        static: './dist',
        port: 3000,
        hot: true,
        compress: true,
        open: true,
        historyApiFallback: true,
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ["dist", "public"],
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",     // 적용될 html 경로
            filename: "index.html", // 결과 파일명
            meta: {
                // meta 태그를 추가
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
            },
            hash: true,       // 모든 스크립트, css 파일에 고유한 컴파일 해시 추가하여 캐시를 무효화
            showErrors: true, // 오류 정보가 html에 기록됨
        }),
    ],
};