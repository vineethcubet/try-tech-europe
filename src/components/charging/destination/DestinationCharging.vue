<template>
  <div data-qa="destination-charging"
       class="destinationCharging">
    <img class="destinationCharging__chargingMap"
         src="../../../assets/images/public-charging-map.png"
         alt="Public charging station map" />
    <img class="destinationCharging__chargingDetailsImage"
         src="../../../assets/images/chargeStation-details.png"
         alt="Charging station details" />
    <img class="destinationCharging__markerImage"
         src="../../../assets/icons/chargingStation.png"
         alt="Charging station marker" />
    <div class="destinationCharging__details">
      <div class="destinationCharging__details__info">
        <p>With over <span class="bold">10,000 charging stations nationwide,</span> and conveniently located near work,
          shopping and entertainment, charging your EV on the road has never been easier.</p>
      </div>
      <ol class="destinationCharging__steps">
        <li>Locate a charger</li>
        <li>Pay with card or app</li>
        <li>Plug in your EV</li>
        <li>Work, shop, or play</li>
      </ol>
    </div>
    <PublicChargingOptions />
    <ChargingNetwork />
  </div>
</template>

<script>
import ChargingNetwork from './ChargingNetwork'
import PublicChargingOptions from './PublicChargingOptions'

export default {
  name: 'DestinationCharging',
  components: {
    PublicChargingOptions,
    ChargingNetwork
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/config";
  @import "../../../assets/scss/components/chargingLearnMore";

  .destinationCharging__steps {
    @extend .charging__steps;
  }

  @media screen and (min-width: $desktop-minimum) {
    .destinationCharging {
      position: relative;

      .destinationCharging__chargingMap {
        height: 700px;
      }

      .destinationCharging__markerImage {
        position: absolute;
        top: 600px;
        left: 300px;
      }

      .destinationCharging__chargingDetailsImage {
        position: absolute;
        top: 110px;
        left: 270px;
      }
    }

    .destinationCharging__details {
      position: absolute;
      width: 25%;
      top: 50px;
      left: 1020px;
      display: flex;
      flex-direction: column;

      .destinationCharging__details__info {
        p {
          font-size: 1rem;
        }
      }
    }
  }
</style>
