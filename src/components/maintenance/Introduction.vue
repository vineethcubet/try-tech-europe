<template>
  <InnerScroll class="maintenance">
    <div class="maintenance__hero"
         data-qa="maintenance-banner">
      <h2 class="hero__title">Discover all the ways you can save in an electric car</h2>
      <div class="hero__wrapper">
        <p class="hero__intro">Save money with less required maintenance, low charging costs, and tax incentives.</p>
        <div class="hero__costs">
          <div class="cost__description">
            <p class="cost__label">Maintenance Savings</p>
            <p class="cost__value">€700</p>
            <p class="cost__disclaimer">Average maintenance<br/>savings over 5 years</p>
          </div>
          <div class="cost__description">
            <p class="cost__label">Fuel Savings</p>
            <p class="cost__value">€984</p>
            <p class="cost__disclaimer">Average savings on<br/>gas over 5 years</p>
          </div>
          <div class="cost__description">
            <p class="cost__label">Other Savings</p>
            <p class="cost__value">€109</p>
            <p class="cost__disclaimer">Additional average<br/>savings over 5 years</p>
          </div>
        </div>
      </div>
    </div>
    <div class="maintenance__section maintenance__section--roadmap">
      <h2 class="center">Save up to 40% on maintenance costs</h2>
      <p class="center">With worry-free maintenance and service, and an 8 year/100,000 mile warranty,<br/>we have you covered from frunk to trunk. Plus, you’ll no longer have a need for oil changes, engine<br/>air filters or cooler replacements.</p>
      <RoadMap />
    </div>
    <div class="maintenance__section">
      <SavingsCalculator/>
    </div>
    <div class="maintenance__savings">
      <MaintenanceSavings />
    </div>
  </InnerScroll>
</template>

<script>
import MaintenanceSavings from './MaintenanceSavings'
import SavingsCalculator from './SavingsCalculator'
import InnerScroll from '../InnerScroll'
import RoadMap from './RoadMap'

export default {
  name: 'Maintenance',
  components: {
    RoadMap,
    InnerScroll,
    SavingsCalculator,
    MaintenanceSavings
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';
  @import '../../assets/scss/components/floatingBox';

  .maintenance {
    height: 100vh;
    overflow: auto;
  }

  .maintenance__section {
    margin: 40px 0 0;
  }

  .maintenance__hero {
    background-image: url('../../assets/images/headtohead.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
    color: #FFF;
    height: 200px;
    min-height: 800px;
    padding: 40px 0 0;
    box-sizing: border-box;
    position: relative;
  }

  .maintenance__section--roadmap {
    @include floatingBox;

    margin: 20px 0;
    width: $wrapper-width-desktop;
    max-width: 100%;
    padding-top: 30px;
  }

  .hero__wrapper {
    text-align: center;
    width: 55%;
    margin: 0 auto;
  }

  .hero__title {
    font-weight: normal;
    text-align: center;
    width: 75%;
    margin: 10px auto;
  }

  .hero__intro {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: .8rem;
    font-weight: normal;
  }

  .hero__costs {
    display: flex;
    margin: 40px 0 0;
  }

  .cost__description,
  .cost__divider {
    background-repeat: no-repeat;
    background-position: top center;
  }

  .cost__description {
    width: 330%;
    padding: 75px 0 0;

    &:first-of-type {
      background-image: url('../../assets/icons/maintenance-savings.png');
    }

    &:nth-of-type(2n) {
      background-image: url('../../assets/icons/fuel-savings.png');
    }

    &:last-of-type {
      background-image: url('../../assets/icons/other-savings.png');
    }
  }

  .cost__label {
    text-transform: uppercase;
  }

  .cost__value {
    font-size: 4rem;
    line-height: 4rem;
  }

  .cost__disclaimer {
    font-size: .8rem;
  }
</style>
