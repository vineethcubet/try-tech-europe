<template>
  <div class="exploreCharging routeWizard__pane routeWizard__pane--exploreCharging"
       data-qa="explore-charging-pane">
    <form data-qa="explore-charging-location-form"
          @submit.prevent="submitValue">
      <AutocompleteAddress>
        <input class="routeWizard__input"
               data-qa="explore-charging-location-input"
               placeholder="Choose your location"
               v-model="chargingLocation" />
      </AutocompleteAddress>
      <div class="exploreCharging__buttonRow">
        <button class="button button--tertiary">Set Location</button>
      </div>
    </form>
    <p class="exploreCharging__description">Filter charging stations by distance or points of interest.</p>
    <div class="exploreCharging__preferences">
      <ChargingPreferences />
    </div>
  </div>
</template>

<script>
import {Geocoding} from '@/services/LocationService'
import ChargingPreferences from '../ChargingPreferences'
import AutocompleteAddress from '@/components/input/AutocompleteAddress'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'ExploreChargingPane',

  data () {
    return {
      chargingLocation: ''
    }
  },

  computed: mapGetters(['geolocationName']),

  watch: {
    geolocationName () {
      if (this.chargingLocation !== '') return

      this.chargingLocation = this.geolocationName
    }
  },

  mounted () {
    this.chargingLocation = this.geolocationName
  },

  methods: {
    ...mapActions(['setLocation']),
    submitValue () {
      Geocoding.getGeocodedLocation(this.chargingLocation)
        .then(this.setLocation)
    }
  },

  components: {
    AutocompleteAddress,
    ChargingPreferences
  }
}
</script>

<style lang="scss" scoped>
  .exploreCharging__description,
  .exploreCharging__preferences,
  .routeWizard__inputWrap--chargingLocation {
    margin: 0 0 20px;
  }

  .exploreCharging__buttonRow {
    margin: 20px 0;
  }

  .routeWizard__pane.routeWizard__pane--exploreCharging {
    display: block;
    height: auto;
  }
</style>
