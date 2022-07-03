const { defineConfig } = require('@vue/cli-service')
const path = require("path");
const themePath = path.join(__dirname, './src/assets/theme.less');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/global.scss";`
      },
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true;@import "${themePath}";`
          }
        }
      }
    }
  },
})
