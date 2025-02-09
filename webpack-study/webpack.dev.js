const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // 报错跟踪到源代码而不是输出代码
  devServer: { // 提供一个本地web服务，可以实时重新加载
    static: './dist', // 资源
    hot: true,
  },
});