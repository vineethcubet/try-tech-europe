import AddressSuggester from '@/services/maps/AddressSuggester'

describe('AddressSuggester.js', () => {
  let autocomplete

  beforeEach(() => {
    autocomplete = new google.maps.places.Autocomplete(null, null)
    sinon.stub(google.maps.places, 'Autocomplete').returns(autocomplete)
  })

  afterEach(() => {
    google.maps.places.Autocomplete.restore()
  })

  it('should instantiate AutoComplete', () => {
    new AddressSuggester.AddressSuggester('dom-node', () => {})

    sinon.assert.calledOnce(google.maps.places.Autocomplete)
    sinon.assert.calledWith(google.maps.places.Autocomplete, 'dom-node', {
      types: ['geocode']
    })
  })

  it('should listen for place change events', () => {
    sinon.stub(autocomplete, 'addListener')

    new AddressSuggester.AddressSuggester('dom-node', () => {})

    sinon.assert.calledOnce(autocomplete.addListener)
    sinon.assert.calledWith(autocomplete.addListener, 'place_changed', sinon.match.func)

    autocomplete.addListener.restore()
  })

  it('should emit the formatted address when the place is changed', () => {
    sinon.stub(autocomplete, 'addListener')
    sinon.stub(autocomplete, 'getPlace').returns({
      formatted_address: 'formatted address',
      types: ['street_address']
    })

    const suggestionListener = sinon.spy()

    new AddressSuggester.AddressSuggester('dom-node', suggestionListener)

    const placeChangedCallback = autocomplete.addListener.getCall(0).args[1]
    placeChangedCallback()

    sinon.assert.calledOnce(suggestionListener)
    sinon.assert.calledWith(suggestionListener, 'formatted address')

    autocomplete.addListener.restore()
    autocomplete.getPlace.restore()
  })

  it('should emit the name of the point of interest when the place is changed', () => {
    sinon.stub(autocomplete, 'addListener')
    sinon.stub(autocomplete, 'getPlace').returns({
      name: 'name of POI',
      types: ['poi']
    })

    const suggestionListener = sinon.spy()

    new AddressSuggester.AddressSuggester('dom-node', suggestionListener)

    const placeChangedCallback = autocomplete.addListener.getCall(0).args[1]
    placeChangedCallback()

    sinon.assert.calledOnce(suggestionListener)
    sinon.assert.calledWith(suggestionListener, 'name of POI')

    autocomplete.addListener.restore()
    autocomplete.getPlace.restore()
  })
})
