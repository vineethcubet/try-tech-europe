<template>
  <div class="routeWizard__pane routeWizard__pane--summary"
       data-qa="commute-summary-pane">
    <div class="summary__description">
      <h4>Home</h4>
      <p class="summary__value" data-qa="starting-location-summary">{{ startingLocation }}</p>
    </div>
    <div class="summary__description">
      <h4>Work</h4>
      <p class="summary__value" data-qa="destination-summary">{{ finalDestination }}</p>
      <p class="summary__value summary__value--extra"><span data-qa="drive-time-hours">{{ routeDurationHours }}</span> hrs <span data-qa="drive-time-minutes">{{ routeDurationMinutes }}</span> mins | <span data-qa="drive-distance-miles">{{ routeLengthInKilometers }}</span> kilometers</p>
    </div>
    <div class="summary__description">
      <h4>Round Trips</h4>
      <p class="summary__value">
        You can make <span class="bold"><span data-qa="number-of-round-trips">{{ numberOfRoundTrips }}</span> round trips</span> before charging, and <span class="bold">save up to $<span data-qa="savings-over-ice">{{ dollarsSaved }}</span></span> on fuel each trip.
      </p>
    </div>
    <div class="summary__description">
      <h4>Nearby Charging</h4>
      <p class="summary__value">There are <span class="bold"><span data-qa="num-charging-stations">{{ chargers.length }}</span> charging stations</span> near your home and work</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Units from '@/services/Units'

const COST_PER_KWH = 0.13
const COST_PER_GAL = 2.857

const KWH_CAPACITY = 99
const GAL_CAPACITY = 15.7

const RANGE_BEV = 300
const RANGE_ICE = 384.65

const COST_PER_BEV_MILE = (KWH_CAPACITY * COST_PER_KWH) / RANGE_BEV
const COST_PER_ICE_MILE = (GAL_CAPACITY * COST_PER_GAL) / RANGE_ICE

export default {
  name: 'CommuteSummaryPane',
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
    ...mapGetters(['routeLengthInMiles', 'rangeInMiles', 'routeDurationInMinutes', 'chargers']),
    routeLengthInKilometers () {
      return Math.ceil(this.routeLengthInMiles * Units.KILOMETERS_PER_MILE)
    },
    numberOfRoundTrips () {
      return Math.floor(this.rangeInMiles / (this.routeLengthInMiles * 2))
    },
    routeDurationHours () {
      return Math.floor(this.routeDurationInMinutes / Units.MINUTES_PER_HOUR)
    },
    routeDurationMinutes () {
      return this.routeDurationInMinutes - (this.routeDurationHours * Units.MINUTES_PER_HOUR)
    },
    dollarsSaved () {
      const exactSavings = this.routeLengthInMiles * (COST_PER_ICE_MILE - COST_PER_BEV_MILE)
      return Math.floor(exactSavings)
    }
  },
  methods: mapActions(['insertCharger'])
}
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/config';

  .routeWizard__pane.routeWizard__pane--summary {
    display: flex;
    flex-direction: column;
    margin: 40px auto;
    width: 100%;
    height: auto;

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

      &:nth-of-type(2):before {
        content: 'B';
      }

      &:nth-of-type(3):before {
        content: '\21BA';
      }

      &:nth-of-type(4):before {
        background-image: url('../../../../assets/icons/chargingStation.png');
        background-color: transparent;
        background-size: contain;
        content: '';
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
