import {mount} from 'avoriaz'
import store from '@/store'
import Map from '@/services/maps/Map.js'
import Bus from '@/Bus'
import DriveVisualizer from '@/components/range/drive/DriveVisualizer'
import ChargingStationInfo from '@/components/range/drive/ChargingStationInfo'

describe('DriveVisualizer.vue', () => {
  let map
  let chargePoints

  let subject

  const directionsResult = {
    routes: [
      {
        legs: [],
        overview_path: [
          {
            lat: () => 1,
            lng: () => 2
          }
        ]
      }
    ]
  }

  beforeEach(() => {
    map = new Map.Map(null)

    chargePoints = {
      showChargePoints: sinon.spy()
    }

    sinon.stub(Map, 'Map').returns(map)
    sinon.stub(Map, 'ChargePoints').returns(chargePoints)
    sinon.stub(map, 'drawRoute')

    store.commit('setLocation', {
      lat: 2435,
      lng: 456546
    })

    subject = mount(DriveVisualizer, {
      store
    })
  })

  afterEach(() => {
    Map.Map.restore()
    Map.ChargePoints.restore()

    subject.destroy()
  })

  it('it prevents wheel events for propagating', () => {
    const event = new Event('wheel')
    sinon.stub(event, 'stopPropagation')

    subject.vm.$el.querySelector('[data-qa=map-container]').dispatchEvent(event)

    sinon.assert.calledOnce(event.stopPropagation)
  })

  it('should create default map', () => {
    const mapContainer = document.getElementById('map-container')

    sinon.assert.called(Map.Map)
    sinon.assert.calledWith(Map.Map, mapContainer, {
      lat: 2435,
      lng: 456546
    })
  })

  it('should contain charge station information', () => {
    const chargingStationInfoContainer = document.getElementById('charging-station-info')

    sinon.assert.calledOnce(Map.ChargePoints)
    sinon.assert.calledWith(Map.ChargePoints, map, chargingStationInfoContainer, sinon.match.func)
  })

  it('should render direction on the map when there is a non-empty route', (done) => {
    store.commit('setDirectionsResult', directionsResult)

    subject.vm.$nextTick(() => {
      sinon.assert.calledOnce(map.drawRoute)
      sinon.assert.calledWith(map.drawRoute, directionsResult)

      map.drawRoute.restore()

      done()
    }, 50)
  })

  context('resetting the map', () => {
    it('the map is reset when an event is received', () => {
      Bus.$emit('reset:map')

      sinon.assert.calledOnce(map.drawRoute)
      sinon.assert.calledWith(map.drawRoute)
    })
  })

  context('showing charging locations', () => {
    beforeEach(() => {
      subject = mount(DriveVisualizer, {
        store
      })

      store.commit('setChargers', [
        {
          position: {
            lat: 3,
            lng: 4
          },
          chargers: {
            total: 4
          },
          rating: 0
        }
      ])
    })

    afterEach(() => {
      subject.destroy()
    })

    it('shows the chargers when data is loaded for a new route', (done) => {
      subject.vm.$nextTick(() => {
        sinon.assert.calledWith(chargePoints.showChargePoints, [
          {
            position: {
              lat: 3,
              lng: 4
            },
            chargers: {
              total: 4
            },
            rating: 0
          }
        ])

        done()
      })
    })

    context('a station is selected', () => {
      it('passes charging station data to charging station info component', () => {
        subject.vm.$nextTick(() => {
          subject.vm.chargingStationMarkerSelected(0)
          subject.update()

          const chargingStationInfo = subject.first(ChargingStationInfo)

          expect(chargingStationInfo.getProp('station')).to.deep.equal({
            position: {
              lat: 3,
              lng: 4
            },
            chargers: {
              total: 4
            },
            rating: 0
          })
        })
      })
    })
  })

  context('the current location is updated', () => {
    beforeEach((done) => {
      sinon.stub(map, 'markCurrentLocation')
      sinon.stub(map, 'zoomToCurrentLocation')

      store.commit('setLocation', {
        lat: 123,
        lng: 456
      })

      subject.vm.$nextTick(done)
    })

    it('marks the current location on the map', () => {
      sinon.assert.calledOnce(map.markCurrentLocation)
      sinon.assert.calledWith(map.markCurrentLocation, {
        lat: 123,
        lng: 456
      })
    })

    it('zooms to the current location on the map', () => {
      sinon.assert.calledOnce(map.zoomToCurrentLocation)
    })
  })
})
