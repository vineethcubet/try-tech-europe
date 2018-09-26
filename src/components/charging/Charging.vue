<template>
  <InnerScroll class="charging"
       data-qa="charging-section">
    <div class="charging__recommendations">
      <div class="lifestyleQuizContainer">
        <LifestyleQuiz />
      </div>
      <div class="charging__recommendationsList">
        <div class="recommendations__recommendation">
          <h3 class="center">Recharge on the go</h3>
          <PublicChargingOptions />
        </div>
        <div class="recommendations__recommendation">
          <h3 class="center">Recharge at home</h3>
          <ChargingOptions />
        </div>
      </div>
    </div>
    <div data-qa="charging-tabs" :class="'charging__options ' + activeClass">
      <div class="charging__option charging__option--destinationCharging">
        <button data-qa="destination-charging-button"
                @click="active = 'destinationCharging'">Recharge on the Go</button>
        <div class="option__content option__content__destinationCharging">
          <DestinationCharging />
        </div>
      </div>
      <div class="charging__option charging__option--homeCharging">
        <button data-qa="home-charging-button"
                @click="active = 'homeCharging'">Recharge At Home</button>
        <div class="option__content" data-qa="charging-home">
          <HomeCharging />
        </div>
      </div>
    </div>
  </InnerScroll>
</template>

<script>
import DestinationCharging from './destination/DestinationCharging'
import HomeCharging from './home/HomeCharging'
import {mapGetters} from 'vuex'
import InnerScroll from '../InnerScroll'
import LifestyleQuiz from './LifestyleQuiz'
import ChargingOptions from './home/ChargingOptions'
import PublicChargingOptions from './destination/PublicChargingOptions'

export default {
  name: 'Charging',
  data () {
    return {
      active: 'destinationCharging'
    }
  },
  computed: {
    ...mapGetters(['dwellingType']),
    activeClass () {
      return `charging__options--${this.active}`
    }
  },
  watch: {
    dwellingType () {
      this.active = this.dwellingType === 'house' ? 'homeCharging' : 'destinationCharging'
    }
  },
  components: {
    PublicChargingOptions,
    ChargingOptions,
    LifestyleQuiz,
    InnerScroll,
    HomeCharging,
    DestinationCharging
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .charging {
    height: 100vh;
    overflow: scroll;
  }

  .charging__intro {
    position: relative;
  }

  .charging__title {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 100%;
    color: #FFF;

    p {
      text-transform: uppercase;
      font-size: 0.85rem;
    }

  }

  .charging__options {
    position: relative;
    padding:  100px 0 0;

    .charging__option {
      button {
        background: linear-gradient(0deg, $dark-gray 0, #FFF 10px);
        border-top: 4px solid #FFF;
        border-bottom: 1px solid $darker-gray;
      }

      &:first-of-type button {
        border-right: 1px solid $darker-gray;
      }
    }

    &.charging__options--destinationCharging .charging__option--destinationCharging,
    &.charging__options--homeCharging .charging__option--homeCharging {
      button {
        background: none;
        border-top: 5px solid $ev-green;
        border-bottom: none;
        color: $black;
      }
    }
    &.charging__options--destinationCharging {
      .charging__option--destinationCharging {
        .option__content {
          display: block;
        }
      }
    }

    &.charging__options--homeCharging {
      .charging__option--homeCharging {
        .option__content {
          display: block;
        }
      }
    }
  }

  .charging__option {
    button {
      background-color: transparent;
      text-transform: uppercase;
      text-align: center;
      font-weight: normal;
      font-size: $h3-font-size;
      color: $darker-gray;
      border: none;
      padding: 20px 0;
      width: 50%;
      position: absolute;
      top: 0px;
    }

    &:last-of-type button {
      left: 50%;
    }
  }

  .option__content {
    display: none;

    &.option__content--destinationCharging {
      align-items: center;
      background-color: $dark-gray;
    }
  }

  .charging__recommendations {
    display: flex;
  }

  .lifestyleQuizContainer {
    width: 33%;
  }

  .charging__recommendationsList {
    background-color: $dark-gray;
    width: 66%;
    display: flex;
    margin: 0 0 20px;
    padding: 40px 20px;
  }

  .recommendations__recommendation {
    width: 50%;

    &:first-of-type {
      margin: 0 10px 0 0;
    }

    &:last-of-type {
      margin: 0 0 0 10px;
    }
  }
</style>
