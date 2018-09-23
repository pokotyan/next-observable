const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts')

module.exports = withFonts(withCSS({
  cssModules: true,
  exportPathMap: function(defaultPathMap) {
    return {
      '/': { page: '/' },
      '/github': { page: '/github' },
    }
  }
}))