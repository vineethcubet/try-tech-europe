<template>
  <div class="routeWizard__pane routeWizard__pane--summary"
       data-qa="road-trip-summary-pane">
    <div class="summary__description">
      <h4>Home</h4>
      <p class="summary__value" data-qa="starting-location-summary">{{ startingLocation }}</p>
    </div>
    <div class="summary__description">
      <h4>Staying Charged</h4>
      <div data-qa="short-trip-message" v-if="!thereAreChargers">
        <p>You have a short trip ahead &mdash; you should be able to make it to your destination without stopping to charge.</p>
      </div>
      <div data-qa="long-trip-message" v-else>
        <p>You will need to <span class="bold">charge <span data-qa="number-of-charging-stops">{{ numberOfChargingStops }}</span> times</span> during your trip. Each charging stop should take about 45 minutes.</p>
        <p><span class="bold">Stop to charge in:</span> <span data-qa="charging-stop-locations">{{ chargingStopLocations }}</span></p>
      </div>
    </div>
    <div class="summary__description">
      <h4>Destination</h4>
      <p class="summary__value" data-qa="destination-summary">{{ finalDestination }}</p>
      <p class="summary__value summary__value--extra"><span data-qa="drive-time-hours">{{ routeDurationHours }}</span> hrs <span data-qa="drive-time-minutes">{{ routeDurationMinutes }}</span> mins | <span data-qa="drive-distance-kilometers">{{ routeLengthKilometers }}</span> kilometers</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Units from '@/services/Units'

export default {
  name: 'RoadTripSummaryPane',
  data () {
    return {
      chargingStop: ''
    }
  },
  props: {
    startingLocation: {
      required: true
    },
    finalDestination: {
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'routeLengthInMiles',
      'rangeInMiles',
      'routeDurationInMinutes',
      'chargers'
    ]),
    routeLengthKilometers () {
      return Math.ceil(this.routeLengthInMiles * Units.KILOMETERS_PER_MILE)
    },
    routeDurationHours () {
      return Math.floor(this.routeDurationInMinutes / Units.MINUTES_PER_HOUR)
    },
    routeDurationMinutes () {
      return this.routeDurationInMinutes - (this.routeDurationHours * Units.MINUTES_PER_HOUR)
    },
    numberOfChargingStops () {
      return this.chargers.length
    },
    chargingStopLocations () {
      const chargingLocations = this.chargers.map((charger) => charger.region)
      return this.formatChargingLocations(chargingLocations)
    },
    thereAreChargers () {
      return this.chargers.length > 0
    }
  },
  methods: {
    ...mapActions(['insertCharger']),
    formatChargingLocations (chargingLocations) {
      if (chargingLocations.length === 0) return ''

      if (chargingLocations.length === 1) return chargingLocations[0]

      if (chargingLocations.length === 2) return chargingLocations.join(' and ')

      return `${chargingLocations[0]}, ` + this.formatChargingLocations(chargingLocations.slice(1))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/config';

  .routeWizard__pane.routeWizard__pane--summary {
    display: flex;
    flex-direction: column;
    margin: 40px auto;
    width: 100%;

    .summary__description {
      text-align: left;
      border-bottom: 2px solid $darker-gray;
      padding: 20px 20px 20px 60px;
      position: relative;

      &:last-of-type {
        border: none;
      }

      &::before {
        background-color: $ev-green;
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 2.5rem;
        text-align: center;
        color: #FFF;
        content: 'A';
        width: 40px;
        height: 40px;
        border-radius: 30px;
        position: absolute;
        left: 10px;
      }

      &:nth-of-type(2) {
        &::before {
          background-image: url('../../../../assets/icons/chargingStation.png');
          background-color: transparent;
          background-size: contain;
          content: '';
        }
      }

      &:nth-of-type(3)::before {
        content: 'B';
      }

      h4 {
        font-weight: 400;
        margin: 10px 0;
      }
    }

    .summary__value {
      margin: 0;

      &.summary__value--extra {
        color: $darker-gray;
      }
    }
  }
</style>
