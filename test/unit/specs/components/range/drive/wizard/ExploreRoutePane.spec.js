import {mount} from 'avoriaz'
import {SynchronousPromise} from 'synchronous-promise'
import store from '@/store'
import {Geocoding} from '@/services/LocationService'
import ExploreRoutePane from '@/components/range/drive/wizard/ExploreRoutePane'
import AutocompleteAddress from '@/components/input/AutocompleteAddress'

describe('ExploreRoutePane.vue', () => {
  let subject

  const configureTest = (startingLocationValue, finalDestinationValue) => {
    const startingLocationInput = subject.vm.$el.querySelector(`[data-qa=starting-location-input]`)
    startingLocationInput.value = startingLocationValue
    startingLocationInput.dispatchEvent(new Event('input'))

    const finalDestinationPane = subject.vm.$el.querySelector(`[data-qa=final-destination-input]`)
    finalDestinationPane.value = finalDestinationValue
    finalDestinationPane.dispatchEvent(new Event('input'))
  }

  beforeEach(() => {
    subject = mount(ExploreRoutePane, {
      store
    })
  })

  it('does not enable the route it button', () => {
    expect(subject.first('[data-qa=route-it-button]').hasClass('routeWizard__continue--active')).to.be.false
  })

  context('the starting location value is entered', () => {
    const GEOCODED_LOCATION_COORDINATES = {
      lat: 12,
      lng: -23
    }

    beforeEach((done) => {
      store.commit('setLocation', {
        lat: 1,
        lng: 2
      })

      sinon.stub(Geocoding, 'getGeocodedLocation')
        .returns(SynchronousPromise.resolve(GEOCODED_LOCATION_COORDINATES))

      configureTest('over there')

      const startingLocationInput = subject.first(AutocompleteAddress)
      startingLocationInput.vm.$emit('suggestion', 'over there')

      subject.vm.$nextTick(done)
    })

    afterEach(() => {
      Geocoding.getGeocodedLocation.restore()
    })

    it('gets the geocoded address', () => {
      sinon.assert.calledOnce(Geocoding.getGeocodedLocation)
      sinon.assert.calledWith(Geocoding.getGeocodedLocation, 'over there')
    })

    it('sets the geocoded address to the store', () => {
      expect(store.getters.currentLocation).to.deep.equal(GEOCODED_LOCATION_COORDINATES)
    })
  })

  context('both starting and final destination values are entered', () => {
    beforeEach((done) => {
      configureTest('something else', 'final stop')

      subject.vm.$nextTick(done)
    })

    it('enables the submit button', () => {
      expect(subject.first('[data-qa=route-it-button]').hasClass('routeWizard__continue--active')).to.be.true
    })
  })

  context('the form is submitted with starting and final destination values', () => {
    beforeEach((done) => {
      configureTest('over there', 'final stop')
      subject.vm.$nextTick(done)
    })

    it('emits the starting and ending location', () => {
      sinon.stub(subject.vm, '$emit')

      const startingLocationListener = sinon.spy()
      const finalDestinationListener = sinon.spy()

      const inputFields = subject.vm.$el.querySelectorAll('input')
      inputFields[0].addEventListener('input', startingLocationListener)
      inputFields[1].addEventListener('input', finalDestinationListener)

      subject.first('[data-qa=explore-route-form]').trigger('submit')

      sinon.assert.calledOnce(subject.vm.$emit)
      sinon.assert.calledWith(subject.vm.$emit, 'input', {
        startingLocation: 'over there',
        finalDestination: 'final stop',
        isCommute: false
      })

      sinon.assert.callOrder(startingLocationListener, finalDestinationListener, subject.vm.$emit)
    })
  })
})
