const webpack = require('webpack')
module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        type: 'image/png',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'mask-icon',
        type: 'image/png',
        href: '/safari-pinned-tab.svg',
        color: '#191919'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.4/dist/semantic.min.css'
      }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.4.1.min.js',
        type: 'text/javascript'
      },
      {
        src:
          'https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.4/dist/semantic.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://d3js.org/d3.v5.min.js',
        type: 'text/javascript',
        body: true
      },
      {
        src: '/script.js',
        type: 'text/javascript',
        body: true
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  router: {
    linkExactActiveClass: 'active'
  },
  /*
   ** Global CSS
   */
  css: ['~assets/style.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/trend-chart', mode: 'client' },
    { src: '~/plugins/autocomplete', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  pwa: {
    workbox: {
      /* workbox options */
    },
    icon: {
      /* icon options */
    }
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://cdn.jsdelivr.net/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'https://code.jquery.com/jquery-3.4.1.min.js',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'https://d3js.org/d3.v5.min.js',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern:
          'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin&display=swap',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'https://fonts.gstatic.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'https://corona.lmao.ninja/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      }
    ]
  },
  icon: {
    iconSrc: '/logo.png'
  },
  manifest: {
    name: 'Stay Home',
    short_name: 'Stay Home',
    description: 'Statistics about the COVID-19.',
    lang: 'en-US',
    start_url: '/',
    display: 'standalone',
    theme_color: '#F6F5F0',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        $: 'jquery'
      })
    ]
  }
}
