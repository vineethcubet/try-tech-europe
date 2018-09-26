<template>
  <div :class="['recommendedCharging', recommendationClass].join(' ')">
    <div class="recommendedCharging__recommendation recommendedCharging__recommendation--high">
      <slot name="high"></slot>
    </div>

    <div class="recommendedCharging__recommendation recommendedCharging__recommendation--medium">
      <slot name="medium"></slot>
    </div>

    <div class="recommendedCharging__recommendation recommendedCharging__recommendation--low">
      <slot name="low"></slot>
    </div>

    <div class="recommendedCharging__recommendation recommendedCharging__recommendation--none">
      <div class="options__option options__option--empty">
        <p>To receive a charging<br/>recommendation, complete the<br/>charging profile quiz</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'RecommendedCharging',
  computed: {
    ...mapGetters(['chargingRecommendation']),
    recommendationClass () {
      return 'recommendedCharging--' + {
        1: 'low',
        2: 'medium',
        3: 'high'
      }[this.chargingRecommendation]
    }
  }
}
</script>

<style lang="scss" scoped>
  .recommendedCharging {
    display: flex;
  }

  .recommendedCharging__recommendation {
    flex-grow: 1;
    flex-basis: 0;
    position: relative;
    z-index: 1000;
    padding: 20px;
  }

  .recommendedCharging__recommendation--none {
    display: none;
  }

  .recommendedCharging--high .recommendedCharging__recommendation--high,
  .recommendedCharging--medium .recommendedCharging__recommendation--medium,
  .recommendedCharging--low .recommendedCharging__recommendation--low {
    &::before {
      background-image: url('../../assets/icons/recommendation-marker.png');
      background-size: contain;
      background-repeat: no-repeat;
      content: ' ';
      position: absolute;
      top: 10px;
      left: 25px;
      width: 75px;
      height: 97.5px;
      z-index: 1001;
    }
  }
</style>

<style lang="scss">
  @import '../../assets/scss/components/floatingBox';

  .options__option {
    @include floatingBox;

    background-color: #FFF;
    padding: 40px;
    margin: 0 20px 0 0;
    position: relative;

    h4 {
      margin: 0 0 20px;
      text-transform: none;
    }

    &:last-of-type {
      margin: 0;
    }
  }

  .options__option--empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .option__header {
    text-align: center;
    margin: 0 auto 50px;
    width: 80%;

    img {
      height: 150px;
    }

    &.option__header--withoutImage {
      p:first-of-type {
        margin: 40px 0;
      }
    }
  }

  .option__subHeader {
    font-weight: 100;
    line-height: 2rem;
  }

  .header__cost {
    font-size: 4rem;
    line-height: 4rem;
    font-weight: bold;
  }

  .option__details {
    dt, dd, li, .option__disclaimer {
      border-bottom: 1px solid $dark-gray;
      padding: 5px 0;
      line-height: 1rem;
    }

    dt, dd, li {
      margin: 0 0 15px;
      box-sizing: border-box;
    }

    dt, li {
      color: $darker-gray;
    }
  }

  ul.option__details {
    list-style: none;
    padding: 0;
    margin: 0;

    li:last-of-type {
      margin: 0;
    }
  }

  dl.option__details {
    margin: 0;

    &.option__details--withoutDisclaimer {
      dt, dd {
        &:last-of-type {
          margin: 0;
        }
      }
    }

    dt {
      float: left;
      clear: both;
      width: 75%;

      &.option__title {
        &, & + dd {
          display: none;
        }
      }
    }

    dd {
      font-weight: bold;
      text-align: right;
      float: right;
      width: 25%;
    }
  }

  .option__disclaimer {
    color: $darker-gray;
    margin: 0;
    clear: both;
  }

  .option__additionalInfo {
    color: $darker-gray;
    padding: 10px 0 0;
    clear: both;
  }

  .charging__recommendations,
  #chargingSummaryRecommended {
    .recommendedCharging__recommendation::before {
      display: none;
    }

    .recommendedCharging__recommendation {
      display: none;
    }

    .recommendedCharging--high .recommendedCharging__recommendation--high,
    .recommendedCharging--medium .recommendedCharging__recommendation--medium,
    .recommendedCharging--low .recommendedCharging__recommendation--low {
      display: block;
      padding: 0;
    }
  }

  .charging__recommendations {
    .recommendedCharging__recommendation--none {
      display: block;
    }

    .recommendedCharging--high,
    .recommendedCharging--medium,
    .recommendedCharging--low {
      .recommendedCharging__recommendation--none {
        display: none;
      }
    }

    .options__option {
      min-height: 680px;
    }
  }

  #chargingSummaryRecommended {
    .options__option {
      background-color: transparent;
      box-shadow: none;
      display: flex;
      align-items: center;
      padding: 0;
    }

    .option__header,
    .option__details {
      flex-grow: 1;
      flex-basis: 0;
    }

    .option__header {
      margin: 0 20px 0 0;
    }
  }
</style>
