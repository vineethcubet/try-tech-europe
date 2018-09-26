const ZOOM_LEVEL_DEFAULT = 12
const ZOOM_LEVEL_CHARGING_STATIONS = 13

const Map = class {
  constructor (domElement, centerOfMap) {
    const styles = [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      }
    ]

    this.map = new google.maps.Map(domElement, {
      zoom: ZOOM_LEVEL_DEFAULT,
      center: centerOfMap,
      minZoom: 2,
      styles
    })

    this.currentPositionMarker = new google.maps.Marker({
      position: {
        lat: 0,
        lng: 0
      }
    })

    this.finalDestinationMarker = new google.maps.Marker({
      position: {
        lat: 0,
        lng: 0
      }
    })

    this.renderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    })

    this.hasRoute = false
  }

  drawRoute (route) {
    this.hasRoute = route !== null && typeof route !== 'undefined'

    if (!this.hasRoute) {
      this.finalDestinationMarker.setMap(null)
      this.currentPositionMarker.setMap(this.map)

      this.map.setCenter(this.currentPositionMarker.getPosition())
      this.map.setZoom(7)

      return this.renderer.setMap(null)
    }

    const firstLeg = route.routes[0].legs[0]
    const lastLeg = route.routes[0].legs.slice(-1)[0]

    this.currentPositionMarker.setMap(this.map)
    this.currentPositionMarker.setPosition({
      lat: firstLeg.start_location.lat(),
      lng: firstLeg.start_location.lng()
    })

    this.finalDestinationMarker.setMap(this.map)
    this.finalDestinationMarker.setPosition({
      lat: lastLeg.end_location.lat(),
      lng: lastLeg.end_location.lng()
    })

    this.renderer.setMap(this.map)
    this.renderer.setDirections(route)
  }

  markCurrentLocation (currentLocation) {
    this.currentPositionMarker.setPosition(currentLocation)

    if (!this.hasRoute) {
      this.currentPositionMarker.setMap(this.map)
    }
  }

  zoomToCurrentLocation () {
    this.map.setCenter(this.currentPositionMarker.getPosition())
    this.map.setZoom(ZOOM_LEVEL_CHARGING_STATIONS)
  }
}

const ChargePoints = class {
  constructor (map, chargingStationInfo, onChargingStationSelected) {
    this.map = map
    this.chargingStationInfo = chargingStationInfo
    this.onChargingStationSelected = onChargingStationSelected
    this.markers = []
    this.infoWindow = new google.maps.InfoWindow()
  }

  showChargePoints (points) {
    this.clearChargePoints()

    points.forEach((point, index) => {
      const marker = new google.maps.Marker({
        position: point.position,
        map: this.map.map,
        icon: {
          url: '/static/chargingStation.png',
          scaledSize: new google.maps.Size(30, 30)
        }
      })

      this.infoWindow.setContent(this.chargingStationInfo)

      marker.addListener('click', () => {
        this.infoWindow.open(this.map.map, marker)
        this.onChargingStationSelected(index)
      })

      this.markers.push(marker)
    })
  }

  clearChargePoints () {
    this.markers.forEach(marker => marker.setMap(null))
    this.markers = []
  }
}

export default {
  Map,
  ChargePoints
}
