<template>
  <div class="summary">
    <section class="summary__content">
      <div class="summary__contentGroup">
        <h2>My Summary</h2>
        <p>Based on your BEV experience, below are recommendations for the EV tailored to your drive time and lifestyle.</p>
      </div>
      <div class="summary__contentGroup">
        <h3>My Explored Route</h3>
        <DriveSummary />
      </div>
      <div class="summary__contentGroup">
        <h3>My Recommended Charger</h3>
        <ChargingSummary />
      </div>
      <FeatureNotAvailable text="Design your BEV"
                           classes="button--tertiary" />
    </section>
  </div>
</template>

<script>
import DriveSummary from '@/components/range/drive/DriveSummary'
import ChargingSummary from '@/components/charging/ChargingSummary'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  name: 'Summary',
  components: {
    FeatureNotAvailable,
    ChargingSummary,
    DriveSummary
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/components/floatingBox';

  .summary {
    @include floatingBox;

    background-image: url('../assets/images/ev-on-road-half.png');
    background-size: auto 740px;
    background-repeat: no-repeat;
    background-position: top 40px right 20px;
    height: 800px;
    margin: 0 0 20px;
    padding: 40px 20px 20px 40px;
    border-radius: 8px;
  }

  .summary__content {
    width: 45%;
  }

  .summary__contentGroup {
    margin: 0 0 20px;

    &:first-of-type {
      min-height: 0;
    }
  }
</style>
