<template>
  <div class="exploreRoute routeWizard__pane">
    <form data-qa="explore-route-form"
          @submit.prevent="submitValue">
      <div class="exploreRoute__inputs">
        <div class="routeWizard__inputWrap routeWizard__inputWrap--startingLocation">
          <AutocompleteAddress @suggestion="startingLocationEntered">
            <input class="routeWizard__input"
                   data-qa="starting-location-input"
                   placeholder="Choose a starting location"
                   v-model="startingLocation"
                   ref="startingLocation" />
          </AutocompleteAddress>
        </div>

        <div class="routeWizard__inputWrap routeWizard__inputWrap--finalDestination">
          <AutocompleteAddress>
            <input class="routeWizard__input"
                   data-qa="final-destination-input"
                   placeholder="Choose a final destination"
                   v-model="finalDestination"
                   ref="finalDestination" />
          </AutocompleteAddress>
        </div>
        <div class="routeWizard__optionRow">
          <input type="checkbox"
                 id="affirmFrequentRoute"
                 data-qa="frequent-trip-checkbox"
                 v-model="isCommute"/>
          <label for="affirmFrequentRoute">
            This is my daily commute
          </label>
        </div>
        <div class="routeWizard__buttonWrap">
          <button data-qa="route-it-button"
                  :class="['button', 'routeWizard__continue', buttonActiveClass].join(' ')">Route it!</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {Geocoding} from '@/services/LocationService'
import {mapMutations} from 'vuex'
import AutocompleteAddress from '@/components/input/AutocompleteAddress'

export default {
  name: 'ExploreRoutePane',
  data () {
    return {
      startingLocation: '',
      finalDestination: '',
      isCommute: false
    }
  },
  computed: {
    buttonActiveClass () {
      const isFormFilledOut = this.startingLocation !== '' && this.finalDestination !== ''
      return isFormFilledOut ? 'routeWizard__continue--active' : ''
    }
  },
  methods: {
    ...mapMutations(['setLocation']),
    startingLocationEntered () {
      this.$refs.startingLocation.dispatchEvent(new Event('input'))

      Geocoding.getGeocodedLocation(this.startingLocation)
        .then(this.setLocation)
    },
    submitValue () {
      this.$refs.startingLocation.dispatchEvent(new Event('input'))
      this.$refs.finalDestination.dispatchEvent(new Event('input'))

      this.$emit('input', {
        startingLocation: this.startingLocation,
        finalDestination: this.finalDestination,
        isCommute: this.isCommute
      })
    }
  },
  components: {
    AutocompleteAddress
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/components/input';

  .routeWizard__inputWrap--startingLocation::before {
    content: 'A';
  }

  .routeWizard__inputWrap--finalDestination::before {
    content: 'B';
  }

  .routeWizard__optionRow {
    margin: 0 0 20px;

    input {
      @include checkbox;

      margin: 0 30px 0 0;

      &:checked::before,
      &::before {
        color: $black;
        content: '\2B24';
        line-height: 9px;
        font-size: 20px;
      }

      &:checked::before {
        background-color: darken($solar-orange, 15%);
        color: $solar-orange;
        text-align: right;
      }

      &::before {
        background-color: $darker-gray;
        height: 12px;
        width: 40px;
        margin: 1px 0 0 -5px;
        padding: 1px 0;
        border: none;
        border-radius: 20px;
      }
    }
  }
</style>
