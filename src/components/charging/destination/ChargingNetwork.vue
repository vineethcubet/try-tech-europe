<template>
  <div class="chargingNetwork">
    <div class="chargingNetwork__image">
      <img src="../../../assets/images/charging-network.png"
           alt="Charging Network"/>
    </div>
    <div class="chargingNetwork__details">
      <h3>Public charging network</h3>
      <h4>Access a preferred network of charging stations</h4>
      <div class="chargingNetwork__details__content">
        <p>Gain access to a premium public charging experience</p>
        <p>Easily find a place to charge in convenient parking locations </p>
        <p>Receive charge status notifications</p>
        <p>Easily pay through the app* </p>
        <p class="italic">*Many charging stations are free to use, but check the app and station display for fees</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChargingNetwork'
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/config";

  .chargingNetwork {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 40px 0 40px 0;
    background-color: $light-gray;
  }

  .chargingNetwork__image {
    width: 30%;

    img {
      margin: 10px;
    }
  }

  .chargingNetwork__details {
    margin: 40px;
    width: 35%;

    h3, h4 {
      text-transform: uppercase;
    }

    h4 {
      font-weight: normal;
      font-size: 1rem;
    }

    .chargingNetwork__details__content {
      margin: 20px 0 20px 0;

      p {
        font-size: 1rem;
      }
    }

  }

</style>
