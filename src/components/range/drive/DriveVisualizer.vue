<template>
  <div class="driveVisualizer">
    <div id="map-container"
         data-qa="map-container"
         ref="map-container"></div>
    <ChargingStationInfo id="charging-station-info" class="chargingStationInfoPane" :station="selectedCharger" />
  </div>
</template>

<script>
import Map from '@/services/maps/Map.js'
import Bus from '@/Bus'
import {mapGetters, mapMutations} from 'vuex'
import ChargingStationInfo from './ChargingStationInfo'
import RoutePreferences from './ChargingPreferences'

export default {
  name: 'DriveVisualizer',
  data () {
    return {
      map: null,
      chargePoints: null,
      rangeCircle: null,
      selectedCharger: {
        name: '',
        address: '',
        chargers: {
          total: 0,
          level2: 0,
          dcFast: 0
        },
        status: '',
        distanceFromRouteInMiles: 0
      },
      points: [],
      loading: false
    }
  },
  mounted () {
    this.$refs['map-container'].addEventListener('wheel', (e) => e.stopPropagation())

    this.map = new Map.Map(document.getElementById('map-container'), this.currentLocation)

    this.chargePoints = new Map.ChargePoints(
      this.map,
      document.getElementById('charging-station-info'),
      this.chargingStationMarkerSelected
    )

    Bus.$on('reset:map', this.drawTheRoute)
  },
  beforeDestroy () {
    Bus.$off('reset:map', this.drawTheRoute)
  },
  computed: mapGetters([
    'route',
    'directionsResult',
    'routePoints',
    'currentLocation',
    'chargers',
    'rangeInMiles'
  ]),
  methods: {
    ...mapMutations([
      'setShowChargePoints'
    ]),
    chargingStationMarkerSelected (index) {
      this.selectedCharger = this.chargers[index]
    },
    drawTheRoute (route) {
      this.map.drawRoute(route)
    }
  },
  watch: {
    route () {
      this.loading = this.route.length > 0
    },
    directionsResult () {
      this.map.drawRoute(this.directionsResult)
    },
    chargers () {
      this.chargePoints.showChargePoints(this.chargers)
      this.loading = false
    },
    currentLocation () {
      this.map.markCurrentLocation(this.currentLocation)
      this.map.zoomToCurrentLocation()
    }
  },
  components: {
    ChargingStationInfo,
    RoutePreferences
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/config';
  @import '../../../assets/scss/map';

  .driveVisualizer {
    position: relative;
  }

  .chargingStationInfoPane {
    display: none;
  }

  .loading {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading__spinner {
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
  }

  #map-container .chargingStationInfoPane {
    display: block;
  }

  @media screen and (min-width: $laptop-minimum) {
    .driveVisualizer {
      height: 100%;
    }
  }
</style>
