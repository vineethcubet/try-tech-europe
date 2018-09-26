const AddressSuggester = class {
  constructor (inputDomElement, onSuggestion) {
    const autocomplete = new google.maps.places.Autocomplete(inputDomElement, {
      types: ['geocode']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      if (typeof place.types !== 'undefined' &&
        place.types.indexOf('street_address') >= 0) return onSuggestion(place.formatted_address)

      onSuggestion(place.name)
    })
  }
}

export default {
  AddressSuggester
}
