import {ReverseGeocoding} from '../services/LocationService'

const DEFAULT_LOCATION = {
  lat: 50.7753,
  lng: 6.0839
}

const state = {
  location: null,
  geolocation: null,
  geolocationName: ''
}

const actions = {
  setGeolocation ({commit}, coordinates) {
    commit('setGeolocation', coordinates)

    ReverseGeocoding.getReverseGeocodedLocation(coordinates).then((locationName) => {
      commit('setGeolocationName', locationName)
    })
  },
  setLocation ({commit, dispatch}, location) {
    commit('setLocation', location)
    dispatch('loadChargers')
  }
}

const mutations = {
  setLocation (state, coordinates) {
    state.location = coordinates
  },
  setGeolocation (state, coordinates) {
    state.geolocation = coordinates
  },
  setGeolocationName (state, name) {
    state.geolocationName = name
  }
}

const getters = {
  geolocation (state) {
    return state.geolocation
  },
  currentLocation (state) {
    return state.location ? state.location : (state.geolocation ? state.geolocation : DEFAULT_LOCATION)
  },
  geolocationName (state) {
    return state.geolocationName
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
