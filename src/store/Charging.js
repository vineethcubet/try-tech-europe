import ChargingService from '@/services/ChargingService'

const state = {
  chargers: [],
  chargerPreferences: {
    showChargersNearPoi: '',
    showChargersAtTerminals: true,
    showChargersWithinMiles: 5
  }
}

const actions = {
  loadChargers ({getters, commit}) {
    let loadingChargersPromise

    if (getters.chargerPreferences.showChargersNearPoi !== '') {
      loadingChargersPromise = ChargingService.getChargersNearPOI(getters.currentLocation)
    } else if (getters.routePoints.length === 0) {
      loadingChargersPromise = ChargingService.getNearbyChargers(
        getters.currentLocation,
        getters.chargerPreferences.showChargersWithinMiles
      )
    } else if (getters.chargerPreferences.showChargersAtTerminals) {
      const chargersNearStartPromise = ChargingService.getNearbyChargers(
        getters.routePoints[0],
        getters.chargerPreferences.showChargersWithinMiles
      )

      const chargersNearDestinationPromise = ChargingService.getNearbyChargers(
        getters.routePoints[getters.routePoints.length - 1],
        getters.chargerPreferences.showChargersWithinMiles
      )

      loadingChargersPromise = new Promise((resolve) => {
        Promise.all([chargersNearStartPromise, chargersNearDestinationPromise])
          .then(([chargersNearStart, chargersNearDestination]) => {
            resolve(chargersNearStart.concat(chargersNearDestination))
          })
      })
    } else return

    loadingChargersPromise.then((chargers) => {
      commit('setChargers', chargers)
    })
  },
  updateChargerPreferences ({commit, dispatch}, preferences) {
    commit('setChargerPreferences', preferences)
    dispatch('loadChargers')
  }
}

const mutations = {
  setChargers (state, chargers) {
    state.chargers = chargers
  },
  clearChargers (state) {
    state.chargers = []
  },
  setChargerPreferences (state, preferences) {
    state.chargerPreferences = {
      ...state.chargerPreferences,
      ...preferences
    }
  }
}

const getters = {
  chargers (state) {
    return state.chargers
  },
  chargerPreferences (state) {
    return state.chargerPreferences
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
