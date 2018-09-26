import Vuex from 'vuex'
import {SynchronousPromise} from 'synchronous-promise'
import {structure} from '@/store'
import ChargingService from '@/services/ChargingService'

describe('Charging.js', () => {
  let subject

  context('loading chargers', () => {
    beforeEach(() => {
      structure.mutations.setRoutePoints = (state, points) => {
        state.routePoints = points
      }

      sinon.stub(structure.mutations, 'setChargers')

      subject = new Vuex.Store(structure)

      subject.commit('setChargers', [
        {
          name: 'DummyCharger'
        }
      ])
    })

    afterEach(() => {
      structure.mutations.setChargers.restore()
    })

    context('near route terminals', () => {
      beforeEach(() => {
        sinon.stub(ChargingService, 'getNearbyChargers')

        ChargingService.getNearbyChargers
          .onCall(0).returns(SynchronousPromise.resolve([
            {
              name: 'Start'
            }
          ]))
          .onCall(1).returns(SynchronousPromise.resolve([
            {
              name: 'Destination'
            }
          ]))

        subject.commit('setChargerPreferences', {
          showChargersNearPoi: '',
          showChargersAtTerminals: true,
          showChargersWithinMiles: 12
        })

        subject.commit('setRoutePoints', [
          {
            lat: 1,
            lng: 2
          },
          {
            lat: 3,
            lng: 4
          },
          {
            lat: 5,
            lng: 6
          }
        ])

        subject.dispatch('loadChargers')
      })

      afterEach(() => {
        ChargingService.getNearbyChargers.restore()
      })

      it('loads chargers near the route start and destination', () => {
        sinon.assert.calledTwice(ChargingService.getNearbyChargers)

        sinon.assert.calledWith(ChargingService.getNearbyChargers, {
          lat: 1,
          lng: 2
        }, 12)

        sinon.assert.calledWith(ChargingService.getNearbyChargers, {
          lat: 5,
          lng: 6
        }, 12)
      })

      it('stores the chargers near the start and destination', (done) => {
        setTimeout(() => {
          sinon.assert.calledWith(structure.mutations.setChargers, sinon.match.object, [
            {
              name: 'Start'
            },
            {
              name: 'Destination'
            }
          ])

          done()
        }, 100)
      })
    })

    context('nearby chargers', () => {
      beforeEach(() => {
        sinon.stub(ChargingService, 'getNearbyChargers')

        ChargingService.getNearbyChargers.returns(SynchronousPromise.resolve([
          {
            name: 'Alpha'
          },
          {
            name: 'Beta'
          }
        ]))

        subject.commit('setChargerPreferences', {
          showChargersAtTerminals: true,
          showChargersWithinMiles: 18
        })

        subject.commit('setRoutePoints', [])
        subject.commit('setLocation', {
          lat: 1.2,
          lng: 3.4
        })

        subject.dispatch('loadChargers')
      })

      afterEach(() => {
        ChargingService.getNearbyChargers.restore()
      })

      it('calls the charging service', () => {
        sinon.assert.calledOnce(ChargingService.getNearbyChargers)
        sinon.assert.calledWith(ChargingService.getNearbyChargers, {
          lat: 1.2,
          lng: 3.4
        }, 18)
      })

      it('stores the list of chargers', () => {
        sinon.assert.calledWith(structure.mutations.setChargers, sinon.match.object, [
          {
            name: 'Alpha'
          },
          {
            name: 'Beta'
          }
        ])
      })
    })

    context('point of interests', () => {
      it('should call charging service', () => {
        subject.commit('setChargerPreferences', {
          showChargersNearPoi: 'restaurants',
          showChargersAtTerminals: true,
          showChargersWithinMiles: 25
        })

        subject.commit('setRoutePoints', [])
        subject.commit('setLocation', {
          lat: 1.2,
          lng: 3.4
        })

        sinon.stub(ChargingService, 'getChargersNearPOI').returns(SynchronousPromise.resolve([]))

        subject.dispatch('loadChargers')

        sinon.assert.calledOnce(ChargingService.getChargersNearPOI)
        sinon.assert.calledWith(ChargingService.getChargersNearPOI, {
          lat: 1.2,
          lng: 3.4
        })
      })
    })
  })

  context('charger preferences', () => {
    beforeEach(() => {
      sinon.stub(structure.actions, 'loadChargers')

      subject = new Vuex.Store(structure)

      subject.commit('setChargerPreferences', {
        showChargersNearPoi: '',
        showChargersAtTerminals: true,
        showChargersWithinMiles: 0
      })
    })

    afterEach(() => {
      structure.actions.loadChargers.restore()
    })

    it('does not require all preferences to be set at once', () => {
      subject.commit('setChargerPreferences', {
        showChargersAtTerminals: true
      })

      expect(subject.getters.chargerPreferences).to.have.all.keys(
        'showChargersNearPoi', 'showChargersAtTerminals', 'showChargersWithinMiles'
      )
    })

    it('overrides existing preferences', () => {
      subject.commit('setChargerPreferences', {
        showChargersWithinMiles: 55
      })

      expect(subject.getters.chargerPreferences).to.deep.equal({
        showChargersNearPoi: '',
        showChargersAtTerminals: true,
        showChargersWithinMiles: 55
      })
    })

    context('changing show chargers within miles', () => {
      it('reloads the chargers', () => {
        subject.dispatch('updateChargerPreferences', {
          showChargersWithinMiles: 256
        })

        sinon.assert.calledOnce(structure.actions.loadChargers)

        const context = structure.actions.loadChargers.getCall(0).args[0]

        expect(context.getters.chargerPreferences.showChargersWithinMiles).to.equal(256)
      })
    })
  })
})
