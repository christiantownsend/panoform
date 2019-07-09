module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  pwa: {
    name: "Panoform",
    themeColor: "#f42766",
    msTileColor: "#ffffff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxOptions: {
      skipWaiting: true
    }
  }
};
