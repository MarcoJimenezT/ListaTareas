const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        filename : 'main.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            //Se especifica una nueva regla
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            //Se especifica una nueva regla
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            //Se especifica una nueva regla
            {
                //Condicion que tiene que hacer el webpack cuando este evaluando archivo por achivo
                test: /\.html$/,//Esto le dice a webpack que aplique para archivos con extencion .html
                 // AL encontrar el archivo, hacer la siguiente
                loader: 'html-loader',
                options: {
                    attributes : false,
                    minimize : false
                },
            },
            {
                test: /\.(png|svg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options:{
                        esModule:false
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            //ELtemplate de dice al plugin que archivo es el que quiero tomar
            template : './src/index.html',
            //Como se llamara en la carpeta donde sea enviado
            filename : 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename : '[name].[hash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        })
    ]
}