import ChargingUtility from '@/services/charging/ChargingUtility'
import Units from '@/services/Units'

describe('ChargingUtility.js', () => {
  it('should return chargers within given miles', () => {
    const chargers = [
      {
        position: {
          lat: 0.05,
          lng: 0.05
        }
      },
      {
        position: {
          lat: 0.03,
          lng: 0.03
        }
      },
      {
        position: {
          lat: 1,
          lng: 1
        }
      }
    ]

    const filteredChargers = [
      {
        position: {
          lat: 0.05,
          lng: 0.05
        }
      },
      {
        position: {
          lat: 0.03,
          lng: 0.03
        }
      }
    ]

    const result = ChargingUtility.getChargingStationsWithinMiles(chargers, {
      lat: 0,
      lng: 0
    }, 5)

    expect(result).to.deep.equal(filteredChargers)
  })

  it('should return sub routes for every given interval', () => {
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

    const result = ChargingUtility.getSubRoutes(routePoints, 150)

    const expectedsubRoutes = [
      [
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
        }
      ],
      [
        {
          lat: 300 * oneMile,
          lng: 0
        },
        {
          lat: 300 * oneMile,
          lng: 0
        }
      ]
    ]

    expect(result.length).equals(2)
    expect(result).to.deep.equal(expectedsubRoutes)
  })
})
