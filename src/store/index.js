import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import location from './Location'
import charging from './Charging'
import routing from './Routing'
import user from './User'

Vue.use(Vuex)

const structure = {
  state: {
    rangeInMiles: 300,
    maximumRangeInMiles: 300,
    ...location.state,
    ...charging.state,
    ...routing.state,
    ...user.state
  },
  actions: {
    ...location.actions,
    ...charging.actions,
    ...routing.actions,
    ...user.actions
  },
  mutations: {
    setRangeInMiles (state, rangeInMiles) {
      state.rangeInMiles = rangeInMiles
    },
    setMaximumRangeInMiles (state, maximumRangeInMiles) {
      state.maximumRangeInMiles = maximumRangeInMiles
    },
    ...location.mutations,
    ...charging.mutations,
    ...routing.mutations,
    ...user.mutations
  },
  getters: {
    rangeInMiles (state) {
      return state.rangeInMiles
    },
    maximumRangeInMiles (state) {
      return state.maximumRangeInMiles
    },
    ...location.getters,
    ...charging.getters,
    ...routing.getters,
    ...user.getters
  }
}

export {
  structure
}

export default new Vuex.Store({
  ...structure,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: [
        'maximumRangeInMiles', 'introducedToJourney'
      ]
    })
  ]
})
