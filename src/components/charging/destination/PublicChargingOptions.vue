<template>
  <RecommendedCharging>
    <template slot="high">
      <SaverCharging />
    </template>

    <template slot="medium">
      <FixedCharging />
    </template>

    <template slot="low">
      <UnlimitedCharging />
    </template>
  </RecommendedCharging>
</template>

<script>
import RecommendedCharging from '../RecommendedCharging'
import SaverCharging from './options/SaverCharging'
import UnlimitedCharging from './options/UnlimitedCharging'
import FixedCharging from './options/FixedCharging'

export default {
  name: 'PublicChargingOptions',
  components: {
    FixedCharging,
    UnlimitedCharging,
    SaverCharging,
    RecommendedCharging
  }
}
</script>
