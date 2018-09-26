import {mount} from 'avoriaz'
import ChargingStationInfo from '@/components/range/drive/ChargingStationInfo'
import store from '@/store'

describe('ChargingStationInfo.vue', () => {
  let subject

  beforeEach(() => {
    subject = mount(ChargingStationInfo, {
      store,
      propsData: {
        station: {
          name: 'Charging Station A',
          address: '123 Ford St. Dearborn, MI',
          chargers: {
            total: 12,
            level2: 3,
            dcFast: 9
          },
          status: 'Open',
          distanceFromRouteInMiles: 1234
        }
      }
    })
  })

  context('shows charging station info', () => {
    it('the name as the title', () => {
      const title = subject.first('[data-qa=charging-station-title]')

      expect(title.text()).to.equal('Charging Station A')
    })

    it('the address as the subtitle', () => {
      const subtitle = subject.first('[data-qa=charging-station-subtitle]')

      expect(subtitle.text()).to.equal('123 Ford St. Dearborn, MI')
    })

    context('the chargers available', () => {
      let totalChargers

      beforeEach(() => {
        totalChargers = subject.first('[data-qa=charging-station-totalChargers]')
      })

      it('the sum of all chargers is shown', () => {
        expect(totalChargers.text()).to.equal('12')
      })

      it('itemized totals are the title of the total chargers value', () => {
        expect(totalChargers.getAttribute('title')).to.equal('3 Level 2, 9 DC Fast')
      })
    })

    it('the status', () => {
      const status = subject.first('[data-qa=charging-station-status]')

      expect(status.text()).to.equal('Open')
    })

    it('the distance from route in miles', () => {
      const distanceFromRoute = subject.first('[data-qa=charging-station-distanceFromRouteInMiles]')

      expect(distanceFromRoute.text()).to.equal('1234 miles')
    })
  })
})
