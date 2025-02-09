const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    // another: './src/packages/module1/index.js',
  },
  output: {
    filename: '[name].[contenthash].js', // name就是每个入口的属性值,contenthash哈希值
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
    ]
},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching'
    }) // 替我们生成html
  ],
  optimization: {
    // 需要计算tree shaking，导入了没使用没导出且无副作用则不导入，生产环境默认启用
    // /*#__PURE__*/ 这个也可以告诉webpack模块或函数是否有副作用，若标记了就会被tree shaking
    // usedExports: true,
    moduleIds: 'deterministic', // 防止index新增内容而导致vendor块的id变化而出现增量
    runtimeChunk: 'single', // 多入口所以添加，运行时代码添加到单一chunk中
    splitChunks: {
      // chunks: 'all' // 分离重复依赖到单独的chunk，chunk：程序分块
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 将三方库缓存打包，分离出index
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

//* "side effect(副作用)" 的定义是，
//* 在导入时会执行特殊行为的代码，
//* 而不是仅仅暴露一个 export 或多个 export。
//* 举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。
//* sideEffect属性用在package.json中。