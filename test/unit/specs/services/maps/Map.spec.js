import Map from '@/services/maps/Map.js'

describe('Map.js', () => {
  let map

  const route = {
    routes: [
      {
        legs: [
          {
            start_location: {
              lat: () => 11,
              lng: () => 22
            },
            end_location: {
              lat: () => 12,
              lng: () => 34
            }
          },
          {
            start_location: {
              lat: () => 66,
              lng: () => 55
            },
            end_location: {
              lat: () => 56,
              lng: () => 78
            }
          }
        ]
      }
    ]
  }

  beforeEach(() => {
    map = new google.maps.Map('node', {})
    sinon.stub(google.maps, 'Map').returns(map)
  })

  afterEach(() => {
    google.maps.Map.restore()
  })

  it('should create a map', () => {
    let centerOfMap = {
      lat: 0,
      lng: 0
    }

    new Map.Map('dom-node', centerOfMap)

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

    sinon.assert.calledOnce(google.maps.Map)
    sinon.assert.calledWith(google.maps.Map, 'dom-node', {
      zoom: sinon.match.number,
      center: centerOfMap,
      minZoom: sinon.match.number,
      styles
    })
  })

  it('should create a direction renderer', () => {
    const directionsRenderer = new google.maps.DirectionsRenderer()

    sinon.stub(google.maps, 'DirectionsRenderer').returns(directionsRenderer)

    new Map.Map('dom-node')

    sinon.assert.calledOnce(google.maps.DirectionsRenderer)

    google.maps.DirectionsRenderer.restore()
  })

  it('does not add click listener', () => {
    sinon.stub(map, 'addListener')

    new Map.Map('dom-node', {
      lat: 0,
      lng: 0
    })

    sinon.assert.notCalled(map.addListener)
  })

  context('drawing route', () => {
    let renderer
    let subject

    beforeEach(() => {
      renderer = new google.maps.DirectionsRenderer()
      sinon.stub(google.maps, 'DirectionsRenderer').returns(renderer)
      sinon.stub(renderer, 'setMap')

      sinon.spy(renderer, 'setDirections')

      subject = new Map.Map('container')
    })

    afterEach(() => {
      google.maps.DirectionsRenderer.restore()
    })

    it('draws the route', () => {
      subject.drawRoute(route)

      sinon.assert.calledOnce(renderer.setDirections)
      sinon.assert.calledWith(renderer.setDirections, route)
    })

    it('adds the map to the renderer', () => {
      subject.drawRoute(route)

      sinon.assert.calledOnce(renderer.setMap)
      sinon.assert.calledWith(renderer.setMap, map)
    })

    context('and empty route is provided', () => {
      it('does not render directions', () => {
        subject.drawRoute(null)

        sinon.assert.calledOnce(renderer.setMap)
        sinon.assert.calledWith(renderer.setMap, null)
        sinon.assert.notCalled(renderer.setDirections)
      })
    })
  })

  context('marking the current location', () => {
    let marker

    beforeEach(() => {
      const dummyMarker = new google.maps.Marker()

      marker = new google.maps.Marker()

      sinon.stub(google.maps, 'Marker')
        .onFirstCall()
        .returns(marker)
        .onSecondCall()
        .returns(dummyMarker)
    })

    afterEach(() => {
      google.maps.Marker.restore()
    })

    it('creates a marker', () => {
      new Map.Map(null)

      sinon.assert.called(google.maps.Marker)
      sinon.assert.calledWithNew(google.maps.Marker)
      sinon.assert.calledWith(google.maps.Marker, {
        position: {
          lat: 0,
          lng: 0
        }
      })
    })

    context('current position is received', () => {
      it('sets the position of the marker to the current location', () => {
        const subject = new Map.Map(null)

        sinon.spy(marker, 'setPosition')

        subject.markCurrentLocation({
          lat: 12.3,
          lng: 45.6
        })

        sinon.assert.calledOnce(marker.setPosition)
        sinon.assert.calledWith(marker.setPosition, {
          lat: 12.3,
          lng: 45.6
        })
      })

      it('sets the map of the marker', () => {
        const subject = new Map.Map(null)

        sinon.spy(marker, 'setMap')

        subject.markCurrentLocation({
          lat: 12.3,
          lng: 45.6
        })

        sinon.assert.calledOnce(marker.setMap)
        sinon.assert.calledWith(marker.setMap, map)
      })

      context('a route is being shown', () => {
        let subject

        beforeEach(() => {
          subject = new Map.Map(null)

          subject.drawRoute(route)
        })

        it('sets the position of the marker to the current location', () => {
          sinon.spy(marker, 'setPosition')

          subject.markCurrentLocation({
            lat: 12.3,
            lng: 45.6
          })

          sinon.assert.calledOnce(marker.setPosition)
          sinon.assert.calledWith(marker.setPosition, {
            lat: 12.3,
            lng: 45.6
          })
        })

        it('does not alter the center of the map', () => {
          sinon.spy(map, 'setCenter')

          subject.markCurrentLocation({
            lat: 12.3,
            lng: 45.6
          })

          sinon.assert.notCalled(map.setCenter)
        })

        it('does not add the marker to the map', () => {
          sinon.spy(marker, 'setMap')

          subject.markCurrentLocation({
            lat: 12.3,
            lng: 45.6
          })

          sinon.assert.notCalled(marker.setMap)
        })
      })
    })

    context('zooming to the current location', () => {
      it('sets the center of the map', () => {
        sinon.stub(map, 'setCenter')
        sinon.stub(marker, 'getPosition').returns({
          lat: 12.3,
          lng: 45.6
        })

        const subject = new Map.Map(null)

        subject.markCurrentLocation({
          lat: 12.3,
          lng: 45.6
        })

        subject.zoomToCurrentLocation()

        sinon.assert.calledOnce(map.setCenter)
        sinon.assert.calledWith(map.setCenter, {
          lat: 12.3,
          lng: 45.6
        })
      })

      it('should set the desired default zoom level', () => {
        sinon.stub(map, 'setZoom')

        const subject = new Map.Map(null)

        subject.markCurrentLocation({
          lat: 12.3,
          lng: 45.6
        })

        subject.zoomToCurrentLocation()

        sinon.assert.calledOnce(map.setZoom)
        sinon.assert.calledWith(map.setZoom, 13)
      })
    })
  })

  context('marking the starting location', () => {
    let marker

    beforeEach(() => {
      const dummyMarker = new google.maps.Marker()

      marker = new google.maps.Marker()

      sinon.stub(google.maps, 'Marker')
        .onFirstCall()
        .returns(marker)
        .onSecondCall()
        .returns(dummyMarker)
    })

    afterEach(() => {
      google.maps.Marker.restore()
    })

    context('a route is received', () => {
      it('sets the position of the marker to the final destination', () => {
        const subject = new Map.Map(null)

        sinon.spy(marker, 'setPosition')

        subject.drawRoute(route)

        sinon.assert.calledOnce(marker.setPosition)
        sinon.assert.calledWith(marker.setPosition, {
          lat: 11,
          lng: 22
        })
      })

      it('sets the map of the marker', () => {
        const subject = new Map.Map(null)

        sinon.spy(marker, 'setMap')

        subject.drawRoute(route)

        sinon.assert.calledOnce(marker.setMap)
        sinon.assert.calledWith(marker.setMap, map)
      })
    })
  })

  context('marking the final destination', () => {
    let marker

    beforeEach(() => {
      const dummyMarker = new google.maps.Marker()

      marker = new google.maps.Marker()

      sinon.stub(google.maps, 'Marker')
        .onFirstCall()
        .returns(dummyMarker)
        .onSecondCall()
        .returns(marker)
    })

    afterEach(() => {
      google.maps.Marker.restore()
    })

    it('creates a marker', () => {
      new Map.Map(null)

      sinon.assert.called(google.maps.Marker)
      sinon.assert.calledWithNew(google.maps.Marker)
      sinon.assert.calledWith(google.maps.Marker, {
        position: {
          lat: 0,
          lng: 0
        }
      })
    })

    context('a route is received', () => {
      it('sets the position of the marker to the final destination', () => {
        const subject = new Map.Map(null)

        sinon.spy(marker, 'setPosition')

        subject.drawRoute(route)

        sinon.assert.calledOnce(marker.setPosition)
        sinon.assert.calledWith(marker.setPosition, {
          lat: 56,
          lng: 78
        })
      })

      it('sets the map of the marker', () => {
        const subject = new Map.Map(null)

        sinon.spy(marker, 'setMap')

        subject.drawRoute(route)

        sinon.assert.calledOnce(marker.setMap)
        sinon.assert.calledWith(marker.setMap, map)
      })

      context('the route is removed', () => {
        it('the marker is removed from the map', () => {
          sinon.spy(marker, 'setMap')

          const subject = new Map.Map(null)

          subject.drawRoute(null)

          sinon.assert.calledOnce(marker.setMap)
          sinon.assert.calledWith(marker.setMap, null)
        })
      })
    })
  })

  context('charge points', () => {
    let ourMap
    let subject
    let firstMarker
    let secondMarker
    let infoWindow
    let chargingStationInfo

    const chargePoints = [
      {
        position: {
          lat: 99,
          lng: 88
        },
        name: 'DTE',
        address: '123 street,Detroit,MI,49100',
        chargers: {
          level2: 2,
          dcFast: 2,
          total: 4
        },
        distanceFromRouteInMiles: '0.5356567',
        status: 'Planned'
      },
      {
        position: {
          lat: 77,
          lng: 66
        },
        name: 'DTE',
        address: '123 street,Detroit,MI,49100',
        chargers: {
          level2: 2,
          dcFast: 2,
          total: 4
        },
        distanceFromRouteInMiles: '0.5356567',
        status: 'Planned'
      }
    ]

    beforeEach(() => {
      infoWindow = new google.maps.InfoWindow(null)
      sinon.stub(google.maps, 'InfoWindow').returns(infoWindow)

      chargingStationInfo = document.createElement('div')

      ourMap = new Map.Map(null, null)
      subject = new Map.ChargePoints(ourMap, chargingStationInfo, () => {})

      firstMarker = new google.maps.Marker(null)
      secondMarker = new google.maps.Marker(null)

      sinon.stub(google.maps, 'Marker')
        .onFirstCall().returns(firstMarker)
        .onSecondCall().returns(secondMarker)

      sinon.stub(firstMarker, 'addListener')
    })

    afterEach(() => {
      google.maps.Marker.restore()
      google.maps.InfoWindow.restore()
      firstMarker.addListener.restore()
    })

    it('should add charge points on the map', () => {
      subject.showChargePoints(chargePoints)

      sinon.assert.calledTwice(google.maps.Marker)
      sinon.assert.calledWith(google.maps.Marker, {
        position: {
          lat: 99,
          lng: 88
        },
        map: ourMap.map,
        icon: sinon.match.object
      })

      sinon.assert.calledWith(google.maps.Marker, {
        position: {
          lat: 77,
          lng: 66
        },
        map: ourMap.map,
        icon: sinon.match.object
      })
    })

    it('sets chargingStationInfo for charging station info window', () => {
      sinon.spy(infoWindow, 'setContent')

      subject.showChargePoints([
        {
          position: {
            lat: 99,
            lng: 88
          },
          name: 'DTE',
          address: '123 street,Detroit,MI,49100',
          chargers: {
            level2: 2,
            dcFast: 2,
            total: 4
          },
          distanceFromRouteInMiles: '0.5356567',
          status: 'Planned'
        }
      ])

      sinon.assert.calledOnce(infoWindow.setContent)
      sinon.assert.calledWith(infoWindow.setContent, chargingStationInfo)
    })

    it('clears existing chargers when new chargers are added', () => {
      sinon.stub(firstMarker, 'setMap')

      subject.showChargePoints([
        {
          position: {
            lat: 123,
            lng: 456
          },
          name: 'DTE',
          address: '123 street,Detroit,MI,49100',
          chargers: {
            level2: 2,
            dcFast: 2,
            total: 4
          },
          distanceFromRouteInMiles: 0.53,
          status: 'Planned'
        }
      ])

      subject.showChargePoints([
        {
          position: {
            lat: 123,
            lng: 456
          },
          name: 'DTE',
          address: '123 street,Detroit,MI,49100',
          chargers: {
            level2: 2,
            dcFast: 2,
            total: 4
          },
          distanceFromRouteInMiles: 0.53,
          status: 'Planned'
        }
      ])

      sinon.assert.calledOnce(firstMarker.setMap)
      sinon.assert.calledWith(firstMarker.setMap, null)
    })

    it('should remove charge points only once', () => {
      sinon.stub(firstMarker, 'setMap')

      subject.showChargePoints([
        {
          position: {
            lat: 123,
            lng: 456
          },
          name: 'DTE',
          address: '123 street,Detroit,MI,49100',
          chargers: {
            level2: 2,
            dcFast: 2,
            total: 4
          },
          distanceFromRouteInMiles: 0.53,
          status: 'Planned'
        }
      ])

      subject.clearChargePoints()
      subject.clearChargePoints()

      sinon.assert.calledOnce(firstMarker.setMap)
      sinon.assert.calledWith(firstMarker.setMap, null)
    })
  })
})
