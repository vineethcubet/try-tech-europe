<template>
  <RecommendedCharging data-qa="chargingOptions"
                       class="chargingOptions__options">
    <template slot="high">
      <HomeFaster />
    </template>

    <template slot="medium">
      <HomeFast />
    </template>

    <template slot="low">
      <HomeBasic />
    </template>
  </RecommendedCharging>
</template>

<script>
import RecommendedCharging from '../RecommendedCharging'
import HomeFaster from './options/HomeFaster'
import HomeFast from './options/HomeFast'
import HomeBasic from './options/HomeBasic'

export default {
  name: 'ChargingOptions',
  components: {
    RecommendedCharging,
    HomeFaster,
    HomeFast,
    HomeBasic
  }
}
</script>
