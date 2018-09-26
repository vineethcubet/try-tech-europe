import {mount} from 'avoriaz'
import LifestyleQuiz from '@/components/charging/LifestyleQuiz'
import store from '@/store'

describe('LifestyleQuiz.vue', () => {
  it("store the user's dwelling type in the store", (done) => {
    store.commit('setDwellingType', 'rock')

    const subject = mount(LifestyleQuiz, {
      store
    })

    const input = subject.first('[data-qa=dwelling-type-apartment]')
    input.trigger('change')
    input.trigger('input')

    subject.vm.$nextTick(() => {
      expect(store.getters.dwellingType).to.equal('apartment')

      done()
    })
  })

  it("store the user's dwelling type in the store", (done) => {
    store.commit('setDwellingType', 'rock')

    const subject = mount(LifestyleQuiz, {
      store
    })

    const input = subject.first('[data-qa=dwelling-type-house]')
    input.trigger('change')
    input.trigger('input')

    subject.vm.$nextTick(() => {
      expect(store.getters.dwellingType).to.equal('house')

      done()
    })
  })

  it("store the user's hours driven per day in the store", (done) => {
    store.commit('setChargingRecommendation', 5)

    const subject = mount(LifestyleQuiz, {
      store
    })

    const dwellingType = subject.vm.$el.querySelector('[data-qa=hoursDrivenPerDay]')
    dwellingType.selectedIndex = 2
    dwellingType.dispatchEvent(new Event('change'))
    dwellingType.dispatchEvent(new Event('input'))

    subject.vm.$nextTick(() => {
      expect(store.getters.chargingRecommendation).to.equal(2)

      done()
    })
  })

  context('the stored hours driven is updated', () => {
    let subject

    beforeEach((done) => {
      subject = mount(LifestyleQuiz, {
        store
      })

      const hoursDrivenPerDay = subject.vm.$el.querySelector('[data-qa=hoursDrivenPerDay]')
      hoursDrivenPerDay.selectedIndex = 2
      hoursDrivenPerDay.dispatchEvent(new Event('change'))
      hoursDrivenPerDay.dispatchEvent(new Event('input'))

      subject.vm.$nextTick(done)
    })

    it('updates the dwelling type field', (done) => {
      store.commit('setChargingRecommendation', 1)

      subject.vm.$nextTick(() => {
        const hoursDrivenPerDay = subject.vm.$el.querySelector('[data-qa=hoursDrivenPerDay]')
        expect(hoursDrivenPerDay.selectedIndex).to.equal(1)

        done()
      })
    })
  })
})
