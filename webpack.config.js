const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: { main: './src/scripts/index.js' },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
  },

  plugins: [    
    new HtmlWebpackPlugin({
      template: './src/index.html' 
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(), 
  ],


  module: {
    rules: [ 
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },

      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
        },
        'postcss-loader']
      }, 
    ],
  },
}