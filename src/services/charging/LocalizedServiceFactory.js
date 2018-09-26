import NAChargingService from './NAChargingService'
import EUChargingService from './EUChargingService'

export default {
  async getLocalizedService () {
    const localizedServices = {
      NA: NAChargingService,
      EU: EUChargingService
    }

    return localizedServices['EU']
  }
}
