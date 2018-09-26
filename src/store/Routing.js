import Units from '@/services/Units'

function extractWaypoints (route) {
  return route.slice(1, route.length - 1).map((location) => {
    return {
      location
    }
  })
}

function calculateRouteLengthInMeters (googleResponse) {
  return googleResponse.routes[0].legs.reduce((routeLengthInMeters, leg) => {
    return routeLengthInMeters + leg.distance.value
  }, 0)
}

function calculateRouteDurationInSeconds (googleResponse) {
  return googleResponse.routes[0].legs.reduce((routeDurationInSeconds, leg) => {
    return routeDurationInSeconds + leg.duration.value
  }, 0)
}

function extractRoutePoints (googleResponse) {
  return googleResponse.routes[0].overview_path.map((point) => {
    return {
      lat: point.lat(),
      lng: point.lng()
    }
  })
}

const state = {
  route: [],
  directionsResult: null,
  routePoints: [],
  routeLengthInMiles: 0,
  routeDurationInMinutes: 0,
  chargersCount: 0
}

const actions = {
  updateRoute ({commit, dispatch}, route) {
    const service = new google.maps.DirectionsService()

    commit('setRoute', route)

    return new Promise((resolve) => {
      service.route({
        origin: route[0],
        waypoints: extractWaypoints(route),
        destination: route[route.length - 1],
        travelMode: 'DRIVING'
      }, (response, status) => {
        commit('setDirectionsResult', response)
        dispatch('loadChargers')
        resolve(status)
      })
    })
  },
  insertCharger ({getters, dispatch}, charger) {
    const route = getters.route
    route.splice(-1, 0, charger)
    dispatch('updateRoute', route)
  },
  insertChargers ({getters, dispatch}, chargers) {
    const route = getters.route
    let routeWithChargers = []

    routeWithChargers.push(route[0])
    routeWithChargers = routeWithChargers.concat(chargers)
    routeWithChargers.push(route[route.length - 1])

    dispatch('updateRoute', routeWithChargers)
  },
  clearRoute ({commit, dispatch}) {
    commit('clearRoute')
    commit('clearChargers')
    dispatch('loadChargers')
  }
}

const mutations = {
  setRoute (state, route) {
    state.route = route
  },
  clearRoute (state) {
    state.route = []
    state.directionsResult = null
    state.routeLengthInMiles = 0
    state.routeDurationInMinutes = 0
    state.routePoints = []
  },
  setDirectionsResult (state, response) {
    state.directionsResult = response
    state.routeLengthInMiles = calculateRouteLengthInMeters(response) / Units.METERS_PER_MILE
    state.routeDurationInMinutes = Math.ceil(calculateRouteDurationInSeconds(response) / Units.SECONDS_PER_MINUTE)
    state.routePoints = extractRoutePoints(response)
  },
  setChargersCount (state, count) {
    state.chargersCount = count
  }
}

const getters = {
  route (state) {
    return state.route
  },
  directionsResult (state) {
    return state.directionsResult
  },
  routePoints (state) {
    return state.routePoints
  },
  routeLengthInMiles (state) {
    return state.routeLengthInMiles
  },
  routeDurationInMinutes (state) {
    return state.routeDurationInMinutes
  },
  chargersCount (state) {
    return state.chargersCount
  }
}

export default {
  state, actions, mutations, getters
}
