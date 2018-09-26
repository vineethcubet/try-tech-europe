import LocalizedServiceFactory from './charging/LocalizedServiceFactory'

export default {
  async getNearbyChargers (location, withinMiles) {
    return (await LocalizedServiceFactory.getLocalizedService())
      .getNearbyChargers(location, withinMiles)
  },

  async getChargersAlongRouteWithinMiles (routePoints, withinMiles) {
    return (await LocalizedServiceFactory.getLocalizedService())
      .getChargersAlongRouteWithinMiles(routePoints, withinMiles)
  },

  async getSuggestedChargersAlongRouteWithinMiles (suggestEveryNumberOfMiles, routePoints, withinMiles) {
    return (await LocalizedServiceFactory.getLocalizedService())
      .getSuggestedChargersAlongRouteWithinMiles(suggestEveryNumberOfMiles, routePoints, withinMiles)
  },

  async getChargersNearPOI (location) {
    return new Promise(async (resolve) => {
      (await LocalizedServiceFactory.getLocalizedService())
        .getNearbyChargers(location, 25).then((chargers) => {
          resolve(chargers.filter(() => {
            return Math.random() * 100 > 50
          }))
        })
    })
  },

  async getChargersNearPOIAlongRoute (routePoints, withinMiles) {
    const chargersWithinTwentyMiles = await this.getChargersAlongRouteWithinMiles(routePoints, 20)
    return chargersWithinTwentyMiles.filter((charger) => {
      return Math.random() * 100 > 50
    })
  },

  async getOpinionatedChargersAlongRoute (routePoints) {
    return (await LocalizedServiceFactory.getLocalizedService())
      .getSuggestedChargersAlongRouteWithinMiles(250, routePoints, 25)
  }
}
