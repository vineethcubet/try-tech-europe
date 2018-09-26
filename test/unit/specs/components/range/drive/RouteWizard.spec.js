import {mount} from 'avoriaz'
import Vuex from 'vuex'
import {default as store, structure} from '@/store'
import ChargingService from '@/services/ChargingService'
import RouteWizard from '@/components/range/drive/RouteWizard'
import RouteSummaryPane from '@/components/range/drive/wizard/CommuteSummaryPane'
import {SynchronousPromise} from 'synchronous-promise'
import Bus from '@/Bus'

describe('RouteWizard.vue', () => {
  let subject
  let localStore

  beforeEach(() => {
    structure.mutations.setRoutePoints = (state, points) => {
      state.routePoints = points
    }
  })

  it('load chargers when current location is updated', (done) => {
    sinon.stub(structure.actions, 'loadChargers')

    localStore = new Vuex.Store(structure)

    subject = mount(RouteWizard, {
      store: localStore
    })

    localStore.commit('setGeolocation', {
      lat: 356,
      lng: 412
    })

    subject.vm.$nextTick(() => {
      sinon.assert.calledOnce(structure.actions.loadChargers)

      structure.actions.loadChargers.restore()

      done()
    })
  })

  context('a full route is discovered', () => {
    beforeEach((done) => {
      localStore = new Vuex.Store(structure)

      subject = mount(RouteWizard, {
        store: localStore
      })

      const discoverRouteOption = subject.first('[data-qa=full-route-option]')
      discoverRouteOption.trigger('click')

      subject.update()

      const startingLocationInput = subject.vm.$el.querySelector(`[data-qa=starting-location-input]`)
      startingLocationInput.value = 'over there'
      startingLocationInput.dispatchEvent(new Event('input'))

      const finalDestinationInput = subject.vm.$el.querySelector(`[data-qa=final-destination-input]`)
      finalDestinationInput.value = 'somewhere'
      finalDestinationInput.dispatchEvent(new Event('input'))

      const commuteCheckbox = subject.vm.$el.querySelector('[data-qa=frequent-trip-checkbox]')
      commuteCheckbox.checked = true
      commuteCheckbox.dispatchEvent(new Event('change'))
      commuteCheckbox.dispatchEvent(new Event('input'))

      subject.first('[data-qa=explore-route-form]').trigger('submit')

      subject.vm.$nextTick(done)
    })

    it('shows the loading pane', () => {
      const destinationPane = subject.find('[data-qa=loading-pane]')[0]
      expect(destinationPane).to.exist
    })

    context('the chargers are loaded', () => {
      beforeEach((done) => {
        localStore.commit('setChargers', [{}, {}])

        subject.vm.$nextTick(done)
      })

      it('shows the summary pane', () => {
        const destinationPane = subject.find('[data-qa=destination-pane]')[0]
        expect(destinationPane).to.not.exist

        const summaryPane = subject.find('[data-qa=commute-summary-pane]')[0]
        expect(summaryPane).to.exist
      })

      it('supplies the starting location to the summary pane', () => {
        const summaryPane = subject.first(RouteSummaryPane)

        expect(summaryPane.getProp('startingLocation')).to.equal('over there')
      })

      it('supplied the final destination to the summary pane', () => {
        const summaryPane = subject.first(RouteSummaryPane)

        expect(summaryPane.getProp('finalDestination')).to.equal('somewhere')
      })

      it('updates the charger preferences', () => {
        expect(store.getters.chargerPreferences.showChargersAtTerminals).to.be.true
      })

      context('the computed route loads', () => {
        beforeEach((done) => {
          sinon.stub(ChargingService, 'getSuggestedChargersAlongRouteWithinMiles')

          localStore.commit('setRoutePoints', ['first', 'second'])

          subject.vm.$nextTick(done)
        })

        afterEach(() => {
          ChargingService.getSuggestedChargersAlongRouteWithinMiles.restore()
        })

        it('does not load chargers', () => {
          sinon.assert.notCalled(ChargingService.getSuggestedChargersAlongRouteWithinMiles)
        })
      })
    })
  })

  context('the route is validated and submitted', () => {
    beforeEach((done) => {
      sinon.stub(structure.actions, 'updateRoute')
      sinon.stub(structure.actions, 'insertChargers')
      sinon.stub(structure.mutations, 'setLocation')

      localStore = new Vuex.Store(structure)

      subject = mount(RouteWizard, {
        store: localStore
      })

      localStore.commit('setChargerPreferences', {
        showChargersAtTerminals: true
      })

      const discoverRouteOption = subject.first('[data-qa=full-route-option]')
      discoverRouteOption.trigger('click')

      subject.update()

      const startingLocationInput = subject.vm.$el.querySelector(`[data-qa=starting-location-input]`)
      startingLocationInput.value = 'Omaha, NE'
      startingLocationInput.dispatchEvent(new Event('input'))

      const finalDestinationInput = subject.vm.$el.querySelector(`[data-qa=final-destination-input]`)
      finalDestinationInput.value = 'Bend, OR'
      finalDestinationInput.dispatchEvent(new Event('input'))

      const commuteCheckbox = subject.vm.$el.querySelector('[data-qa=frequent-trip-checkbox]')
      commuteCheckbox.checked = false
      commuteCheckbox.dispatchEvent(new Event('change'))
      commuteCheckbox.dispatchEvent(new Event('input'))

      subject.first('[data-qa=explore-route-form]').trigger('submit')

      localStore.commit('setChargers', [{}, {}])

      subject.vm.$nextTick(done)
    })

    afterEach(() => {
      structure.actions.updateRoute.restore()
      structure.actions.insertChargers.restore()
      structure.mutations.setLocation.restore()

      subject.destroy()
    })

    it('then submitted to the store', () => {
      sinon.assert.calledOnce(structure.actions.updateRoute)
      sinon.assert.calledWith(structure.actions.updateRoute, sinon.match.object, [
        'Omaha, NE',
        'Bend, OR'
      ])
    })

    it('updates the charger preferences', () => {
      expect(localStore.getters.chargerPreferences.showChargersAtTerminals).to.be.false
    })

    context('the computed route loads', () => {
      beforeEach((done) => {
        sinon.stub(ChargingService, 'getOpinionatedChargersAlongRoute').returns(SynchronousPromise.resolve([
          {
            address: 'address of charge point'
          }
        ]))

        localStore.commit('setRoutePoints', ['first', 'second'])

        subject.vm.$nextTick(done)
      })

      afterEach(() => {
        ChargingService.getOpinionatedChargersAlongRoute.restore()
      })

      it('retrieves suggested chargers', () => {
        sinon.assert.calledOnce(ChargingService.getOpinionatedChargersAlongRoute)
        sinon.assert.calledWith(ChargingService.getOpinionatedChargersAlongRoute, ['first', 'second'])
      })

      it('inserts the loaded chargers into the route', () => {
        sinon.assert.calledOnce(structure.actions.insertChargers)
        sinon.assert.calledWith(structure.actions.insertChargers, sinon.match.object, [
          'address of charge point'
        ])
      })

      it('sets the chargers to the store', () => {
        expect(localStore.getters.chargers).to.deep.equal([
          {
            address: 'address of charge point'
          }
        ])
      })

      context('the route is updated with the chargers', () => {
        beforeEach((done) => {
          ChargingService.getOpinionatedChargersAlongRoute.resetHistory()

          localStore.commit('setRoutePoints', ['first', 'chargers', 'second'])

          subject.vm.$nextTick(done)
        })

        it('does not load chargers again', () => {
          sinon.assert.notCalled(ChargingService.getOpinionatedChargersAlongRoute)
        })
      })
    })

    context('the route is cleared', () => {
      it('unsets the location', () => {
        subject.first('[data-qa=explore-new-route-button]').trigger('click')

        sinon.assert.calledOnce(structure.mutations.setLocation)
        sinon.assert.calledWith(structure.mutations.setLocation, sinon.match.object, null)
      })
    })
  })

  context('a route is submitted from the mysterious beyond', () => {
    beforeEach((done) => {
      sinon.stub(structure.actions, 'updateRoute')
      sinon.stub(structure.mutations, 'setChargerPreferences')

      localStore = new Vuex.Store(structure)

      subject = mount(RouteWizard, {
        store: localStore
      })

      const discoverRouteOption = subject.first('[data-qa=full-route-option]')
      discoverRouteOption.trigger('click')

      subject.update()

      const startingLocationInput = subject.vm.$el.querySelector(`[data-qa=starting-location-input]`)
      startingLocationInput.value = 'Omaha, NE'
      startingLocationInput.dispatchEvent(new Event('input'))

      const finalDestinationInput = subject.vm.$el.querySelector(`[data-qa=final-destination-input]`)
      finalDestinationInput.value = 'Bend, OR'
      finalDestinationInput.dispatchEvent(new Event('input'))

      const commuteCheckbox = subject.vm.$el.querySelector('[data-qa=frequent-trip-checkbox]')
      commuteCheckbox.checked = true
      commuteCheckbox.dispatchEvent(new Event('change'))
      commuteCheckbox.dispatchEvent(new Event('input'))

      subject.first('[data-qa=explore-route-form]').trigger('submit')

      subject.vm.$nextTick(done)
    })

    afterEach(() => {
      structure.actions.updateRoute.restore()
      structure.mutations.setChargerPreferences.restore()
    })

    it('puts the route in the store', (done) => {
      Bus.$emit('route:trip', ['Start', 'Finish'])

      subject.vm.$nextTick(() => {
        sinon.assert.calledTwice(structure.actions.updateRoute)
        sinon.assert.calledWith(structure.actions.updateRoute, sinon.match.object, ['Start', 'Finish'])

        done()
      })
    })

    it('should set the charger preferences', (done) => {
      Bus.$emit('route:trip', ['Start', 'Finish'])

      subject.vm.$nextTick(() => {
        sinon.assert.calledTwice(structure.mutations.setChargerPreferences)
        sinon.assert.calledWith(structure.mutations.setChargerPreferences, sinon.match.object, {
          showChargersAtTerminals: false
        })

        done()
      })
    })
  })
})
