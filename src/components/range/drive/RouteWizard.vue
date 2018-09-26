<template>
  <section class="routeWizard"
           data-qa="route-wizard">
    <header class="routeWizard__header">
      <h3 class="routeWizard__title">You’re in the driver's seat</h3>
      <p class="routeWizard__intro">Design your trip using our interactive range map. You’ll see how far you can go and
        where to stop for a charge.</p>
    </header>
    <ChooseOptionPane @optionChosen="chooseNextPane"
                      v-if="showPane('chooseOption')" />

    <ExploreRoutePane v-model="terminals"
                      v-if="showPane('tripOrCommute')" />

    <ExploreChargingPane v-if="showPane('exploreCharging')" />

    <LoadingRoutePane v-if="showPane('loading')" />

    <RoadTripSummaryPane :startingLocation="terminals.startingLocation"
                         :finalDestination="terminals.finalDestination"
                         v-if="showPane('trip-summary')" />

    <CommuteSummaryPane :startingLocation="terminals.startingLocation"
                        :finalDestination="terminals.finalDestination"
                        v-if="showPane('commute-summary')" />

    <div class="routeWizard__optionRow">
      <div
        v-if="showPane('exploreCharging') || showPane('tripOrCommute') || showPane('trip-summary') || showPane('commute-summary')">
        <button data-qa="explore-new-route-button"
                class="button button--secondary routeWizard__reset"
                @click="returnToStartingLocationPane">Explore new route
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
import ChargingService from '@/services/ChargingService'
import ChooseOptionPane from './wizard/ChooseOptionPane'
import ExploreRoutePane from './wizard/ExploreRoutePane'
import LoadingRoutePane from './wizard/LoadingRoutePane'
import ExploreChargingPane from './wizard/ExploreChargingPane'
import RoadTripSummaryPane from './wizard/RoadTripSummaryPane'
import CommuteSummaryPane from './wizard/CommuteSummaryPane'
import Bus from '@/Bus'

export default {
  name: 'RouteWizard',
  data () {
    return {
      activePane: 'chooseOption',
      terminals: {
        startingLocation: '',
        finalDestination: '',
        isCommute: false
      },
      route: [],
      shouldLoadChargers: false
    }
  },
  computed: mapGetters(['routePoints', 'geolocation', 'chargers']),
  watch: {
    terminals () {
      if (this.terminals.startingLocation === '') return
      if (this.terminals.finalDestination === '') return

      this.setChargerPreferences({
        showChargersAtTerminals: this.terminals.isCommute
      })

      this.shouldLoadChargers = !this.terminals.isCommute

      this.route.push(this.terminals.startingLocation)
      this.route.push(this.terminals.finalDestination)

      this.updateRoute(this.route)

      this.activePane = 'loading'
    },
    routePoints () {
      if (!this.shouldLoadChargers) return

      ChargingService.getOpinionatedChargersAlongRoute(this.routePoints)
        .then((chargers) => {
          this.setChargers(chargers)
          this.insertChargers(chargers.map((charger) => charger.address))
        })

      this.shouldLoadChargers = false
    },
    geolocation () {
      this.loadChargers()
    },
    chargers () {
      if (this.activePane === 'loading') this.activateSummaryPane()
    }
  },
  mounted () {
    Bus.$on('route:trip', this.receiveRoadTrip)
  },
  methods: {
    ...mapActions(['updateRoute', 'clearRoute', 'insertChargers', 'loadChargers']),
    ...mapMutations(['setChargerPreferences', 'setLocation', 'setChargers']),
    showPane (nameOfPane) {
      return this.activePane === nameOfPane
    },
    returnToStartingLocationPane () {
      if (this.finalDestination === '') Bus.$emit('reset:map')

      this.route = []
      this.activePane = 'chooseOption'
      this.startingLocation = ''
      this.finalDestination = ''

      this.clearRoute()
      this.setLocation(null)
    },
    chooseNextPane (chosenOption) {
      this.activePane = chosenOption
    },
    activateSummaryPane () {
      this.activePane = this.terminals.isCommute ? 'commute-summary' : 'trip-summary'
    },
    receiveRoadTrip (route) {
      this.route = []

      this.terminals = {
        startingLocation: route[0],
        finalDestination: route[1],
        isCommute: false
      }
    }
  },
  beforeDestroy () {
    Bus.$off('route:trip', this.receiveRoadTrip)
  },
  components: {
    LoadingRoutePane,
    ExploreRoutePane,
    ChooseOptionPane,
    ExploreChargingPane,
    RoadTripSummaryPane,
    CommuteSummaryPane
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/config';

  .routeWizard {
    text-align: center;
    padding: 100px 40px 20px;
    box-sizing: border-box;
  }

  .routeWizard__header {
    text-align: center;
    margin: 0 0 20px 0;
  }

  .routeWizard__title {
    text-transform: uppercase;
  }

  .routeWizard__intro {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .routeWizard__input,
  .routeWizard__continue,
  .routeWizard__reset,
  button.button--routeWizard {
    font-size: 1rem;
    padding: 10px;
  }

  .routeWizard__input,
  .routeWizard__continue,
  button.button--routeWizard {
    font-size: 1.25rem;
  }

  .routeWizard__input,
  button.button--routeWizard {
    background-color: $light-gray;
    color: $black;
    font-weight: normal;
    border: 1px solid $darker-gray;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #CCC;
    box-sizing: border-box;
    width: 100%;
    margin: 0 20px 0;

    &::placeholder {
      text-align: center;
    }
  }

  .routeWizard__inputWrap,
  .routeWizard__buttonWrap {
    margin: 0 auto 20px;
  }

  .routeWizard__inputWrap {
    position: relative;
    width: 350px;

    &::before {
      background-color: $ev-green;
      font-size: 1rem;
      font-weight: bold;
      line-height: 2.25rem;
      text-align: center;
      color: #FFF;
      width: 35px;
      height: 35px;
      border-radius: 30px;
      position: absolute;
      left: -25px;
      top: 5px;
    }
  }

  button.button--routeWizard {
    text-transform: none;
    width: 350px;
  }

  .routeWizard__continue {
    background-color: $dark-gray;
    color: $darker-gray;
    margin: 0 10px;
    cursor: default;

    &.routeWizard__continue--active {
      background-color: $ev-green;
      color: #FFF;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .button.routeWizard__reset {
    padding: 0;

    &:hover {
      background-color: transparent;
    }
  }
</style>
