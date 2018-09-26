import axios from 'axios'
import ChargingUtility from './ChargingUtility'

const generateRoute = (routePoints) => {
  const route = routePoints.map(point => `${point.lng} ${point.lat}`).join(', ')
  return `LINESTRING(${route})`
}

const generateEndpoint = (service) => {
  return `${process.env.nrel.API_ENDPOINT}${service}.json?api_key=${process.env.nrel.API_KEY}`
}

const generateQueryString = (requestParams) => {
  return Object.keys(requestParams).map((key) => `${key}=${requestParams[key]}`).join('&')
}

const statusMap = new Map()
statusMap.set('P', 'Planned')
statusMap.set('E', 'Open')
statusMap.set('T', 'Temporarily unavailable')

const extractChargePointData = (nrelResponse) => {
  return nrelResponse.data.fuel_stations
    .filter((point) => {
      return point.ev_network !== 'Tesla'
    }).sort((currentStation, compareToStation) => {
      if (currentStation.distance === compareToStation.distance) return 0
      return currentStation.distance > compareToStation.distance ? 1 : -1
    }).map((point) => {
      const level2 = point.ev_level2_evse_num !== null ? point.ev_level2_evse_num : 0
      const dcFast = point.ev_dc_fast_num !== null ? point.ev_dc_fast_num : 0

      return {
        name: point.station_name,
        address: `${point.street_address} ${point.city}, ${point.state} ${point.zip}`,
        region: `${point.city}, ${point.state}`,
        position: {
          lat: point.latitude,
          lng: point.longitude
        },
        chargers: {
          level2,
          dcFast,
          total: level2 + dcFast
        },
        distanceFromRouteInMiles: parseFloat(point.distance.toFixed(2)),
        status: statusMap.get(point.status_code),
        rating: (point.station_name.length % 5) + 1,
        cost: 'Yes'
      }
    })
}

export default {
  async getNearbyChargers (location, withinMiles) {
    const requestParams = {
      'format': 'JSON',
      'fuel_type': 'ELEC',
      'radius': withinMiles,
      'latitude': location.lat,
      'longitude': location.lng,
      'access': 'public'
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const result = await axios.get(
      generateEndpoint('nearest') + '&' + generateQueryString(requestParams),
      {headers}
    )

    return extractChargePointData(result)
  },

  async getChargersAlongRouteWithinMiles (routePoints, withinMiles) {
    const route = generateRoute(routePoints)

    const requestParams = {
      'format': 'JSON',
      'fuel_type': 'ELEC',
      'distance': withinMiles,
      'access': 'public',
      route
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const result = await axios.post(
      generateEndpoint('nearby-route'),
      generateQueryString(requestParams),
      {headers}
    )

    return extractChargePointData(result)
  },

  async getSuggestedChargersAlongRouteWithinMiles (suggestEveryNumberOfMiles, routePoints, withinMiles) {
    const subRoute = ChargingUtility.getSubRoutes(routePoints, suggestEveryNumberOfMiles)
    const promises = subRoute.map((chargeRoute) => {
      return this.getChargersAlongRouteWithinMiles(chargeRoute, withinMiles)
    })

    const values = await Promise.all(promises)

    return values.reduce((accumulator, chargers) => {
      if (chargers.length > 0) accumulator.push(chargers[0])

      return accumulator
    }, [])
  }
}
