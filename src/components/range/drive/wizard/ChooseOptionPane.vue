<template>
  <div class="routeWizard__pane routeWizard__pane--chooseOption"
       data-qa="choose-option-pane">
    <div>
      <button data-qa="full-route-option"
              class="button button--routeWizard"
              @click="$emit('optionChosen', 'tripOrCommute')">Explore a road trip or daily commute</button>
    </div>
    <div>
      <p class="bold">or</p>
    </div>
    <div>
      <button data-qa="explore-charging-option"
              class="button button--routeWizard"
              @click="$emit('optionChosen', 'exploreCharging')">Find charging near you</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseOptionPane'
}
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/config';

  .routeWizard__pane--chooseOption div {
    margin: 0 0 20px;
  }

  .button--routeWizard {
    position: relative;
    box-sizing: border-box;
  }
</style>
