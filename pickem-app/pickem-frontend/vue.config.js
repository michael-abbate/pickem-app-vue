const { defineConfig } = require('./node_modules/@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://areyouwatchingthis.com/'
  }
});