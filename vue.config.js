module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/panoform/" : "/",
  pwa: {
    name: "Panoform",
    themeColor: "#ee3933",
    msTileColor: "#ffffff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black"
  }
};
