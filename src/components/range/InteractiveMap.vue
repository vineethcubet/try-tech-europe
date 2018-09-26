<template>
  <div class="interactiveMap">
    <div class="routeWizardContainer">
      <RouteWizard />
    </div>
    <div class="driveVisualizerContainer">
      <DriveVisualizer />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import RouteWizard from '@/components/range/drive/RouteWizard'
import DriveVisualizer from '@/components/range/drive/DriveVisualizer'

export default {
  name: 'InteractiveMap',
  computed: mapGetters(['route']),
  components: {
    RouteWizard,
    DriveVisualizer
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .interactiveMap {
    display: flex;
    height: 100vh;
  }

  .driveVisualizerContainer {
    width: 70%;
  }

  .routeWizardContainer {
    width: 30%;
  }

</style>
