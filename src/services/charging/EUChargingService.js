import axios from 'axios'
import ChargingUtility from '@/services/charging/ChargingUtility'

const BASE_URL = process.env.openCharge.API_ENDPOINT
const params = {
  output: 'json',
  maxResults: 10000,
  compact: true,
  verbose: false
}

const getChargers = (chargingPoint) => {
  let dcFast = 0
  let level2 = 0
  chargingPoint.Connections.map((chargeConnections) => {
    if (chargeConnections.LevelID === 3) {
      dcFast = dcFast + chargeConnections.Quantity
    }
    if (chargeConnections.LevelID === 2) {
      level2 = level2 + chargeConnections.Quantity
    }
  })
  return {dcFast, level2}
}

const extractChargingStationInfo = (addressInfo, chargers, chargingPoint) => {
  return {
    name: addressInfo.Title,
    position: {
      lat: addressInfo.Latitude,
      lng: addressInfo.Longitude
    },
    address: `${addressInfo.AddressLine1}, ${addressInfo.Town}, ${addressInfo.StateOrProvince}, ${addressInfo.Postcode}`,
    region: `${addressInfo.Town}`,
    rating: (addressInfo.Title.length % 5) + 1,
    distanceFromRouteInMiles: 0,
    status: 'open',
    chargers: {
      level2: chargers.level2,
      dcFast: chargers.dcFast,
      total: chargers.level2 + chargers.dcFast
    },
    cost: chargingPoint.UsageCost !== null || chargingPoint.UsageCost !== '' ? chargingPoint.UsageCost : 'Yes'
  }
}

export default {

  async getChargingStations () {
    let chargingStations

    await axios.get(BASE_URL, {params})
      .then((response) => {
        chargingStations = response.data.map((chargingPoint) => {
          return extractChargingStationInfo(chargingPoint.AddressInfo, getChargers(chargingPoint), chargingPoint)
        })
      })

    return chargingStations
  },

  async getNearbyChargers (location, withinMiles) {
    const allChargers = await this.getChargingStations()

    return withinMiles === 100 ? allChargers : ChargingUtility.getChargingStationsWithinMiles(allChargers, location, withinMiles)
  },

  async getChargersAlongRouteWithinMiles (routePoints, withinMiles) {
    const allChargers = await this.getChargingStations()

    const chargersAlongRoute = routePoints.map((routePoint) => {
      return ChargingUtility.getChargingStationsWithinMiles(allChargers,
        {
          lat: routePoint.lat,
          lng: routePoint.lng
        }, withinMiles)
    })

    const flatArrayOfChargers = chargersAlongRoute.reduce((acc, chargers) => acc.concat(chargers), [])
    const setOfUniqueChargers = flatArrayOfChargers.reduce((set, more) => set.add(more), new Set())
    const arrayOfUniqueChargers = Array.from(setOfUniqueChargers)
    return arrayOfUniqueChargers
  },

  async getSuggestedChargersAlongRouteWithinMiles (suggestEveryNumberOfMiles, routePoints, withinMiles) {
    const subRoutes = ChargingUtility.getSubRoutes(routePoints, suggestEveryNumberOfMiles)

    const getChargersPromises = subRoutes.map((subRoute) => {
      return this.getChargersAlongRouteWithinMiles(subRoute, withinMiles)
    })

    const values = await Promise.all(getChargersPromises)

    return values.reduce((accumulator, chargers) => {
      if (chargers.length > 0) accumulator.push(chargers[0])

      return accumulator
    }, [])
  }
}
