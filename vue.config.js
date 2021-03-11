module.exports = {
  pwa: {
    name: 'Katrin Mentz',
    themeColor: '#FFFFFF',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/assets/js/service-worker.js"
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/globals/";`
      },
    }
  },
  configureWebpack: {
    output: {
        crossOriginLoading: 'anonymous'
    }
  }
};