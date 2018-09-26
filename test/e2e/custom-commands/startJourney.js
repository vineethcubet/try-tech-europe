var events = require('events')
var util = require('util')

function startJourney () {
  events.EventEmitter.call(this)
}

util.inherits(startJourney, events.EventEmitter)

startJourney.prototype.command = function () {
  const api = this.client.api

  api.waitForElementPresent('[data-qa=start-journey-button]', 2000)
    .click('[data-qa=start-journey-button]')
    .pause(1650, () => {
      this.emit('complete')
    })

  return this
}

module.exports = startJourney
