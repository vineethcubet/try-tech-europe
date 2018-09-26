
module.exports = {
  beforeEach (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
  },

  'clicking on a navigation item': function (browser) {
    browser
      .assert.cssClassPresent('[data-qa=navigation-home]', 'active')
      .click('[data-qa=navigation-charging]')
      .pause(2000)
      .assert.cssClassPresent('[data-qa=navigation-charging]', 'active')
      .end()
  },

  'scrolling to a section of the page': function (browser) {
    browser
      .assert.cssClassPresent('[data-qa=navigation-home]', 'active')
      .moveToElement('[data-qa=maintenance-journey]', 0, 0)
      .assert.cssClassNotPresent('[data-qa=navigation-home]', 'active')
      .assert.cssClassPresent('[data-qa=navigation-maintenance]', 'active')
      .end()
  }
}
