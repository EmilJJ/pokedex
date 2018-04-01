import Webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import config from '../../config';
import baseWebpackConfig, { stringifier } from './webpack.base.babel';

const HotModuleReplacementPlugin = new Webpack.HotModuleReplacementPlugin();

const { host, port } = config;

export default {
  devtool: 'source-map',
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/dev-server',
    'babel-polyfill',
    path.join(__dirname, '../../src/index.js'),
  ],
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    HotModuleReplacementPlugin,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../index.html'),
    }),
    new Webpack.ProgressPlugin(p => {
      const writeYellow = m => process.stdout.write(`\x1b[33m${m}\x1b[0m`);
      const writeGreen = m => process.stdout.write(`\x1b[32m${m}\x1b[0m`);
      process.stdout.write(`${new Array(110).join(' ')}\r`); // clean line
      if (p === 1) {
        writeGreen(
          `[${new Array(48).join('=')}DONE${new Array(48).join('=')}]`,
        );
      } else {
        const donePercent = ~~(p * 100);
        const notDonePercent = 100 - donePercent;
        writeYellow(
          `[${new Array(donePercent).join('=')}>${new Array(
            notDonePercent - 1,
          ).join(' ')}]\r`,
        );
      }
    }),
    new Webpack.DefinePlugin({
      'process.env': stringifier(process.env, ['NODE_ENV', 'API_HOST']),
    }),
    // new CopyWebpackPlugin([{ from: 'img', to: 'img' }]),
  ],
  ...baseWebpackConfig,
};
