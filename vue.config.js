module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/styles/styles.scss";',
      }
    }
  }
}