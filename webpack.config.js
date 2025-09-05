const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin' )
const TerserPlugin = require('terser-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PROD = process.env.NODE_ENV === 'production'


const optimize = () => {
  const config = {
splitChunks: {
chunks: 'all'
},
minimizer: [
new CssMinimizerWebpackPlugin(), new TerserPlugin()
]
}

if (IS_PROD) {
  // Add production-specific optimizations here
}

if (IS_DEV) {
  // Add development-specific optimizations here
}
return config
}

const getFilename = (ext) => `assets/${ext}/[name]${IS_DEV ? '' : '.[fullhash]'}.${ext}`

const setCssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader']
      if (extra) {
        loaders.push(extra)
      }
      return loaders
}

const setPlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
patterns: [
{
from: path.resolve(__dirname, 'src', 'favicon.png'),
to: path.resolve(__dirname, 'dist', 'favicon.png'),
}
]
}),
new MiniCssExtractPlugin({
filename: getFilename('css')
}),
new EslintPlugin({
  extensions: ['js'],
   exclude:['node_modules'],
  configType: 'eslintrc',
  fix: true
}
)
  ]
  if (IS_PROD) {
    // Add production-specific plugins here
  }
  if (IS_DEV) {
    // Add development-specific plugins here
  }
  return plugins
}

const setJsLoaders = (extra) => {
  const loaders =
    {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
        if (extra) {
          loaders.options.presets.push(extra)
        }
        return loaders
}

module.exports = {
  mode: IS_PROD ? 'production' : "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./index.jsx",
    stat: "./statistics.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: getFilename('js'),
  },
resolve: {
    extensions: [".js", ".json", ".jsx" ,".tsx" ,".ts"],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@model': path.resolve(__dirname, 'src/model'),
      '@less': path.resolve(__dirname, 'src/less'),
      '@sass': path.resolve(__dirname, 'src/sass')
    },
},
target: 'web',
devServer: {
port: 4200,
hot: false
},
devtool: IS_DEV ? 'source-map' : false,
  plugins: setPlugins(),
  optimization: optimize(),
  performance: {
    maxEntrypointSize: 2097152,
    maxAssetSize: 2097152,
    hints: "warning"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: setJsLoaders()
      },
       {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: setJsLoaders('@babel/preset-typescript')
      },
        {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: setJsLoaders('@babel/preset-react')
      },
      {
        test: /\.css$/,
        use: setCssLoaders()
      },
           {
        test: /\.s[ac]ss$/,
        use: setCssLoaders('sass-loader')
      },

    {
        test: /\.less$/,
        use: setCssLoaders('less-loader')
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
    ],
  },
};
