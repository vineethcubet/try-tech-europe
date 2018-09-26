<template>
  <p class="loadingPane"
     data-qa="loading-pane">
    <img src="../../../../assets/images/loading.gif"
         alt="Loading route..." />
    Loading your route&hellip;
  </p>
</template>

<script>
export default {
  name: 'LoadingRoutePane'
}
</script>

<style lang="scss" scoped>
  .loadingPane {
    text-align: center;
    padding: 50px 0;

    img {
      vertical-align: middle;
      margin: 0 20px 0 0;
    }
  }
</style>
