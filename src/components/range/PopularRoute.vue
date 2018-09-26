<template>
  <div :class="['popularRoute', activeClass].join(' ')">
    <div class="popularRoute__controls">
      <button class="controls__control controls__control--left"
              data-qa="previous-route-button"
              @click="previousRoute()">&#10157;</button>
      <button class="controls__control controls__control--right"
              data-qa="next-route-button"
              @click="nextRoute()">&#10157;</button>
    </div>
    <div class="popularRoute__textBox popularRoute__textBox--crossNorthSea">
      <h2>Taking a road trip is easy in an EV</h2>
      <p class="popularRoute__routePoints">From Copenhagen, Denmark<br/>to Amsterdam, Netherlands</p>
      <ul class="popularRoute__stats">
        <li>9 hours</li>
        <li>790 km</li>
        <li>2 charging stops</li>
      </ul>
      <div class="popularRoute__seeOnMap">
        <button data-qa="crossNorthSea-see-route-button"
              @click="seeRouteOnMap(['Copenhagen, Denmark', 'Amsterdam, Netherlands'])">See route on the map</button>
      </div>
    </div>

    <div class="popularRoute__textBox popularRoute__textBox--brandenburgGate">
      <h2>Taking a road trip is easy in an EV</h2>
      <p class="popularRoute__routePoints">From Zürich, Switzerland<br/>to Berlin, Germany</p>
      <ul class="popularRoute__stats">
        <li>9 hours</li>
        <li>840 km</li>
        <li>2 charging stops</li>
      </ul>
      <div class="popularRoute__seeOnMap">
        <button data-qa="brandenburgGate-see-route-button"
                @click="seeRouteOnMap(['Zürich, Switzerland', 'Berlin, Germany'])">See route on the map</button>
      </div>
    </div>

    <div class="popularRoute__textBox popularRoute__textBox--iberianPeninsula">
      <h2>Taking a road trip is easy in an EV</h2>
      <p class="popularRoute__routePoints">From Lisbon, Portugal<br/>to Barcelona, Spain</p>
      <ul class="popularRoute__stats">
        <li>12 hours</li>
        <li>1250 km</li>
        <li>3 charging stops</li>
      </ul>
      <div class="popularRoute__seeOnMap">
        <button data-qa="iberianPeninsula-see-route-button"
                @click="seeRouteOnMap(['Lisbon, Portugal', 'Barcelona, Spain'])">See route on the map</button>
      </div>
    </div>

    <div class="popularRoute__textBox popularRoute__textBox--scandinavianWeekend">
      <h2>Taking a road trip is easy in an EV</h2>
      <p class="popularRoute__routePoints">From Stockholm, Sweden<br/>to Oslo, Norway</p>
      <ul class="popularRoute__stats">
        <li>6 hours</li>
        <li>530 km</li>
        <li>1 charging stop</li>
      </ul>
      <div class="popularRoute__seeOnMap">
        <button data-qa="scandinavianWeekend-see-route-button"
                @click="seeRouteOnMap(['Stockholm, Sweden', 'Oslo, Norway'])">See route on the map</button>
      </div>
    </div>

    <div class="popularRoute__textBox popularRoute__textBox--budapestToBucharest">
      <h2>Taking a road trip is easy in an EV</h2>
      <p class="popularRoute__routePoints">From Budapest, Hungary<br/>to Bucharest, Romania</p>
      <ul class="popularRoute__stats">
        <li>9.5 hours</li>
        <li>840 km</li>
        <li>2 charging stops</li>
      </ul>
      <div class="popularRoute__seeOnMap">
        <button data-qa="budapestToBucharest-see-route-button"
                @click="seeRouteOnMap(['Budapest, Hungary', 'Bucharest, Romania'])">See route on the map</button>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/Bus'
import Routes from '@/services/Routes'

export default {
  name: 'PopularRoute',
  data () {
    return {
      active: 0,
      interval: 0,
      possibilities: []
    }
  },
  computed: {
    activeClass () {
      return `popularRoute--${this.possibilities[this.active]}`
    }
  },
  mounted () {
    this.possibilities = Routes.getRoutes()

    this.startTimer()
  },
  methods: {
    startTimer () {
      if (this.interval > 0) clearInterval(this.interval)

      this.interval = setInterval(this.switchToNextRoute, 10000)
    },
    switchToNextRoute () {
      this.active = (this.active + 1) % this.possibilities.length
    },
    nextRoute () {
      this.startTimer()
      this.switchToNextRoute()
    },
    previousRoute () {
      if (this.active === 0) {
        this.active = this.possibilities.length - 1
        return
      }

      this.active--

      this.startTimer()
    },
    seeRouteOnMap (route) {
      Bus.$emit('route:trip', route)
      Bus.$emit('navigate', 'map')
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .popularRoute {
    background-size: cover;
    color: #FFF;
    height: 100vh;
    width: 100vw;
    position: relative;

    &.popularRoute--crossNorthSea .popularRoute__textBox--crossNorthSea,
    &.popularRoute--brandenburgGate .popularRoute__textBox--brandenburgGate,
    &.popularRoute--iberianPeninsula .popularRoute__textBox--iberianPeninsula,
    &.popularRoute--scandinavianWeekend .popularRoute__textBox--scandinavianWeekend,
    &.popularRoute--budapestToBucharest .popularRoute__textBox--budapestToBucharest {
      display: block;
    }

    &.popularRoute--crossNorthSea {
      background-image: url('../../assets/images/roadTrips/copenhagen.jpg');
      background-position: center bottom;
    }

    &.popularRoute--brandenburgGate {
      background-image: url('../../assets/images/roadTrips/brandenburgGate.jpg');
      background-position: center bottom;
    }

    &.popularRoute--iberianPeninsula {
      background-image: url('../../assets/images/roadTrips/iberianPeninsula.jpg');
      background-position: center bottom;
    }

    &.popularRoute--scandinavianWeekend {
      background-image: url('../../assets/images/roadTrips/scandinavianWeekend.jpg');
      background-position: center bottom;
    }

    &.popularRoute--budapestToBucharest {
      background-image: url('../../assets/images/roadTrips/budapestToBucharest.jpg');
      background-position: center bottom;
    }
  }

  .popularRoute__controls {

  }

  .controls__control {
    background-color: rgba(255, 255, 255, .25);
    font-size: 4rem;
    color: #FFF;
    border: none;
    border-radius: 5rem;
    padding: 0 15px;
    position: absolute;
    bottom: 20px;

    &:hover {
      background-color: rgba(255, 255, 255, .5);
    }

    &.controls__control--left {
      transform: scale(-1, 1);
      left: 20px;
    }

    &.controls__control--right {
      right: 70px;
    }
  }

  .popularRoute__textBox {
    display: none;
    position: absolute;
    right: 150px;
    bottom: 50px;
  }

  .popularRoute__routePoints {
    text-transform: uppercase;
    font-size: $h1-font-size;
    line-height: $h1-font-size;
    margin: 40px 0;
  }

  .popularRoute__stats {
    list-style: none;
    padding: 0;

    li {
      font-size: $h2-font-size;
      display: inline;
      margin: 0 20px 0 0;
      padding: 0 20px 0 0;
      border-right: 3px solid #FFF;

      &:last-of-type {
        border: none;
      }
    }
  }

  .popularRoute__seeOnMap {
    button {
      background-color: rgba(255, 255, 255, .2);
      font-weight: 100;
      color: #FFF;
      padding: 10px;
      border-radius: 10px;
      border: none;

      &::after {
        content: '\2193';
        font-size: .8rem;
        margin: 0 0 0 10px;
      }
    }
  }
</style>
