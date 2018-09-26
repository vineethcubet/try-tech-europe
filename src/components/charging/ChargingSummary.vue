<template>
  <div>
    <p data-qa="complete-lifestyle-quiz"
       v-if="!this.quizComplete">
      Easily figure out which electric vehicle charger is right for you by completing the <a data-qa="return-to-charging-section"
                                                                                             @click="returnToLifestyleQuiz">Charging Quiz</a>.
    </p>
    <div id="chargingSummaryRecommended">
      <ChargingOptions v-if="dwellingType === 'house'"/>
      <PublicChargingOptions v-if="dwellingType === 'apartment'"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Bus from '@/Bus'
import ChargingOptions from './home/ChargingOptions'
import PublicChargingOptions from './destination/PublicChargingOptions'

export default {
  name: 'ChargingSummary',
  computed: {
    ...mapGetters([
      'dwellingType',
      'chargingRecommendation'
    ]),
    quizComplete () {
      return this.dwellingType !== '' && this.chargingRecommendation > 0
    }
  },
  methods: {
    returnToLifestyleQuiz () {
      Bus.$emit('navigate', 'home')
    }
  },
  components: {
    PublicChargingOptions,
    ChargingOptions
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  header {
    * {
      float: left;
    }

    & + * {
      clear: left;
    }
  }
</style>
