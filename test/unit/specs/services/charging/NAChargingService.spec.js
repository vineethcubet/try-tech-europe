import ChargingService from '@/services/charging/NAChargingService.js'
import axios from 'axios'
import Units from '@/services/Units'

describe('NAChargingService.js', () => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const nrelResponseFixture = {
    'data': {
      'fuel_stations': [
        {
          latitude: 1,
          longitude: 2,
          station_name: 'DTE',
          street_address: '123 street',
          city: 'Detroit',
          state: 'MI',
          zip: '49100',
          ev_network: 'sample',
          ev_level2_evse_num: 2,
          ev_dc_fast_num: 2,
          distance: 0.5,
          status_code: 'P'
        },
        {
          latitude: 5,
          longitude: 6,
          station_name: 'ChargePoint',
          street_address: '567 street',
          city: 'Dearborn',
          state: 'MI',
          zip: '49300',
          ev_network: 'sample',
          ev_level2_evse_num: 4,
          ev_dc_fast_num: 4,
          distance: 0.747889,
          status_code: 'T'
        },
        {
          latitude: 3,
          longitude: 4,
          station_name: 'Edison',
          street_address: '234 street',
          city: 'Ann Arbor',
          state: 'MI',
          zip: '49200',
          ev_network: 'sample',
          ev_level2_evse_num: 3,
          ev_dc_fast_num: 3,
          distance: 0.6,
          status_code: 'E'
        }
      ]
    }
  }

  const processNrelResponseFixture = [
    {
      name: 'DTE',
      address: '123 street Detroit, MI 49100',
      position: {
        lat: 1,
        lng: 2
      },
      chargers: {
        level2: 2,
        dcFast: 2,
        total: 4
      },
      distanceFromRouteInMiles: 0.5,
      status: 'Planned'
    },
    {
      name: 'Edison',
      address: '234 street Ann Arbor, MI 49200',
      position: {
        lat: 3,
        lng: 4
      },
      chargers: {
        level2: 3,
        dcFast: 3,
        total: 6
      },
      distanceFromRouteInMiles: 0.6,
      status: 'Open'
    },
    {
      name: 'ChargePoint',
      address: '567 street Dearborn, MI 49300',
      position: {
        lat: 5,
        lng: 6
      },
      chargers: {
        level2: 4,
        dcFast: 4,
        total: 8
      },
      distanceFromRouteInMiles: 0.75,
      status: 'Temporarily unavailable'
    }
  ]

  beforeEach(() => {
    sinon.stub(axios, 'post').returns(Promise.resolve(nrelResponseFixture))
    sinon.stub(axios, 'get').returns(Promise.resolve(nrelResponseFixture))
  })

  afterEach(() => {
    axios.post.restore()
    axios.get.restore()
  })

  it('should request the charging point data', () => {
    const newYorkCoordinates = {
      lat: 40.7,
      lng: -74.07
    }

    const chicagoCoordinates = {
      lat: 41.823,
      lng: -87.63
    }

    ChargingService.getChargersAlongRouteWithinMiles([
      newYorkCoordinates,
      chicagoCoordinates
    ], 27)

    sinon.assert.calledOnce(axios.post)
    const chargingAPIBaseUrl = 'http://localhost:8181/nearby-route.json?api_key=Hahahaha'

    sinon.assert.calledWith(
      axios.post,
      chargingAPIBaseUrl,
      'format=JSON&fuel_type=ELEC&distance=27&access=public&route=LINESTRING(-74.07 40.7, -87.63 41.823)',
      {headers}
    )
  })

  it('should return a list of charging points', async () => {
    const chargersAlongRoute = await ChargingService.getChargersAlongRouteWithinMiles([], 1)

    expect(chargersAlongRoute[0]).to.deep.include(processNrelResponseFixture[0])
    expect(chargersAlongRoute[1]).to.deep.include(processNrelResponseFixture[1])
    expect(chargersAlongRoute[2]).to.deep.include(processNrelResponseFixture[2])

    expect(chargersAlongRoute[0]).to.have.property('rating')
    expect(chargersAlongRoute[0].rating).to.be.gte(1)

    expect(chargersAlongRoute[1]).to.have.property('rating')
    expect(chargersAlongRoute[1].rating).to.be.gte(1)

    expect(chargersAlongRoute[2]).to.have.property('rating')
    expect(chargersAlongRoute[2].rating).to.be.gte(1)
  })

  it('should filter out tesla from the returned list of charge points ', async () => {
    axios.post.returns(Promise.resolve({
      'data': {
        'fuel_stations': [
          {
            latitude: 1,
            longitude: 2,
            station_name: 'DTE',
            street_address: '123 street',
            city: 'Detroit',
            state: 'MI',
            zip: '49100',
            ev_network: 'sample',
            ev_level2_evse_num: 2,
            ev_dc_fast_num: 2,
            distance: 0.5,
            status_code: 'P'
          },
          {
            latitude: 3,
            longitude: 4,
            station_name: 'Tesla',
            street_address: '234 street',
            city: 'Ann Arbor',
            state: 'MI',
            zip: '49200',
            ev_network: 'Tesla',
            ev_level2_evse_num: 3,
            ev_dc_fast_num: 3,
            distance: 0.6,
            status_code: 'E'
          },
          {
            latitude: 5,
            longitude: 6,
            station_name: 'ChargePoint',
            street_address: '567 street',
            city: 'Dearborn',
            state: 'MI',
            zip: '49300',
            ev_network: 'sample',
            ev_level2_evse_num: 4,
            ev_dc_fast_num: 4,
            distance: 0.747889,
            status_code: 'T'
          }
        ]
      }
    }))

    const chargersAlongRoute = await ChargingService.getChargersAlongRouteWithinMiles([], 1)
    const chargePoints = [
      {
        name: 'DTE',
        address: '123 street Detroit, MI 49100',
        position: {
          lat: 1,
          lng: 2
        },
        chargers: {
          level2: 2,
          dcFast: 2,
          total: 4
        },
        distanceFromRouteInMiles: 0.5,
        status: 'Planned'
      },
      {
        name: 'ChargePoint',
        address: '567 street Dearborn, MI 49300',
        position: {
          lat: 5,
          lng: 6
        },
        chargers: {
          level2: 4,
          dcFast: 4,
          total: 8
        },
        distanceFromRouteInMiles: 0.75,
        status: 'Temporarily unavailable'
      }
    ]

    expect(chargersAlongRoute[0]).to.deep.include(chargePoints[0])
    expect(chargersAlongRoute[1]).to.deep.include(chargePoints[1])
  })

  context('should suggest chargers', () => {
    const oneMile = Units.DEGREES_PER_MILE

    const routePoints = [
      {
        lat: 0 * oneMile,
        lng: 0
      },
      {
        lat: 75 * oneMile,
        lng: 0
      },
      {
        lat: 145 * oneMile,
        lng: 0
      },
      {
        lat: 150 * oneMile,
        lng: 0
      },
      {
        lat: 155 * oneMile,
        lng: 0
      },
      {
        lat: 225 * oneMile,
        lng: 0
      },
      {
        lat: 250 * oneMile,
        lng: 0
      },
      {
        lat: 275 * oneMile,
        lng: 0
      },
      {
        lat: 300 * oneMile,
        lng: 0
      }
    ]

    beforeEach(() => {
      axios.post
        .onFirstCall()
        .returns(Promise.resolve({
          'data': {
            'fuel_stations': [
              {
                latitude: 1,
                longitude: 2,
                station_name: 'DTE',
                street_address: '123 street',
                city: 'Detroit',
                state: 'MI',
                zip: '49100',
                ev_network: 'sample',
                ev_level2_evse_num: 2,
                ev_dc_fast_num: 2,
                distance: 0.5,
                status_code: 'P'
              },
              {
                latitude: 1,
                longitude: 2,
                station_name: 'Other',
                street_address: '456 street',
                city: 'Dearborn',
                state: 'MI',
                zip: '49100',
                ev_network: 'sample',
                ev_level2_evse_num: 2,
                ev_dc_fast_num: 2,
                distance: 0.5,
                status_code: 'P'
              }
            ]
          }
        }))
        .onSecondCall()
        .returns(Promise.resolve({
          'data': {
            'fuel_stations': []
          }
        }))
    })

    it('requests chargers to be suggested every number of miles', async () => {
      const getCoordinatesForLineString = (index) => {
        return `${routePoints[index].lng} ${routePoints[index].lat}`
      }

      await ChargingService.getSuggestedChargersAlongRouteWithinMiles(150, routePoints, 30)

      sinon.assert.calledTwice(axios.post)
      const chargingAPIBaseUrl = 'http://localhost:8181/nearby-route.json?api_key=Hahahaha'

      sinon.assert.calledWith(
        axios.post,
        chargingAPIBaseUrl,
        'format=JSON&fuel_type=ELEC&distance=30&access=public&route=LINESTRING(' +
        `${getCoordinatesForLineString(2)}, ` +
        `${getCoordinatesForLineString(3)}, ` +
        `${getCoordinatesForLineString(4)})`,
        {headers}
      )

      sinon.assert.calledWith(
        axios.post,
        chargingAPIBaseUrl,
        'format=JSON&fuel_type=ELEC&distance=30&access=public&route=LINESTRING(' +
        `${getCoordinatesForLineString(8)}, ` +
        `${getCoordinatesForLineString(8)})`,
        {headers}
      )
    })

    it('returns the suggested chargers', async () => {
      const chargers = await ChargingService.getSuggestedChargersAlongRouteWithinMiles(150, routePoints, 30)

      const chargePoint = {
        name: 'DTE',
        address: '123 street Detroit, MI 49100',
        region: 'Detroit, MI',
        position: {
          lat: 1,
          lng: 2
        },
        chargers: {
          level2: 2,
          dcFast: 2,
          total: 4
        },
        distanceFromRouteInMiles: 0.5,
        status: 'Planned'
      }

      expect(chargers.length).to.equal(1)
      expect(chargers[0]).to.deep.include(chargePoint)
    })
  })

  context('should load nearby chargers', () => {
    it('calls the service', async () => {
      await ChargingService.getNearbyChargers({
        lat: 1,
        lng: 2
      }, 44)

      const endpointUrl = 'http://localhost:8181/nearest.json?api_key=Hahahaha' +
        '&format=JSON' +
        '&fuel_type=ELEC' +
        '&radius=44' +
        '&latitude=1' +
        '&longitude=2' +
        '&access=public'

      sinon.assert.calledOnce(axios.get)
      sinon.assert.calledWith(axios.get, endpointUrl, {headers})
    })

    it('returns the loaded chargers', async () => {
      const nearbyChargers = await ChargingService.getNearbyChargers({
        lat: 1,
        lng: 2
      }, 44)

      expect(nearbyChargers[0]).to.deep.include(processNrelResponseFixture[0])
      expect(nearbyChargers[1]).to.deep.include(processNrelResponseFixture[1])
      expect(nearbyChargers[2]).to.deep.include(processNrelResponseFixture[2])

      expect(nearbyChargers[0]).to.have.property('rating')
      expect(nearbyChargers[0].rating).to.be.gte(1)

      expect(nearbyChargers[1]).to.have.property('rating')
      expect(nearbyChargers[1].rating).to.be.gte(1)

      expect(nearbyChargers[2]).to.have.property('rating')
      expect(nearbyChargers[2].rating).to.be.gte(1)
    })
  })
})
