import RangeCalculator from '@/services/RangeCalculator.js'

describe('RangeCalculator.js', () => {
  it('should calculate reduced range for low temperature', () => {
    const vehicleRange = new RangeCalculator.VehicleRange(300)
    const updatedRange = RangeCalculator.ClimateInfluencers.influenceByLowTemperature(vehicleRange)

    expect(updatedRange.rangeInMiles).to.equal(240)
  })

  it('should calculate reduced range for high speed', () => {
    const vehicleRange = new RangeCalculator.VehicleRange(300)
    const updatedRange = RangeCalculator.SpeedInfluencers.influenceByHighSpeed(vehicleRange)

    expect(updatedRange.rangeInMiles).to.equal(285)
  })

  it('should calculate reduced range for air conditioning', () => {
    const vehicleRange = new RangeCalculator.VehicleRange(300)
    const updatedRange = RangeCalculator.ComfortInfluencers.influenceByAirConditioning(vehicleRange)

    expect(updatedRange.rangeInMiles).to.equal(270)
  })
})
