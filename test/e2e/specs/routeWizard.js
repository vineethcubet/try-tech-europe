module.exports = {
  beforeEach (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)

      .click('[data-qa=navigation-range]')

      .waitForElementPresent('[data-qa=route-wizard]', 2000)

      .execute(function () {
        document.querySelector('[data-qa=route-wizard]').scrollIntoView()
      })
  },
  'user discovers their road trip from start to finish with a summary': function (browser) {
    browser

      .assert.visible('[data-qa=choose-option-pane]')

      .waitForElementVisible('[data-qa=full-route-option]', 2000)
      .click('[data-qa=full-route-option]')

      .waitForElementNotPresent('[data-qa=choose-option-pane]', 2000)

      .assert.visible('[data-qa=explore-route-form]')
      .setValue('[data-qa=starting-location-input]', 'Detroit, MI')
      .setValue('[data-qa=final-destination-input]', 'Dearborn, MI')
      .submitForm('[data-qa=explore-route-form]')
      .assert.elementNotPresent('[data-qa=explore-route-form]')

      .waitForElementPresent('[data-qa=road-trip-summary-pane]', 2000)

      .end()
  },

  'user discovers their commute from start to finish with a summary': function (browser) {
    browser

      .assert.visible('[data-qa=choose-option-pane]')
      .click('[data-qa=full-route-option]')
      .assert.elementNotPresent('[data-qa=choose-option-pane]')

      .assert.visible('[data-qa=explore-route-form]')
      .setValue('[data-qa=starting-location-input]', 'Detroit, MI')
      .setValue('[data-qa=final-destination-input]', 'Dearborn, MI')

      .assert.visible('[data-qa=frequent-trip-checkbox]')
      .click('[data-qa=frequent-trip-checkbox]')

      .submitForm('[data-qa=explore-route-form]')
      .waitForElementNotPresent('[data-qa=explore-route-form]', 2000)

      .waitForElementPresent('[data-qa=commute-summary-pane]', 2000)

      .end()
  },

  'user decides to try a new route after entering full route': function (browser) {
    browser

      .assert.visible('[data-qa=choose-option-pane]')
      .click('[data-qa=full-route-option]')
      .assert.elementNotPresent('[data-qa=choose-option-pane]')

      .setValue('[data-qa=starting-location-input]', 'Detroit, MI')
      .setValue('[data-qa=final-destination-input]', 'Dearborn, MI')
      .submitForm('[data-qa=explore-route-form]')

      .waitForElementPresent('[data-qa=road-trip-summary-pane]', 2000)

      .assert.visible('[data-qa=explore-new-route-button]')
      .click('[data-qa=explore-new-route-button]')
      .assert.elementNotPresent('[data-qa=explore-new-route-button]')

      .assert.visible('[data-qa=choose-option-pane]')
      .click('[data-qa=full-route-option]')
      .assert.elementNotPresent('[data-qa=choose-option-pane]')

      .assert.visible('[data-qa=explore-route-form]')
      .assert.value('[data-qa=starting-location-input]', '')
      .assert.value('[data-qa=final-destination-input]', '')

      .end()
  },

  'user chooses to explore charging after choosing to explore a route': function (browser) {
    browser

      .assert.visible('[data-qa=choose-option-pane]')
      .click('[data-qa=full-route-option]')
      .assert.elementNotPresent('[data-qa=choose-option-pane]')

      .assert.visible('[data-qa=explore-new-route-button]')
      .click('[data-qa=explore-new-route-button]')
      .assert.elementNotPresent('[data-qa=explore-new-route-button]')

      .assert.visible('[data-qa=choose-option-pane]')
      .click('[data-qa=explore-charging-option]')
      .assert.elementNotPresent('[data-qa=choose-option-pane]')

      .assert.visible('[data-qa=explore-charging-pane]')

      .end()
  },

  'user chooses to explore new route after exploring chargers': function (browser) {
    browser

      .assert.visible('[data-qa=choose-option-pane]')
      .click('[data-qa=explore-charging-option]')
      .assert.elementNotPresent('[data-qa=choose-option-pane]')

      .assert.visible('[data-qa=explore-new-route-button]')
      .click('[data-qa=explore-new-route-button]')
      .assert.elementNotPresent('[data-qa=explore-new-route-button]')

      .assert.visible('[data-qa=choose-option-pane]')
      .click('[data-qa=full-route-option]')
      .assert.elementNotPresent('[data-qa=choose-option-pane]')

      .setValue('[data-qa=starting-location-input]', 'Detroit, MI')
      .submitForm('[data-qa=explore-route-form]')
      .assert.elementNotPresent('[data-qa=starting-location-pane]')

      .end()
  }
}
