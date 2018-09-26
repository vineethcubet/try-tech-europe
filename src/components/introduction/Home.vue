<template>
  <div class="introduction">
    <div class="introduction__header">
      <div class="header__intro">
        <h1>Welcome to the <span class="accent">Future of Vehicles</span></h1>
        <p>From effortless charging and minimal maintenance to a dependable range, electric vehicles fit seamlessly into your life.</p>
      </div>
    </div>
    <div class="introduction__hero">
      <div class="introduction__range">
        <p>480 km range</p>
        <p>0-100 in 3.5 secs | AWD</p>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/Bus'

export default {
  name: 'Home',
  methods: {
    beginJourney () {
      Bus.$emit('navigate', 'range')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .introduction {
    background-image: url('../../assets/images/fast-yellow-car.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 300px center;
    color: $black;
    width: 100%;
    display: flex;
    flex-grow: 1;
    position: relative;
  }

  .introduction__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    width: 40%;
  }

  .header__intro {
    text-align: center;
    margin: 150px 0 0;
    width: 400px;
  }

  .header__intro {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    h1 {
      font-size: 2.5rem;
      font-weight: 100;
      text-transform: uppercase;

      .accent {
        font-size: 4.5rem;
        font-weight: bold;
        line-height: 4rem;
        display: block;
      }
    }
  }

  .introduction__hero {
    width: 60%;
  }

  .introduction__range {
    color: #FFF;
    box-sizing: border-box;
    position: absolute;
    bottom: 60px;
    right: 100px;

    p {
      text-shadow: 2px 2px 0px #000;

      &:first-of-type {
        text-transform: uppercase;
        font-size: 3rem;
      }

      &:last-of-type {
        font-size: 1.5rem;
      }
    }
  }
</style>
