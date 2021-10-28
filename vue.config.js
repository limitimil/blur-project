module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blur-project/'
    : '/',
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  transpileDependencies: [
    'quasar',
  ],
};
