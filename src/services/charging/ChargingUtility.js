import Units from '@/services/Units'

const calculateDistanceBetweenInDegrees = (first, second) => Math.sqrt(
  Math.pow(first.lat - second.lat, 2) + Math.pow(first.lng - second.lng, 2)
)

export default {
  getChargingStationsWithinMiles (chargingStations, location, withinMiles) {
    const chargersWithinMiles = chargingStations.filter((charger) => {
      const distanceBetweenInDegrees = calculateDistanceBetweenInDegrees(location, charger.position)

      return distanceBetweenInDegrees < withinMiles * Units.DEGREES_PER_MILE
    })

    return chargersWithinMiles
  },

  getSubRoutes (routePoints, suggestEveryNumberOfMiles) {
    let distanceTraveledInDegrees = 0
    let lastPoint = routePoints[0]

    const routePointsEverySuggestedNumberOfMiles = routePoints.filter((routePoint) => {
      distanceTraveledInDegrees += calculateDistanceBetweenInDegrees(lastPoint, routePoint)
      lastPoint = routePoint

      if (distanceTraveledInDegrees >= suggestEveryNumberOfMiles * Units.DEGREES_PER_MILE) {
        distanceTraveledInDegrees = 0
        return true
      }
    })

    const subRoute = routePointsEverySuggestedNumberOfMiles.map((suggestedChargerLocation) => {
      const index = routePoints.indexOf(suggestedChargerLocation)

      let min, max

      for (min = index; min >= 0; min--) {
        if (calculateDistanceBetweenInDegrees(routePoints[min], suggestedChargerLocation) > 10 * Units.DEGREES_PER_MILE) break
      }

      for (max = index; max < routePoints.length; max++) {
        if (calculateDistanceBetweenInDegrees(suggestedChargerLocation, routePoints[max]) > 10 * Units.DEGREES_PER_MILE) break
      }

      min++

      const route = routePoints.slice(min, max)

      if (route.length === 1) route.push(route[0])

      return route
    })

    return subRoute
  }
}
