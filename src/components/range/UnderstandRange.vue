<template>
  <div class="understandingRange">
    <div class="understandingRange__hero">
      <div class="hero__textBox">
        <h2>Understanding<br/>Range</h2>
        <p>Just like a gas vehicle, the range of an battery electric vehicle<br/>can be impacted by several factors.</p>
        <p>Explore these influencers &amp; learn more about range in a BEV.</p>
      </div>
    </div>
    <ul data-qa="range-influencer-tabs"
        :class="'understandingRange__descriptions ' + activeClass">
      <li data-qa="highSpeed-tab"
          class="descriptions__description descriptions__description--highSpeed">
        <button data-qa="highSpeed-button"
                @click="active = 'highSpeed'">High Speed</button>
        <h3>High Speed</h3>
        <p>Frequent, heavy acceleration will have a detrimental impact on the car's state of charge, whereas traveling at a steady pace will help an electric car preserve range.</p>
        <p>Gradual acceleration can also reduce your reliance on hard braking, which consumes more energy than gentle braking.</p>
        <p><span class="bold">Impact on range:</span> up to 20% of total range.</p>
      </li>
      <li data-qa="extremeWeather-tab"
          class="descriptions__description descriptions__description--extremeWeather">
        <button data-qa="extremeWeather-button"
                @click="active = 'extremeWeather'">Extreme Weather</button>
        <h3>Extreme Weather</h3>
        <p>Extreme low and high temperatures impact how well a battery can maintain its level of charge.</p>
        <p>EVs feature sophisticated thermal management systems that help to keep the battery at its optimal temperature and minimize the impact of outside temperatures on the car's range.</p>
        <p><span class="bold">Impact on range:</span> up to 10% of total range</p>
      </li>
      <li data-qa="interiorClimate-tab"
          class="descriptions__description descriptions__description--interiorClimate">
        <button data-qa="interiorClimate-button"
                @click="active = 'interiorClimate'">Interior Climate</button>
        <h3>Interior Climate</h3>
        <p>Heating and air conditioning systems use energy, and this can reduce range.</p>
        <p>To reduce the impact on range, electric vehicles can be preconditioned ahead of departure while the car is still charging.
          This allows your EV to use electricity from the power supply, and not the battery, to heat or cool the interior.</p>
        <p><span class="bold">Impact on range:</span> up to 5% of total range</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UnderstandRange',
  data () {
    return {
      active: 'highSpeed'
    }
  },
  computed: {
    activeClass () {
      return `understandingRange__descriptions--${this.active}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .understandingRange__hero {
    background-image: url('../../assets/images/roadTrip.png');
    background-size: cover;
    background-position: center;
    height: calc(100vh - 400px);
    position: relative;
  }

  .hero__textBox {
    color: #FFF;
    position: absolute;
    bottom: 2vw;
    right: 2vw;
  }

  .understandingRange__intro {
    padding: 50px;
    box-sizing: border-box;
    width: 40%;
  }

  .understandingRange__descriptions {
    background-color: $dark-gray;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;

    h3, p {
      display: none;
    }

    button {
      background-color: $dark-gray;
      background-repeat: no-repeat;
      background-position: 30px center;
      background-size: 30px;
      color: $darker-gray;
      font-size: 1rem;
      text-align: left;
      border: none;
      position: absolute;
      top: 20px;
      left: 0;
      z-index: 1000;
      height: 75px;
      width: 250px;
      padding: 20px 0 20px 80px;
    }

    &.understandingRange__descriptions--highSpeed .descriptions__description--highSpeed,
    &.understandingRange__descriptions--extremeWeather .descriptions__description--extremeWeather,
    &.understandingRange__descriptions--interiorClimate .descriptions__description--interiorClimate,
    &.understandingRange__descriptions--towing .descriptions__description--towing {
      background-color: #FFF;
      height: 400px;
      padding: 50px 0 0 130px;
      box-sizing: border-box;

      button {
        background-color: #FFF;
        color: $black;
        box-shadow: -3px 2px 5px $darker-gray;
        z-index: 1001;
      }

      h3, p {
        display: block;
        width: 70%;
      }
    }

    &.understandingRange__descriptions--highSpeed .descriptions__description--highSpeed {
      button {
        background-image: url('../../assets/icons/range/highSpeed-active.svg');
      }
    }

    &.understandingRange__descriptions--extremeWeather .descriptions__description--extremeWeather {
      button {
        background-image: url('../../assets/icons/range/extremeWeather-active.svg');
      }
    }

    &.understandingRange__descriptions--interiorClimate .descriptions__description--interiorClimate {
      button {
        background-image: url('../../assets/icons/range/interiorClimate-active.svg');
      }
    }

    &.understandingRange__descriptions--towing .descriptions__description--towing {
      button {
        background-image: url('../../assets/icons/range/towing-active.svg');
      }
    }

  }

  .descriptions__description {
    background-repeat: no-repeat;
    background-position: 40px 40px;
    background-size: 60px;
    margin: 0 0 0 250px;
  }

  .descriptions__description--highSpeed {
    background-image: url('../../assets/icons/range/highSpeed-active.svg');

    button {
      background-image: url('../../assets/icons/range/highSpeed-inactive.svg');
      top: 0;
    }
  }

  .descriptions__description--extremeWeather {
    background-image: url('../../assets/icons/range/extremeWeather-active.svg');

    button {
      background-image: url('../../assets/icons/range/extremeWeather-inactive.svg');
      top: 75px;
    }
  }

  .descriptions__description--interiorClimate {
    background-image: url('../../assets/icons/range/interiorClimate-active.svg');

    button {
      background-image: url('../../assets/icons/range/interiorClimate-inactive.svg');
      top: 150px;
    }
  }

  .descriptions__description--towing {
    background-image: url('../../assets/icons/range/towing-active.svg');

    button {
      background-image: url('../../assets/icons/range/towing-inactive.svg');
      top: 225px;
    }
  }
</style>
