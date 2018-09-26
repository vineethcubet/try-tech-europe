import Vue from 'vue'
import {mount} from 'avoriaz'
import ChargingPreferences from '@/components/range/drive/ChargingPreferences'
import store from '@/store'

describe('ChargingPreferences.vue', () => {
  context('showing chargers within miles', () => {
    let subject

    beforeEach((done) => {
      store.commit('setChargerPreferences', {
        showChargersWithinMiles: 5
      })

      subject = mount(ChargingPreferences, {
        store
      })

      Vue.nextTick(done)
    })

    it('assumes the stored value', () => {
      const withinMilesSelect = subject.vm.$el.querySelector('[data-qa=chargers-within-miles]')
      expect(withinMilesSelect.value).to.equal('5')
    })

    context('the stored chargers within miles changes', () => {
      beforeEach((done) => {
        store.commit('setChargerPreferences', {
          showChargersWithinMiles: 0
        })

        Vue.nextTick(done)
      })

      it('changes to the stored value', () => {
        const withinMilesSelect = subject.vm.$el.querySelector('[data-qa=chargers-within-miles]')
        expect(withinMilesSelect.value).to.equal('0')
      })
    })
  })
})
