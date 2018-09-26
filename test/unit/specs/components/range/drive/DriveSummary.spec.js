import {mount} from 'avoriaz'
import Vuex from 'vuex'
import Bus from '@/Bus'
import {structure} from '@/store'
import DriveSummary from '@/components/range/drive/DriveSummary'

describe('DriveSummary.vue', () => {
  let subject

  it('a route does not exist', () => {
    const store = new Vuex.Store(structure)

    store.commit('setRoute', [])

    subject = mount(DriveSummary, {
      store
    })

    expect(subject.find('[data-qa=no-route-exists]')[0]).to.exist
  })

  it('emits an event when the user wants to return to the range section', () => {
    const store = new Vuex.Store(structure)

    subject = mount(DriveSummary, {
      store
    })

    const listener = sinon.spy()
    Bus.$on('navigate', listener)

    subject.first('[data-qa=return-to-range-section]').trigger('click')

    sinon.assert.calledOnce(listener)
    sinon.assert.calledWith(listener, 'map')

    Bus.$off('navigate', listener)
  })

  context('a route has been entered', () => {
    let store

    beforeEach((done) => {
      structure.mutations.setRouteData = (state, data) => {
        state.routeLengthInMiles = data.lengthInMiles
        state.routeDurationInMinutes = data.durationInMinutes
      }

      store = new Vuex.Store(structure)

      store.commit('setRoute', ['over there', 'somewhere'])
      store.commit('setRouteData', {
        durationInMinutes: 234,
        lengthInMiles: 28.324545
      })
      store.commit('setRangeInMiles', 300)
      store.commit('setChargers', [
        {}, {}, {}, {}
      ])

      subject = mount(DriveSummary, {
        store
      })

      subject.vm.$nextTick(done)
    })

    it('does not show no route exists message', () => {
      expect(subject.find('[data-qa=no-route-exists]')[0]).to.not.exist
    })

    it('shows drive distance', () => {
      expect(subject.first('[data-qa=drive-distance-miles]').text()).to.equal('46')
    })

    it('shows drive time', () => {
      expect(subject.first('[data-qa=drive-duration-minutes]').text()).to.equal('234')
    })

    it('shows the number of round trips', () => {
      expect(subject.first('[data-qa=num-round-trips]').text()).to.equal('5')
    })

    it('shows the number of recommended chargers', () => {
      expect(subject.first('[data-qa=num-charging-stations]').text()).to.equal('4')
    })

    context('another route is entered', () => {
      beforeEach((done) => {
        store.commit('setRoute', ['over there', 'here'])
        store.commit('setRouteData', {
          durationInMinutes: 567,
          lengthInMiles: 883.32345
        })
        store.commit('setRangeInMiles', 300)
        store.commit('setChargers', [
          {a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}
        ])

        subject.vm.$nextTick(done)
      })

      context('then it is cleared', () => {
        beforeEach((done) => {
          store.commit('clearRoute')

          subject.vm.$nextTick(done)
        })

        it('does not show no route exists message', () => {
          expect(subject.find('[data-qa=no-route-exists]')[0]).to.not.exist
        })

        it('shows drive distance', () => {
          expect(subject.first('[data-qa=drive-distance-miles]').text()).to.equal('1422')
        })

        it('shows drive time', () => {
          expect(subject.first('[data-qa=drive-duration-minutes]').text()).to.equal('567')
        })

        it('shows the number of round trips', () => {
          expect(subject.first('[data-qa=num-round-trips]').text()).to.equal('0')
        })

        it('shows the number of recommended chargers', () => {
          expect(subject.first('[data-qa=num-charging-stations]').text()).to.equal('5')
        })
      })
    })
  })
})
