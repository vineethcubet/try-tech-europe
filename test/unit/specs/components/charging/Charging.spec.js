import {mount} from 'avoriaz'
import Charging from '@/components/charging/Charging'
import store from '@/store'

describe('Charging.vue', () => {
  let subject

  beforeEach(() => {
    subject = mount(Charging, {
      store
    })
  })

  it('loads the destination tab by default', () => {
    const tabs = subject.first('[data-qa=charging-tabs]')
    expect(tabs.hasClass('charging__options--destinationCharging')).to.be.true
  })

  it('switches to the home charging when house set as dwelling type', (done) => {
    store.commit('setDwellingType', 'house')

    subject.vm.$nextTick(() => {
      const tabs = subject.first('[data-qa=charging-tabs]')
      expect(tabs.hasClass('charging__options--homeCharging')).to.be.true

      done()
    })
  })

  it('switches to the on the go charging when other dwelling type is selected', (done) => {
    store.commit('setDwellingType', 'house')
    store.commit('setDwellingType', 'other')

    subject.vm.$nextTick(() => {
      const tabs = subject.first('[data-qa=charging-tabs]')
      expect(tabs.hasClass('charging__options--destinationCharging')).to.be.true

      done()
    })
  })

  it('switches to the home charging tab', (done) => {
    subject.first('[data-qa=home-charging-button]').trigger('click')

    subject.vm.$nextTick(() => {
      const tabs = subject.first('[data-qa=charging-tabs]')
      expect(tabs.hasClass('charging__options--homeCharging')).to.be.true

      done()
    })
  })

  it('switches back to the destination charging tab', () => {
    subject.first('[data-qa=home-charging-button]').trigger('click')
    subject.update()

    subject.first('[data-qa=destination-charging-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=charging-tabs]')
    expect(tabs.hasClass('charging__options--destinationCharging')).to.be.true
  })
})
