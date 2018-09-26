import Vuex from 'vuex'
import {mount} from 'avoriaz'
import App from '@/App'
import {structure} from '@/store'
import router from '@/router'

describe('App.vue', () => {
  it('should set the geolocation to store', () => {
    sinon.stub(navigator.geolocation, 'getCurrentPosition')
    sinon.stub(structure.actions, 'setGeolocation')

    const store = new Vuex.Store(structure)

    mount(App, {
      store,
      router
    })

    sinon.assert.calledOnce(navigator.geolocation.getCurrentPosition)
    sinon.assert.calledWith(navigator.geolocation.getCurrentPosition, sinon.match.func)

    const getCurrentPositionCallback = navigator.geolocation.getCurrentPosition.getCall(0).args[0]

    getCurrentPositionCallback({
      coords: {
        latitude: 1,
        longitude: 2
      }
    })

    sinon.assert.calledOnce(structure.actions.setGeolocation)
    sinon.assert.calledWith(structure.actions.setGeolocation, sinon.match.object, {
      lat: 1,
      lng: 2
    })

    navigator.geolocation.getCurrentPosition.restore()
    structure.actions.setGeolocation.restore()
  })
})
