const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: true,
  exportPathMap: function(defaultPathMap) {
    return {
      '/': { page: '/' },
      '/github': { page: '/github' },
    }
  }
})