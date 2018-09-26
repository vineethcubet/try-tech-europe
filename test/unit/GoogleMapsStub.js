window.google = {
  maps: {
    Map: function (domNode, initialConfig) {
      return {
        fitBounds (bounds) {},
        addListener (event, callback) {},
        getZoom () { },
        setZoom (level) { },
        setCenter (position) { }
      }
    },

    DirectionsService: function () {
      return {
        route (request, callback) {}
      }
    },

    DirectionsRenderer: function () {
      return {
        setMap (map) {},
        setDirections (directions) {}
      }
    },

    Circle: function (config) {
      return {
        getBounds () {},
        setCenter () {},
        setRadius () {},
        setMap (map) {}
      }
    },

    Marker: function (config) {
      return {
        setPosition () {},
        getPosition () {},
        setMap (map) {},
        addListener () {}
      }
    },

    InfoWindow: function (config) {
      return {
        open (map, marker) {},
        setContent (content) {},
        setMap (map) {}
      }
    },

    Size: function (width, height) {
      return {}
    },

    OverlayView: function () { },

    Geocoder: function () {
      return {
        geocode (coordinates) {}
      }
    },

    places: {
      Autocomplete: function (inputElement, types) {
        return {
          addListener () {},
          getPlace () {}
        }
      }
    }
  }
}
