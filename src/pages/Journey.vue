<template>
  <div class="journey">
    <div class="journey__nav">
      <Navigation />
      <div>&nbsp;</div>
    </div>
    <div class="journey__body">
      <a name="home"></a>
      <section class="journey__page journey__page--introduction">
        <Home />
      </section>
      <a name="route"></a>
      <section data-qa="range-journey"
               class="journey__page journey__page--route">
        <PopularRoute />
      </section>
      <a name="map"></a>
      <section data-qa="range-journey"
               class="journey__page journey__page--range">
        <InteractiveMap class="interactiveMap__map" />
      </section>
      <a name="range"></a>
      <section class="journey__page">
        <UnderstandRange />
      </section>
      <a name="charging"></a>
      <section data-qa="charging-journey"
               class="journey__page journey__page--charging">
        <Charging/>
      </section>
      <a name="maintenance"></a>
      <section data-qa="maintenance-journey"
               class="journey__page journey__page--maintenance">
        <Maintenance />
      </section>
      <a name="connectedConvenient"></a>
      <section data-qa="connected-convenient"
               class="journey__page journey__page--connectedConvenient">
        <ConnectedConvenient />
      </section>
      <a name="summary"></a>
      <section data-qa="journey-progress"
               class="journey__page journey__page--summary">
        <InnerScroll>
          <Summary />
          <EvMe />
          <Community />
        </InnerScroll>
      </section>
    </div>
  </div>
</template>

<script>
import Home from '@/components/introduction/Home'
import InteractiveMap from '@/components/range/InteractiveMap'
import PopularRoute from '@/components/range/PopularRoute'
import Maintenance from '@/components/maintenance/Introduction'
import EvMe from '@/components/evMe/EvMe'
import Charging from '@/components/charging/Charging'
import Community from '@/components/community/Community'
import UnderstandRange from '@/components/range/UnderstandRange'
import Summary from '@/components/Summary'
import SnapScroll from '@/services/SnapScroll'
import Navigation from '@/components/Navigation'
import ConnectedConvenient from '@/components/maintenance/ConnectedConvenient'
import InnerScroll from '@/components/InnerScroll'

export default {
  name: 'Journey',
  mounted () {
    new SnapScroll(
      Array.from(document.getElementsByClassName('journey'))
    )
  },
  components: {
    InnerScroll,
    ConnectedConvenient,
    Navigation,
    Home,
    Charging,
    EvMe,
    PopularRoute,
    InteractiveMap,
    Maintenance,
    Community,
    UnderstandRange,
    Summary
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/config';

  .journey {
    display: flex;
  }

  .journey__nav > * {
    background-color: $light-gray;
    width: 50px;
  }

  .journey__body {
    flex-grow: 1;
  }

  .journey__page {
    background-color: #FFF;
    min-height: 100vh;
    width: calc(100vw - 50px);

    &.journey__page--introduction,
    &.journey__page--savingsCalculator,
    &.journey__page--maintenance,
    &.journey__page--summary,
    &.journey__page--faq,
    &.journey__page--community,
    &.journey__page--evMe,
    &.journey__page--charging {
      display: flex;
      flex-direction: column;
    }

    &.journey__page--savingsCalculator,
    &.journey__page--maintenance,
    &.journey__page--summary,
    &.journey__page--faq,
    &.journey__page--community,
    &.journey__page--evMe,
    &.journey__page--charging {
      align-items: center;
      justify-content: center;
    }
  }
</style>
