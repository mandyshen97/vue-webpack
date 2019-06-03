// webpack.config.js

// path是nodejs中的一个基本包，用来处理路径的
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  // 编译目标是web平台
  target: 'web',
  // 声明入口,entry使用绝对路径，保证不出错误
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'production',
  // 出口
  output: {
    // 输出打包文件名（将index.js以及其依赖的资源打包成bundle.js）
    filename: 'bundle.js',
    // 输出路径
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

// 如果是开发模式，则进行下列配置
if(isDev){
  // 控制是否生成，以及如何生成 source map
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    // 端口
    port: 8080,
    // 主机
    host: '0.0.0.0',
    // 使webpack错误显示到页面上
    overlay: {
      error: true,
    },
    // 自动打开浏览器
    // open: true,
    // 模块热替换，只更新更改的部分
    hot: true
  };
  // 添加插件
  config.plugins.push(
    // 热模块替换插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;

