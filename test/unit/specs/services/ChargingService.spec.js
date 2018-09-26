import {SynchronousPromise} from 'synchronous-promise'
import ChargingService from '@/services/ChargingService'
import LocalizedServiceFactory from '@/services/charging/LocalizedServiceFactory'

describe('ChargingService.js', () => {
  it('should call localized charging service to get nearby chargers', async () => {
    const getNearbyChargers = sinon.spy()

    sinon.stub(LocalizedServiceFactory, 'getLocalizedService').returns(SynchronousPromise.resolve({
      getNearbyChargers
    }))

    await ChargingService.getNearbyChargers(
      {
        lat: 100,
        lng: 200
      }, 10)

    sinon.assert.calledOnce(getNearbyChargers)

    LocalizedServiceFactory.getLocalizedService.restore()
  })

  it('should call localized charging service to get chargers along the route', async () => {
    const getChargersAlongRouteWithinMiles = sinon.spy()

    sinon.stub(LocalizedServiceFactory, 'getLocalizedService').returns(SynchronousPromise.resolve({
      getChargersAlongRouteWithinMiles
    }))

    await ChargingService.getChargersAlongRouteWithinMiles(
      {
        lat: 100,
        lng: 200
      }, 10)

    sinon.assert.calledOnce(getChargersAlongRouteWithinMiles)

    LocalizedServiceFactory.getLocalizedService.restore()
  })

  it('should call localized charging service to get suggested chargers along the route', async () => {
    const getSuggestedChargersAlongRouteWithinMiles = sinon.spy()

    sinon.stub(LocalizedServiceFactory, 'getLocalizedService').returns(SynchronousPromise.resolve({
      getSuggestedChargersAlongRouteWithinMiles
    }))

    await ChargingService.getSuggestedChargersAlongRouteWithinMiles(250,
      {
        lat: 100,
        lng: 200
      }, 10)

    sinon.assert.calledOnce(getSuggestedChargersAlongRouteWithinMiles)

    LocalizedServiceFactory.getLocalizedService.restore()
  })

  it('should call localized charging service to get opinionated along the route', async () => {
    const getSuggestedChargersAlongRouteWithinMiles = sinon.spy()

    sinon.stub(LocalizedServiceFactory, 'getLocalizedService').returns(SynchronousPromise.resolve({
      getSuggestedChargersAlongRouteWithinMiles
    }))

    await ChargingService.getOpinionatedChargersAlongRoute([{
      lat: 100,
      lng: 200
    }])

    sinon.assert.calledOnce(getSuggestedChargersAlongRouteWithinMiles)
    sinon.assert.calledWith(getSuggestedChargersAlongRouteWithinMiles, 250, [{
      lat: 100,
      lng: 200
    }], 25)

    LocalizedServiceFactory.getLocalizedService.restore()
  })
})
