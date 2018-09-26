import {ReverseGeocoding, Geocoding} from '@/services/LocationService'

describe('LocationService.js', () => {
  context('reverse geocoding', () => {
    it('should call google geocoder service', () => {
      const geocoder = new google.maps.Geocoder()
      sinon.stub(google.maps, 'Geocoder').returns(geocoder)
      sinon.stub(geocoder, 'geocode')

      ReverseGeocoding.getReverseGeocodedLocation({
        lat: 100,
        lng: 200
      })

      sinon.assert.calledOnce(geocoder.geocode)
      sinon.assert.calledWith(geocoder.geocode, {
        location: {
          lat: 100,
          lng: 200
        }
      }, sinon.match.func)

      google.maps.Geocoder.restore()
    })

    it('should respond with the location details', async () => {
      const geocoder = new google.maps.Geocoder()
      sinon.stub(google.maps, 'Geocoder').returns(geocoder)
      sinon.stub(geocoder, 'geocode')

      const locationNamePromise = ReverseGeocoding.getReverseGeocodedLocation({
        lat: 100,
        lng: 200
      })

      const googleGeocoderResponseFixture = [
        {
          formatted_address: 'San Antonio, TX, USA',
          types: ['locality']
        },
        {
          formatted_address: 'Over there',
          types: ['political']
        }
      ]

      const geocoderCallback = geocoder.geocode.getCall(0).args[1]
      geocoderCallback(googleGeocoderResponseFixture, 'OK')

      const locationName = await locationNamePromise
      expect(locationName).to.equal('San Antonio, TX, USA')

      google.maps.Geocoder.restore()
    })
  })

  context('geocoding', () => {
    it('should call google geocoder service', () => {
      const geocoder = new google.maps.Geocoder()
      sinon.stub(google.maps, 'Geocoder').returns(geocoder)
      sinon.stub(geocoder, 'geocode')

      Geocoding.getGeocodedLocation('somewhere')

      sinon.assert.calledOnce(geocoder.geocode)
      sinon.assert.calledWith(geocoder.geocode, {
        address: 'somewhere'
      }, sinon.match.func)

      google.maps.Geocoder.restore()
    })

    it('should respond with the location details', async () => {
      const geocoder = new google.maps.Geocoder()
      sinon.stub(google.maps, 'Geocoder').returns(geocoder)
      sinon.stub(geocoder, 'geocode')

      const locationNamePromise = Geocoding.getGeocodedLocation('somewhere')

      const googleGeocoderResponseFixture = [
        {
          formatted_address: 'San Antonio, TX, USA',
          geometry: {
            location: {
              lat: () => 1,
              lng: () => 2
            }
          }
        }
      ]

      const geocoderCallback = geocoder.geocode.getCall(0).args[1]
      geocoderCallback(googleGeocoderResponseFixture, 'OK')

      const locationName = await locationNamePromise
      expect(locationName).to.deep.equal({
        lat: 1,
        lng: 2
      })

      google.maps.Geocoder.restore()
    })

    it('should respond with false when no result returned', async () => {
      const geocoder = new google.maps.Geocoder()
      sinon.stub(google.maps, 'Geocoder').returns(geocoder)
      sinon.stub(geocoder, 'geocode')

      const locationNamePromise = Geocoding.getGeocodedLocation('somewhere')

      const googleGeocoderResponseFixture = []

      const geocoderCallback = geocoder.geocode.getCall(0).args[1]
      geocoderCallback(googleGeocoderResponseFixture, 'OK')

      const locationName = await locationNamePromise
      expect(locationName).to.be.false

      google.maps.Geocoder.restore()
    })
  })
})
