const LOW_TEMPERATURE_INFLUENCE = 0.8
const HIGH_SPEED_INFLUENCE = 0.95
const AIR_CONDITIONING_INFLUENCE = 0.9

const VehicleRange = class {
  constructor (rangeInMiles) {
    this.rangeInMiles = rangeInMiles
  }

  reduceBy (influence) {
    return new VehicleRange(this.rangeInMiles * influence)
  }
}

const ClimateInfluencers = {
  influenceByLowTemperature (vehicleRange) {
    return vehicleRange.reduceBy(LOW_TEMPERATURE_INFLUENCE)
  }
}

const SpeedInfluencers = {
  influenceByHighSpeed (vehicleRange) {
    return vehicleRange.reduceBy(HIGH_SPEED_INFLUENCE)
  }
}

const ComfortInfluencers = {
  influenceByAirConditioning (vehicleRange) {
    return vehicleRange.reduceBy(AIR_CONDITIONING_INFLUENCE)
  }
}

export default {
  VehicleRange,
  ClimateInfluencers,
  SpeedInfluencers,
  ComfortInfluencers
}
