<template>
  <div class="evMe">
    <div class="evMe__app">
      <img src="../../assets/images/evApp.png"
           alt="EVme app"/>
    </div>
    <div class="evMe__details">
      <h2>EVme app<br/><span class="subheader">coming soon!</span></h2>
      <p>Not sure a BEV would fit your lifestyle? Find out by tracking your<br/>driving habits with EV me.</p>
      <p>After a week, you’ll receive a detailed report with<br/>recommendations for electric vehicles that would suit you best.</p>
      <p>Enter your email and we’ll send you a notification when the app<br/>launches.</p>
      <p class="evMe__updates">
        <FeatureNotAvailable text="Sign up for updates"
                           classes="button--tertiary" />
      </p>
    </div>
    <div class="evMe__clear"></div>
  </div>
</template>

<script>
import FeatureNotAvailable from '../FeatureNotAvailable'

export default {
  name: 'EvMe',
  components: {
    FeatureNotAvailable
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .evMe {
    margin: 45px 0 20px;
  }

  .evMe__details {
    background-color: $light-gray;
    padding: 150px 100px;
    margin: 20px 0 0;

    h2 {
      text-transform: none;
    }

    .subheader {
      font-weight: normal;
      margin: 20px 0;
    }
  }

  .evMe__updates {
    display: inline-block;
    margin: 40px 0 0;
  }

  .evMe__app {
    text-align: center;
    float: right;
    width: 50%;
    margin: -20px 0 0;
  }

  .evMe__clear {
    clear: right;
  }
</style>
