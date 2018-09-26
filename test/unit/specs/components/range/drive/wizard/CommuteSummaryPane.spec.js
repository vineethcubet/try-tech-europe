import {mount} from 'avoriaz'
import Vuex from 'vuex'
import {structure} from '@/store'
import CommuteSummaryPane from '@/components/range/drive/wizard/CommuteSummaryPane'

describe('CommuteSummaryPane.vue', () => {
  let subject

  beforeEach(() => {
    structure.mutations.setRouteData = (state, {lengthInMiles, durationInMinutes}) => {
      state.routeLengthInMiles = lengthInMiles
      state.routeDurationInMinutes = durationInMinutes
    }

    const store = new Vuex.Store(structure)

    store.commit('setRouteData', {
      lengthInMiles: 28.324545,
      durationInMinutes: 234
    })

    store.commit('setChargers', [
      {}, {}, {}, {}
    ])

    store.commit('setRangeInMiles', 300)

    subject = mount(CommuteSummaryPane, {
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

  it('shows round trips', () => {
    expect(subject.first('[data-qa=number-of-round-trips]').text()).to.equal('5')
  })

  it('shows savings over an ice', () => {
    expect(subject.first('[data-qa=savings-over-ice]').text()).to.equal('2')
  })

  it('shows drive distance', () => {
    expect(subject.first('[data-qa=drive-distance-miles]').text()).to.equal('46')
  })

  it('shows drive time', () => {
    expect(subject.first('[data-qa=drive-time-hours]').text()).to.equal('3')
    expect(subject.first('[data-qa=drive-time-minutes]').text()).to.equal('54')
  })

  it('shows the number of recommended chargers', () => {
    expect(subject.first('[data-qa=num-charging-stations]').text()).to.equal('4')
  })
})
