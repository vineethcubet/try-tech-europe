import Vuex from 'vuex'
import {structure} from '@/store'

describe('Routing.js', () => {
  context('the route changes', () => {
    let directionsService
    let subject
    let dispatch

    beforeEach(() => {
      directionsService = new google.maps.DirectionsService()
      sinon.stub(directionsService, 'route')

      sinon.stub(google.maps, 'DirectionsService').returns(directionsService)

      sinon.stub(structure.actions, 'loadChargers')

      subject = new Vuex.Store(structure)

      dispatch = subject.dispatch('updateRoute', ['Start', 'Charger1', 'Charger2', 'Finish'])
    })

    afterEach(() => {
      google.maps.DirectionsService.restore()
      structure.actions.loadChargers.restore()
    })

    it('stores the route', () => {
      expect(subject.getters.route).to.deep.equal(['Start', 'Charger1', 'Charger2', 'Finish'])
    })

    it('request directions from Google', () => {
      sinon.assert.calledOnce(directionsService.route)
      sinon.assert.calledWith(directionsService.route, {
        origin: 'Start',
        waypoints: [
          {
            location: 'Charger1'
          },
          {
            location: 'Charger2'
          }
        ],
        destination: 'Finish',
        travelMode: 'DRIVING'
      }, sinon.match.func)
    })

    context('google responds successfully with directions', () => {
      const googleResponse = {
        routes: [
          {
            legs: [
              {
                distance: {
                  value: 1000
                },
                duration: {
                  value: 60
                }
              },
              {
                distance: {
                  value: 500
                },
                duration: {
                  value: 90
                }
              }
            ],
            overview_path: [
              {
                lat () { return 1 },
                lng () { return 2 }
              }, {
                lat () { return 3 },
                lng () { return 4 }
              }
            ]
          }
        ]
      }

      beforeEach(() => {
        const googleResponseCallback = directionsService.route.getCall(0).args[1]
        googleResponseCallback(googleResponse, 'OK')
      })

      it('commits the route length', () => {
        expect(subject.getters.routeLengthInMiles).to.be.within(0.93, 0.94)
      })

      it('commits the duration', () => {
        expect(subject.getters.routeDurationInMinutes).to.equal(3)
      })

      it('commits the points', () => {
        expect(subject.getters.routePoints).to.deep.equal([
          {
            lat: 1,
            lng: 2
          }, {
            lat: 3,
            lng: 4
          }
        ])
      })

      it('commits the direction result', () => {
        expect(subject.getters.directionsResult).to.deep.equal(googleResponse)
      })

      it('resolves the promise', async () => {
        const status = await dispatch
        expect(status).to.equal('OK')
      })

      it('dispatches action to load chargers', () => {
        sinon.assert.calledOnce(structure.actions.loadChargers)
      })
    })
  })

  context('clearing the route', () => {
    it('clears the chargers', () => {
      sinon.stub(structure.mutations, 'clearChargers')

      const subject = new Vuex.Store(structure)

      subject.dispatch('clearRoute')

      sinon.assert.calledOnce(structure.mutations.clearChargers)

      structure.mutations.clearChargers.restore()
    })

    it('clears the route', () => {
      sinon.stub(structure.mutations, 'clearRoute')

      const subject = new Vuex.Store(structure)

      subject.dispatch('clearRoute')

      sinon.assert.calledOnce(structure.mutations.clearRoute)

      structure.mutations.clearRoute.restore()
    })

    it('loads chargers', () => {
      sinon.stub(structure.actions, 'loadChargers')

      const subject = new Vuex.Store(structure)

      subject.dispatch('clearRoute')

      sinon.assert.calledOnce(structure.actions.loadChargers)

      structure.actions.loadChargers.restore()
    })
  })

  context('inserts charger', () => {
    it('should update route with charger', () => {
      sinon.stub(structure.actions, 'updateRoute')

      const subject = new Vuex.Store(structure)
      subject.commit('setRoute', ['Detroit', 'Corktown'])

      subject.dispatch('insertCharger', 'charging station')

      sinon.assert.calledOnce(structure.actions.updateRoute)
      sinon.assert.calledWith(structure.actions.updateRoute, sinon.match.object, [
        'Detroit',
        'charging station',
        'Corktown'
      ])

      structure.actions.updateRoute.restore()
    })
  })

  context('inserts multiple chargers', () => {
    it('should update route with charger', () => {
      sinon.stub(structure.actions, 'updateRoute')

      const subject = new Vuex.Store(structure)
      subject.commit('setRoute', ['Detroit', 'Corktown'])

      subject.dispatch('insertChargers', ['charging station', 'another station'])

      sinon.assert.calledOnce(structure.actions.updateRoute)
      sinon.assert.calledWith(structure.actions.updateRoute, sinon.match.object, [
        'Detroit',
        'charging station',
        'another station',
        'Corktown'
      ])

      structure.actions.updateRoute.restore()
    })
  })
})
