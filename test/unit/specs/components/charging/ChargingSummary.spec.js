import {shallow} from 'avoriaz'
import Bus from '@/Bus'
import store from '@/store'
import ChargingSummary from '@/components/charging/ChargingSummary'
import ChargingOptions from '@/components/charging/home/ChargingOptions'
import PublicChargingOptions from '@/components/charging/destination/PublicChargingOptions'

describe('ChargingSummary.vue', () => {
  it('prompts user to complete lifestyle quiz if they have not', () => {
    store.commit('setDwellingType', '')
    store.commit('setChargingRecommendation', 0)

    const subject = shallow(ChargingSummary, {
      store
    })

    expect(subject.find('[data-qa=complete-lifestyle-quiz]')[0]).to.exist
  })

  it('does not show the best recommendation affirmation', () => {
    store.commit('setDwellingType', '')
    store.commit('setChargingRecommendation', 0)

    const subject = shallow(ChargingSummary, {
      store
    })

    expect(subject.find('[data-qa=best-option-affirmation]')[0]).to.not.exist
  })

  it('emits an event when the user opts to return to the home section', () => {
    store.commit('setDwellingType', '')
    store.commit('setChargingRecommendation', 0)

    const subject = shallow(ChargingSummary, {
      store
    })

    const callback = sinon.spy()
    Bus.$on('navigate', callback)

    subject.first('[data-qa=return-to-charging-section]').trigger('click')

    sinon.assert.calledOnce(callback)
    sinon.assert.calledWith(callback, 'home')

    Bus.$off('navigate')
  })

  context('the lifestyle quiz is complete', () => {
    let subject

    beforeEach(() => {
      store.commit('setDwellingType', 'house')
      store.commit('setChargingRecommendation', 1)

      subject = shallow(ChargingSummary, {
        store
      })
    })

    it('does not prompt user to complete the quiz', () => {
      expect(subject.find('[data-qa=complete-lifestyle-quiz]')[0]).to.not.exist
    })

    it('shows only home charging', () => {
      expect(subject.find(ChargingOptions)[0]).to.exist
      expect(subject.find(PublicChargingOptions)[0]).to.not.exist
    })

    it('shows public charging when dwelling type is apartment', () => {
      store.commit('setDwellingType', 'apartment')

      subject.update()

      expect(subject.find(PublicChargingOptions)[0]).to.exist
      expect(subject.find(ChargingOptions)[0]).to.not.exist
    })
  })
})
