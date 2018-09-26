<template>
  <div data-qa="home-charging">
    <div class="homeCharging">
      <div class="homeCharging__details">
        <div class="homeCharging__details__info">
          <p>Home charging keeps your electric vehicle ready, so you can go further with fewer interruptions. Simply select from convenient charging options to get started</p>
        </div>
        <ol class="homeCharging__steps">
          <li>Plug in when you arrive home</li>
          <li>Set your charging schedule</li>
          <li>Live your life</li>
        </ol>
      </div>
    </div>
    <ChargingOptions />
    <HomeChargingInstallation />
    <ChargingReminders/>
  </div>
</template>

<script>
import ChargingReminders from '@/components/charging/home/ChargingReminders'
import HomeChargingInstallation from '@/components/charging/home/HomeChargingInstallation'
import ChargingOptions from './ChargingOptions'

export default {
  name: 'HomeCharging',
  components: {
    ChargingOptions,
    ChargingReminders,
    HomeChargingInstallation
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/config';
  @import "../../../assets/scss/components/chargingLearnMore";

  .homeCharging {
    background-image: url('../../../assets/images/home-charging.png');
    background-size: contain;
    background-position: right center;
    background-repeat: no-repeat;
    height: 700px;
  }

  .homeCharging__details {
    width: 400px;
    margin: 0 0 0 100px;
    padding: 50px 0 0;
  }

  .homeCharging__steps {
    @extend .charging__steps;
  }
</style>
