<template>
  <div class="publicCharging">
    <div>
      <img src="../../../assets/images/public-charging.png"
           alt="Public charging"/>
    </div>
    <div>
      <p>Living in an apartment or condo won't exclude you from the joys of owning an electric vehicle. Inquire with your property manager or homeowner's association about the possibility of having electric vehicle charging units installed.</p>
      <p>Installation isn't possible? We still have you covered with a network of public charging stations.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicCharging'
}
</script>

<style lang="scss" scoped>
.publicCharging {
  display: flex;
  align-items: center;

  & > div {
    flex-grow: 1;
    flex-basis: 0;

    &:first-of-type {
      text-align: center;
    }
  }

  img {
    width: 300px;
  }
}
</style>
