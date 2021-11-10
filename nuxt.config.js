const NODE_ENV = process.env.NODE_ENV
const bablePlugin = [
  [
    'import',
    {
      libraryName: 'mand-mobile',
      libraryDirectory: 'components',
    },
  ],
]
if (NODE_ENV === 'production') {
  bablePlugin.push('transform-remove-console')
}

module.exports = {
  mode: 'universal',
  env: {
    SERVER_ENV: process.env.SERVER_ENV,
  },
  server: {
    port: 3001, // default: 3001
    host: 'localhost', // default: localhost,
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'full-screen',
        content: 'true',
      },
      {
        name: 'x5-fullscreen',
        content: 'true',
      },
      {
        name: '360-fullscreen',
        content: 'true',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: '/js/flexible.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/router', ssr: false },
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
  styleResources: {
    stylus: ['@/assets/theme.custom.styl'],
  },
  axios: { proxy: true },
  build: {
    transpile: [/mand-mobile/],
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 100,
          minPixelValue: 2,
          propWhiteList: [],
        },
      },
      preset: {
        browsers: ['Android >= 4.0', 'iOS >= 7'],
      },
    },
    babel: {
      plugins: bablePlugin,
    },
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      if (ctx.isClient) {
        if (NODE_ENV === 'development') {
          config.devtool = 'cheap-module-eval-source-map'
        } else {
          config.devtool = 'hidden-source-map'
        }
      }
    },
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
  },
}
