const state = {
  dwellingType: '',
  chargingRecommendation: 0,
  interestedInTopics: []
}

const actions = {

}

const mutations = {
  setDwellingType (state, type) {
    state.dwellingType = type
  },
  setChargingRecommendation (state, chargingRecommendation) {
    state.chargingRecommendation = chargingRecommendation
  },
  setInterestedInTopics (state, topics) {
    state.interestedInTopics = topics
  }
}

const getters = {
  dwellingType: (state) => state.dwellingType,
  chargingRecommendation: (state) => state.chargingRecommendation,
  interestedInTopics: (state) => state.interestedInTopics
}

export default {
  state,
  actions,
  mutations,
  getters
}
