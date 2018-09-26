<template>
  <div class="chargeStationInfo">
    <h4 data-qa="charging-station-title">{{ station.name }}</h4>
    <p class="chargeStationInfo__address" data-qa="charging-station-subtitle">{{ station.address }}</p>
    <dl class="chargeStationInfo__list">
      <dt>Chargers</dt>
      <dd><span class="chargeStationInfo__chargerCount" data-qa="charging-station-totalChargers" :title="totalChargersTitle">{{ station.chargers.total }}</span></dd>
      <dt>Status</dt>
      <dd data-qa="charging-station-status">{{ station.status }}</dd>
      <dt>Cost</dt>
      <dd data-qa="charging-station-cost">{{ station.cost }}</dd>
    </dl>
    <div class="chargeStationInfo__customerReviews">
      <p>Customer reviews:</p>
      <StarRating class="starRating" v-model="station.rating" />
    </div>
    <p class="chargeStationInfo__distanceFromRoute">Distance from route <span data-qa="charging-station-distanceFromRouteInMiles">{{ station.distanceFromRouteInMiles }} miles</span></p>
  </div>
</template>

<script>
import StarRating from '@/components/input/StarRating'

export default {
  name: 'ChargingStationInfo',
  props: {
    station: {
      required: true
    }
  },
  computed: {
    totalChargersTitle () {
      return `${this.station.chargers.level2} Level 2, ${this.station.chargers.dcFast} DC Fast`
    }
  },
  components: {
    StarRating
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/config';

  .chargeStationInfo {
    font-size: 1rem;
    width: 275px;

    h4 {
      margin: 0 0 5px;
    }
  }

  .chargeStationInfo__address,
  .chargeStationInfo__customerReviews p,
  .chargeStationInfo__distanceFromRoute {
    font-size: .9em;
  }

  .chargeStationInfo__list {
    dt {
      float: left;
      clear: left;
      margin: 0 10px 0 0;

      &:after {
        content: ":";
      }
    }

    dd {
      margin: 0;
    }
  }

  .chargeStationInfo__chargerCount {
    text-decoration: underline dotted;
    cursor: help;
  }

  .chargeStationInfo__customerReviews {
    margin: 0 0 10px;

    p, .starRating {
      display: inline;
    }
  }

  .chargeStationInfo__addToRoute {
    background-color: $ev-green;
    text-transform: uppercase;
    color: #FFF;
    border: 0;
    padding: 10px;
    width: 100%;
  }
</style>
