import ExploreChargingPane from '@/components/range/drive/wizard/ExploreChargingPane'
import {Geocoding} from '@/services/LocationService'
import store from '@/store'
import {mount} from 'avoriaz'
import {SynchronousPromise} from 'synchronous-promise'

describe('ExploreChargingPane.vue', () => {
  let subject

  const GEOCODED_LOCATION_COORDINATES = {
    lat: 12,
    lng: -23
  }

  beforeEach((done) => {
    subject = mount(ExploreChargingPane, {
      store
    })

    sinon.stub(Geocoding, 'getGeocodedLocation')
      .returns(SynchronousPromise.resolve(GEOCODED_LOCATION_COORDINATES))

    const chargingLocationInput = subject.vm.$el.querySelector('[data-qa=explore-charging-location-input]')
    chargingLocationInput.value = '123 Fake Street'
    chargingLocationInput.dispatchEvent(new Event('input'))

    subject.first('[data-qa=explore-charging-location-form]').trigger('submit')

    subject.vm.$nextTick(done)
  })

  afterEach(() => {
    Geocoding.getGeocodedLocation.restore()
  })

  it('should use geocoder to look up user location', () => {
    sinon.assert.calledOnce(Geocoding.getGeocodedLocation)
    sinon.assert.calledWith(Geocoding.getGeocodedLocation, '123 Fake Street')
  })

  it('should set the geocoded coordinates to the store', () => {
    expect(store.getters.currentLocation).to.deep.equal(GEOCODED_LOCATION_COORDINATES)
  })

  context('pre-filling the charging location input', () => {
    it("pre-fills the charging location input with the user's current location", (done) => {
      store.commit('setGeolocationName', 'Corktown, Detroit, MI')

      subject = mount(ExploreChargingPane, {
        store
      })

      subject.vm.$nextTick(() => {
        const chargingLocationInput = subject.vm.$el.querySelector('[data-qa=explore-charging-location-input]')
        expect(chargingLocationInput.value).to.equal('Corktown, Detroit, MI')

        done()
      })
    })

    it('pre-fills the charging location input before the user enters a value', (done) => {
      store.commit('setGeolocationName', '')

      subject = mount(ExploreChargingPane, {
        store
      })

      store.commit('setGeolocationName', 'Munising, MI')

      subject.vm.$nextTick(() => {
        const chargingLocationInput = subject.vm.$el.querySelector('[data-qa=explore-charging-location-input]')
        expect(chargingLocationInput.value).to.equal('Munising, MI')

        done()
      })
    })

    context('the user has already entered a value', () => {
      beforeEach(() => {
        subject = mount(ExploreChargingPane, {
          store
        })

        const chargingLocationInput = subject.vm.$el.querySelector('[data-qa=explore-charging-location-input]')
        chargingLocationInput.value = 'Tampa, FL'
        chargingLocationInput.dispatchEvent(new Event('input'))
      })

      it('that value is not overwritten', (done) => {
        store.commit('setGeolocationName', 'Mackinac, MI')

        subject.vm.$nextTick(() => {
          const chargingLocationInput = subject.vm.$el.querySelector('[data-qa=explore-charging-location-input]')
          expect(chargingLocationInput.value).to.equal('Tampa, FL')

          done()
        })
      })
    })
  })
})
