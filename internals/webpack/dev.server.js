import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.dev.babel';
import config from '../../config';

const { host, port } = config;

const devServer = new WebpackDevServer(Webpack(webpackConfig), {
  noInfo: true,
  hot: true,
  stats: { color: true },
  contentBase: webpackConfig.output.path,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
});

devServer.listen(port, host, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`\rHot Loader serves on http://${host}:${port}`);
  }
});
