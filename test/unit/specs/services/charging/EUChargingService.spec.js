import EUChargingService from '@/services/charging/EUChargingService'
import axios from 'axios'
import {SynchronousPromise} from 'synchronous-promise'
import ChargingUtility from '@/services/charging/ChargingUtility'

describe('EUChargingService', () => {
  const openChargeResponseFixture = {
    data: [
      {
        UsageCost: '2.5 for KWh',
        AddressInfo: {
          Title: 'Charging Station1',
          AddressLine1: '123 Street',
          Town: 'Bucharest',
          StateOrProvince: 'Poland',
          Postcode: 'WER-123',
          Latitude: 100,
          Longitude: 200
        },
        Connections: [
          {
            LevelID: 3,
            Quantity: 2
          },
          {
            LevelID: 2,
            Quantity: 4
          }
        ]
      }
    ]
  }

  const chargingStationsAlongRoute = [
    {
      lat: 1,
      lng: 2
    },
    {
      lat: 3,
      lng: 4
    }
  ]

  const someOtherChargingStationsAlongRoute = [
    {
      lat: 9,
      lng: 8
    },
    {
      lat: 7,
      lng: 6
    }
  ]

  const chargingStations = [
    {
      name: 'Charging Station1',
      position: {
        lat: 100,
        lng: 200
      },
      address: '123 Street, Bucharest, Poland, WER-123',
      region: 'Bucharest',
      rating: 3,
      distanceFromRouteInMiles: 0,
      status: 'open',
      chargers: {
        level2: 4,
        dcFast: 2,
        total: 6
      },
      cost: '2.5 for KWh'
    }
  ]

  beforeEach(() => {
    sinon.stub(axios, 'get').returns(SynchronousPromise.resolve(openChargeResponseFixture))
    sinon.stub(ChargingUtility, 'getSubRoutes').returns([
      [
        {
          lat: 12,
          lng: 13
        }
      ],

      [
        {
          lat: 14,
          lng: 15
        }
      ]
    ])
    sinon.stub(ChargingUtility, 'getChargingStationsWithinMiles')
      .onCall(0).returns(chargingStationsAlongRoute)
      .onCall(1).returns(someOtherChargingStationsAlongRoute)
      .onCall(2).returns(chargingStationsAlongRoute)
      .onCall(3).returns(someOtherChargingStationsAlongRoute)
  })

  afterEach(() => {
    axios.get.restore()
    ChargingUtility.getChargingStationsWithinMiles.restore()
    ChargingUtility.getSubRoutes.restore()
  })

  it('should call open charge api', async () => {
    await EUChargingService.getChargingStations()

    const params = {
      output: 'json',
      maxResults: 10000,
      compact: true,
      verbose: false
    }

    sinon.assert.calledOnce(axios.get)
    sinon.assert.calledWith(axios.get, 'http://localhost:7673', {
      params
    })
  })

  it('should return charging stations information', async () => {
    const result = await EUChargingService.getChargingStations()

    expect(result).to.deep.equal(chargingStations)
  })

  context('get near by chargers', () => {
    it('should call charging utility ', async () => {
      await EUChargingService.getNearbyChargers({
        lat: 10,
        lng: 20
      }, 5)

      sinon.assert.calledOnce(ChargingUtility.getChargingStationsWithinMiles)
      sinon.assert.calledWith(ChargingUtility.getChargingStationsWithinMiles, chargingStations,
        {
          lat: 10,
          lng: 20
        }, 5)
    })
  })

  context('get chargers along the route', () => {
    it('should call charging utility ', async () => {
      await EUChargingService.getChargersAlongRouteWithinMiles(
        [
          {
            lat: 10,
            lng: 20
          },
          {
            lat: 30,
            lng: 40
          }
        ], 5)

      sinon.assert.calledTwice(ChargingUtility.getChargingStationsWithinMiles)
      sinon.assert.calledWith(ChargingUtility.getChargingStationsWithinMiles, chargingStations,
        {
          lat: 10,
          lng: 20
        }, 5)
      sinon.assert.calledWith(ChargingUtility.getChargingStationsWithinMiles, chargingStations,
        {
          lat: 30,
          lng: 40
        }, 5)
    })

    it('should return chargers along the route', async () => {
      const result = await EUChargingService.getChargersAlongRouteWithinMiles(
        [
          {
            lat: 10,
            lng: 20
          },
          {
            lat: 30,
            lng: 40
          }
        ], 5)

      const chargersAlongRoute = [
        {
          lat: 1,
          lng: 2
        },
        {
          lat: 3,
          lng: 4
        },
        {
          lat: 9,
          lng: 8
        },
        {
          lat: 7,
          lng: 6
        }
      ]

      expect(result).to.deep.equal(chargersAlongRoute)
    })
  })

  context('get suggested chargers along the route', () => {
    it('should call charging utility to get sub routes', () => {
      EUChargingService.getSuggestedChargersAlongRouteWithinMiles(250, [
        {
          lat: 10,
          lng: 20
        },
        {
          lat: 30,
          lng: 40
        }
      ], 5)

      sinon.assert.calledOnce(ChargingUtility.getSubRoutes)
    })

    it('should suggest chargers for given subRoute ', async () => {
      const result = await EUChargingService.getSuggestedChargersAlongRouteWithinMiles(250, [
        {
          lat: 10,
          lng: 20
        }
      ], 5)

      const suggestedChargers = [
        {
          lat: 1,
          lng: 2
        },
        {
          lat: 9,
          lng: 8
        }
      ]

      expect(result).to.deep.equal(suggestedChargers)
    })
  })
})
