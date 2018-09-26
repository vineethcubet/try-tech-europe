import Vuex from 'vuex'
import {SynchronousPromise} from 'synchronous-promise'
import structure from '@/store/Location'
import {ReverseGeocoding} from '@/services/LocationService'

describe('Location.js', () => {
  context('set new geolocation ', () => {
    let subject

    beforeEach(() => {
      subject = new Vuex.Store(structure)
    })

    it('should set the geolocation', () => {
      subject.dispatch('setGeolocation', {
        lat: 123,
        lng: 456
      })

      expect(subject.getters.geolocation).to.deep.equal({
        lat: 123,
        lng: 456
      })
    })

    it('should call location service', () => {
      sinon.stub(ReverseGeocoding, 'getReverseGeocodedLocation').returns(new SynchronousPromise())

      subject.dispatch('setGeolocation', {
        lat: 123,
        lng: 456
      })

      sinon.assert.calledOnce(ReverseGeocoding.getReverseGeocodedLocation)
      sinon.assert.calledWith(ReverseGeocoding.getReverseGeocodedLocation, {
        lat: 123,
        lng: 456
      })

      ReverseGeocoding.getReverseGeocodedLocation.restore()
    })

    context('reverse geocoding service responds with a location', () => {
      it('sets the reverse geocoded name to the store', () => {
        sinon.stub(ReverseGeocoding, 'getReverseGeocodedLocation')

        ReverseGeocoding.getReverseGeocodedLocation
          .returns(SynchronousPromise.resolve('Dearborn, MI'))

        subject.dispatch('setGeolocation', {
          lat: 123,
          lng: 456
        })

        expect(subject.getters.geolocationName).to.equal('Dearborn, MI')

        ReverseGeocoding.getReverseGeocodedLocation.restore()
      })
    })
  })
})
