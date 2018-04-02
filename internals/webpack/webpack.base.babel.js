export const stringifier = (obj, names) =>
  names.reduce((a, c) => ({ ...a, [c]: JSON.stringify(process.env[c]) }), {});

export default {
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        exclude: /node_modules\/react-toolbox/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.css$/,
        include: /node_modules\/react-toolbox/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]',
              getLocalIdent: (context, localIdentName, localName) => {
                const splitted = context.context.split('/');
                const elName = splitted[splitted.length - 1];
                return `theme-${elName}--${localName}`;
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name(file) {
            if (~file.indexOf('flag-icon-css')) {
              return 'assets/flags/[name].[ext]';
            }

            return 'assets/[name].[ext]';
          },
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['', '.js', '.json'],
  },
};
