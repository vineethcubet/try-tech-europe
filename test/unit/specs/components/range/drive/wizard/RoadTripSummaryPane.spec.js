import {mount} from 'avoriaz'
import Vuex from 'vuex'
import {structure} from '@/store'
import RoadTripSummaryPane from '@/components/range/drive/wizard/RoadTripSummaryPane'

describe('RoadTripSummaryPane.vue', () => {
  let subject
  let store

  beforeEach(() => {
    structure.mutations.setRouteData = (state, {lengthInMiles, durationInMinutes}) => {
      state.routeLengthInMiles = lengthInMiles
      state.routeDurationInMinutes = durationInMinutes
    }

    store = new Vuex.Store(structure)

    store.commit('setRouteData', {
      lengthInMiles: 28.324545,
      durationInMinutes: 234
    })

    store.commit('setRangeInMiles', 300)

    subject = mount(RoadTripSummaryPane, {
      propsData: {
        startingLocation: 'over there',
        finalDestination: 'somewhere'
      },
      store
    })
  })

  it('shows starting location', () => {
    expect(subject.first('[data-qa=starting-location-summary]').text()).to.equal('over there')
  })

  it('shows destination', () => {
    expect(subject.first('[data-qa=destination-summary]').text()).to.equal('somewhere')
  })

  it('shows drive distance', () => {
    expect(subject.first('[data-qa=drive-distance-kilometers]').text()).to.equal('46')
  })

  it('shows drive time', () => {
    expect(subject.first('[data-qa=drive-time-hours]').text()).to.equal('3')
    expect(subject.first('[data-qa=drive-time-minutes]').text()).to.equal('54')
  })

  context('charging information', () => {
    beforeEach((done) => {
      store.commit('setChargers', [
        {
          region: 'a'
        },
        {
          region: 'b'
        },
        {
          region: 'c'
        }
      ])

      subject.vm.$nextTick(done)
    })

    it('tells the user how many stops to charge are necessary', () => {
      const numberOfChargingStops = subject.first('[data-qa=number-of-charging-stops]').text()

      expect(numberOfChargingStops).to.equal('3')
    })

    it('lists the location of each charger', () => {
      const numberOfChargingStops = subject.first('[data-qa=charging-stop-locations]').text()

      expect(numberOfChargingStops).to.equal('a, b and c')
    })

    context('no chargers are available', () => {
      beforeEach((done) => {
        store.commit('setChargers', [])

        subject.vm.$nextTick(done)
      })

      it('a message states no chargers are available', () => {
        expect(subject.find('[data-qa=short-trip-message]')[0]).to.exist
        expect(subject.find('[data-qa=long-trip-message]')[0]).to.not.exist
      })
    })
  })
})
