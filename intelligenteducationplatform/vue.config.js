const path = require('path');
const webpack = require('webpack')
const vueConfig = require('./build/utils')
require('events').EventEmitter.defaultMaxListeners = 0;

function resolve(dir) {
  return path.join(__dirname, dir)
}

const vueEnv = vueConfig.wrapperEnv(process.env);

const { PUBLIC_PATH, PORT, PROXY_DEF, ASSETS_DIR, OUTPUT_DIR, PRODUCTION_SOURCE_MAP } = vueEnv;

module.exports = {
  outputDir: OUTPUT_DIR,
  assetsDir: ASSETS_DIR,
  publicPath: PUBLIC_PATH,
  productionSourceMap: PRODUCTION_SOURCE_MAP,
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT'
    }
  },
  devServer: {
    port: PORT,
    open: false,
    disableHostCheck: true,
    proxy: vueConfig.createProxy(PROXY_DEF),
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('@comps', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('utils', resolve('src/utils'))
      .set('@style', resolve('src/style'))
      .set('@gpaper', resolve('src/views/intelGeneratepaper'));
    config.plugins.delete('prefetch');
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 50,
            selectorBlackList: ['el-time-spinner', 'guide'],
            propList: ['*']
          })
        ]
      }
    }
  }
}
