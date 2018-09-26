<template>
  <div>
    <div class="driveSummary"
         data-qa="summary-pane" v-if="routeExists">
      <div class="driveSummary__statistic">
        <p class="statistic__title">Total drive time</p>
        <p class="statistic__value">
          <span data-qa="drive-duration-minutes">{{ lastRouteDurationInMinutes }}</span> minutes
        </p>
      </div>
      <div class="driveSummary__statistic">
        <p class="statistic__title">Total distance</p>
        <p class="statistic__value">
          <span data-qa="drive-distance-miles">{{ lengthInKilometers }}</span> kilometers
        </p>
      </div>
      <div class="driveSummary__statistic">
        <p class="statistic__title">Round trips</p>
        <p class="statistic__value">
          <span data-qa="num-round-trips">{{ numberOfRoundTrips }}</span> possible
        </p>
      </div>
      <div class="driveSummary__statistic">
        <p class="statistic__title">Nearby charging</p>
        <p class="statistic__value">
          <span data-qa="num-charging-stations">{{ lastRouteChargers.length }}</span> stations
        </p>
      </div>
    </div>
    <p data-qa="no-route-exists" v-else>
      Learn more about how an electric vehicle can seamlessly fit your lifestyle by exploring <a data-qa="return-to-range-section"
                                                                                                 @click="returnToRangeSection">daily commutes &amp; road trips</a>.
    </p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Bus from '@/Bus'
import Units from '../../../services/Units'

export default {
  name: 'DriveSummary',
  data () {
    return {
      lastRoute: [],
      lastRouteLengthInMiles: 0,
      lastRouteDurationInMinutes: 0,
      lastRouteChargers: []
    }
  },
  computed: {
    ...mapGetters([
      'rangeInMiles',
      'route',
      'routeLengthInMiles',
      'routeDurationInMinutes',
      'chargers'
    ]),
    numberOfRoundTrips () {
      return Math.floor(this.rangeInMiles / (this.lastRouteLengthInMiles * 2))
    },
    lengthInKilometers () {
      return Math.ceil(this.lastRouteLengthInMiles * Units.KILOMETERS_PER_MILE)
    },
    routeExists () {
      return this.lastRoute.length > 0
    }
  },
  watch: {
    chargers () {
      if (this.route.length === 0) return

      this.lastRoute = this.route
      this.lastRouteLengthInMiles = this.routeLengthInMiles
      this.lastRouteDurationInMinutes = this.routeDurationInMinutes
      this.lastRouteChargers = this.chargers
    }
  },
  mounted () {
    this.lastRoute = this.route
    this.lastRouteLengthInMiles = this.routeLengthInMiles
    this.lastRouteDurationInMinutes = this.routeDurationInMinutes
    this.lastRouteChargers = this.chargers
  },
  methods: {
    returnToRangeSection () {
      Bus.$emit('navigate', 'map')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/config';

  .driveSummary {
    display: flex;
  }

  .driveSummary__statistic {
    text-align: center;
    flex-grow: 1;
    flex-basis: 0;
  }

  .statistic__title {

  }

  .statistic__value {
    color: $darker-gray;

    span {
      color: $ev-green;
      font-size: 3rem;
      display: block;
      margin: 10px 0;
    }
  }
</style>
