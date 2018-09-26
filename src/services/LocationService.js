const ReverseGeocoding = {
  async getReverseGeocodedLocation (location) {
    const geocoder = new google.maps.Geocoder()

    return new Promise((resolve) => {
      geocoder.geocode({location}, (response) => {
        const localityAddress = response.find((address) => {
          return address.types.indexOf('locality') > -1
        })

        resolve(localityAddress.formatted_address)
      })
    })
  }
}

const Geocoding = {
  async getGeocodedLocation (address) {
    const geocoder = new google.maps.Geocoder()

    return new Promise((resolve) => {
      geocoder.geocode({address}, (response) => {
        if (!response.length) return resolve(false)
        resolve({
          lat: response[0].geometry.location.lat(),
          lng: response[0].geometry.location.lng()
        })
      })
    })
  }
}

export {
  ReverseGeocoding,
  Geocoding
}
