const { defineConfig } = require('pickem-frontend/node_modules/@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://areyouwatchingthis.com/'
  }
});