<template>
  <div class="roadMap">
    <div class="roadMap__costs">
      <div class="costs__summary costs__summary--electronic">
        <p>Electric vehicle</p>
        <p>Maintenance costs over 5 years: <span class="bold">€95</span></p>
      </div>
      <div class="costs__summary costs__summary--gasoline">
        <p>Petrol vehicle</p>
        <p>Maintenance costs over 5 years: <span class="bold">€675</span></p>
      </div>
    </div>
    <div class="roadMap__controls">
      <button @click="scrollLeft">&larr;</button>
      <button @click="scrollRight">&rarr;</button>
    </div>
    <div class="roadMap__intervals"
         ref="intervals">
      <ol class="intervals__list">
        <li class="intervals__interval intervals__interval--first">
          <ul>
            <li class="interval__ice">
              <ul>
                <li class="interval__item">Oil change<div class="item__cost">€60</div></li>
                <li class="interval__total">Total<div class="item__cost">€60</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="intervals__interval intervals__interval--second">
          <ul>
            <li class="interval__bev">
              <ul>
                <li class="interval__item">Cabin air filter<div class="item__cost">€15</div></li>
                <li class="interval__total">Total<div class="item__cost">€15</div></li>
              </ul>
            </li>
            <li class="interval__ice">
              <ul>
                <li class="interval__item">Oil change<div class="item__cost">€60</div></li>
                <li class="interval__item">Cabin air filter<div class="item__cost">€15</div></li>
                <li class="interval__total">Total<div class="item__cost">€75</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="intervals__interval intervals__interval--third">
          <ul>
            <li class="interval__ice">
              <ul>
                <li class="interval__item">Oil change<div class="item__cost">€60</div></li>
                <li class="interval__item">Air filter<div class="item__cost">€25</div></li>
                <li class="interval__total">Total<div class="item__cost">€85</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="intervals__interval intervals__interval--fourth">
          <ul>
            <li class="interval__bev">
              <ul>
                <li class="interval__item">Cabin air filter<div class="item__cost">€15</div></li>
                <li class="interval__item">Brake fluid<div class="item__cost">€50</div></li>
                <li class="interval__total">Total<div class="item__cost">€65</div></li>
              </ul>
            </li>
            <li class="interval__ice">
              <ul>
                <li class="interval__item">Oil change<div class="item__cost">€60</div></li>
                <li class="interval__total">Total<div class="item__cost">€60</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="intervals__interval intervals__interval--fifth">
          <ul>
            <li class="interval__ice">
              <ul>
                <li class="interval__item">Oil change<div class="item__cost">€60</div></li>
                <li class="interval__total">Total<div class="item__cost">€60</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="intervals__interval intervals__interval--sixth">
          <ul>
            <li class="interval__bev">
              <ul>
                <li class="interval__item">Cabin air filter<div class="item__cost">€15</div></li>
                <li class="interval__total">Total<div class="item__cost">€15</div></li>
              </ul>
            </li>
            <li class="interval__ice">
              <ul>
                <li class="interval__item">Oil change<div class="item__cost">€60</div></li>
                <li class="interval__item">Air filter<div class="item__cost">€50</div></li>
                <li class="interval__item">Cabin air filter<div class="item__cost">€15</div></li>
                <li class="interval__total">Total<div class="item__cost">€125</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="intervals__interval intervals__interval--seventh">
          <ul>
            <li class="interval__ice">
              <ul>
                <li class="interval__item">Oil change<div class="item__cost">€60</div></li>
                <li class="interval__item">Coolant<div class="item__cost">€150</div></li>
                <li class="interval__total">Total<div class="item__cost">€210</div></li>
              </ul>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import animate from '@/services/animate'

export default {
  name: 'RoadMap',
  methods: {
    scrollLeft () {
      animate(this.$refs.intervals, this.doScrollLeft, 220)
    },
    scrollRight () {
      animate(this.$refs.intervals, this.doScrollRight, 220)
    },
    doScrollLeft (scale) {
      this.$refs.intervals.scrollLeft -= scale
    },
    doScrollRight (scale) {
      this.$refs.intervals.scrollLeft += scale
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .roadMap {
    display: flex;
    align-items: center;
    margin: 50px 0;
  }

  .roadMap__costs,
  .roadMap__intervals {

  }

  .roadMap__costs {
    width: 450px;
  }

  .costs__summary {
    background-size: contain;
    background-repeat: no-repeat;
    padding: 0 0 0 75px;

    p:first-of-type {
      text-transform: uppercase;
    }
  }

  .costs__summary--electronic {
    background-image: url('../../assets/icons/electric-dark.png');
    margin: 0 0 100px;
  }

  .costs__summary--gasoline {
    background-image: url('../../assets/icons/gas-dark.png');
  }

  .roadMap__controls {
    text-align: center;
    width: 60px;

    button {
      background-color: $dark-gray;
      font-size: 1.75rem;
      border: none;
      border-radius: 20px;
      display: block;

      &:hover {
        background-color: $darker-gray;
      }

      &:first-of-type {
        margin: 0 0 10px;
      }
    }
  }

  .roadMap__intervals {
    overflow: hidden;
    width: 930px;
  }

  .intervals__list {
    background-color: $ev-green;
    list-style: none;
    position: relative;
    width: 1540px;
    height: 10px;
    margin: 220px 0;
    padding: 0;
    border-radius: 10px;
  }

  .intervals__interval {
    position: absolute;

    ul {
      list-style: none;
      padding: 0;
    }

    &::before {
      background-color: $solar-orange;
      font-weight: bold;
      color: #FFF;
      text-align: center;
      top: -15px;
      left: 78px;
      position: absolute;
      padding: 9px 10px;
      border-radius: 50px;
    }
  }

  .interval__bev,
  .interval__ice {
    background-color: #FFF;
    position: absolute;
    width: 200px;
    height: 150px;
    padding: 10px;
    border: 1px solid #E1E1E1;
    box-sizing: border-box;
    box-shadow: 3px 3px 10px #EAEAEA;
    border-radius: 5px;

    &::after {
      background-color: #FFF;
      content: " ";
      position: absolute;
      left: 100px - 14px;
      height: 30px;
      width: 30px;
      transform: rotate(45deg);
    }
  }

  .interval__bev {
    top: -195px;

    &::after {
      bottom: -15px;
      border-right: 1px solid #EAEAEA;
      border-bottom: 1px solid #EAEAEA;
    }
  }

  .interval__ice {
    bottom: -205px;

    &::after {
      top: -15px;
      border-left: 1px solid #EAEAEA;
      border-top: 1px solid #EAEAEA;
    }
  }

  .interval__item {

  }

  .interval__total {
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
    border-top: 2px solid $dark-gray;
  }

  .item__cost {
    font-weight: bold;
    float: right;
  }

  .intervals__interval--first {
    left: 0px;

    &::before {
      content: "10K";
    }
  }

  .intervals__interval--second {
    left: 220px;

    &::before {
      content: "20K";
    }
  }

  .intervals__interval--third {
    left: 440px;

    &::before {
      content: "30K";
    }
  }

  .intervals__interval--fourth {
    left: 660px;

    &::before {
      content: "40K";
    }
  }

  .intervals__interval--fifth {
    left: 880px;

    &::before {
      content: "50K";
    }
  }

  .intervals__interval--sixth {
    left: 1100px;

    &::before {
      content: "60K";
    }
  }

  .intervals__interval--seventh {
    left: 1320px;

    &::before {
      content: "70K";
    }
  }
</style>
