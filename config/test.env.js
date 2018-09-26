'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  GOOGLE_ANALYTICS_ID: '"no analytics"',
  nrel: {
    API_ENDPOINT: '"http://localhost:8181/"',
    API_KEY: '"Hahahaha"'
  },
  openCharge: {
    API_ENDPOINT: '"http://localhost:7673"'
  }
})
