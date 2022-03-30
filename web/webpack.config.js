const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RULES = require('./webpack.rules')
const rootDir = path.join(__dirname, '..')
const webpackEnv = process.env.NODE_ENV || 'development'

module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.web.js'),
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'app-[hash].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
		{
			test:/\.(js|jsx|tsx|ts)$/,
			exclude: /node_modules/,
			use: [{
			  loader: 'babel-loader',
			  options: {
				presets: ["@babel/preset-react"],
				// plugins: ['syntax-dynamic-import']
			  }
			}]
		},
		{
        test: /\.(jpe?g)|png|gif|svg$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
      }
	],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ],
    alias: Object.assign({
      'react-native$': 'react-native-web',
    }),
  },
}
