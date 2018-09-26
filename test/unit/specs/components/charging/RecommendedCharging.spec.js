import {mount} from 'avoriaz'
import store from '@/store'
import RecommendedCharging from '@/components/charging/RecommendedCharging'

describe('RecommendedCharging.vue', () => {
  it('faster charging is recommended', () => {
    store.commit('setDwellingType', 'house')
    store.commit('setChargingRecommendation', 3)

    const subject = mount(RecommendedCharging, {
      store
    })

    expect(subject.hasClass('recommendedCharging--high')).to.be.true
  })

  it('fast charging is recommended', () => {
    store.commit('setDwellingType', 'house')
    store.commit('setChargingRecommendation', 2)

    const subject = mount(RecommendedCharging, {
      store
    })

    expect(subject.hasClass('recommendedCharging--medium')).to.be.true
  })

  it('basic charging is recommended', () => {
    store.commit('setDwellingType', 'house')
    store.commit('setChargingRecommendation', 1)

    const subject = mount(RecommendedCharging, {
      store
    })

    expect(subject.hasClass('recommendedCharging--low')).to.be.true
  })
})
