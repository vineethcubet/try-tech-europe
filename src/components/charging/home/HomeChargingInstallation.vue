<template>
    <div class="chargingInstallation">
      <div class="chargingInstallation__details">
        <h3>Home charging installation</h3>
        <div class="chargingInstallation__info">
          <p>A certified electrician makes home charging installation painless by providing an estimate for time and cost.</p>
          <p>Since each home is unique, installation can range from $500 - $1200. Most installations can be completed within two weeks of scheduling.</p>
          <p>Electricians can also educate owners on proper care of the charging units.</p>
          <p>Live in an apartment or condo? You can still enjoy the benefits of home charging, contact your homeowner’s association for details.</p>
        </div>
        <div class="chargingInstallation__learnMore">
          <p>Find an electrician near you <a href="https://www.qmeritcharging.com/" target="_blank">
            <img src="../../../assets/icons/learnMore.png"
                 alt=""/>
          </a></p>
        </div>
      </div>
        <div class="chargingInstallation__image">
          <img src="../../../assets/images/electrician.png"
               alt="" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'HomeChargingInstallation'
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/config";

  .chargingInstallation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 40px 0 40px 0;
  }

  .chargingInstallation__details {
    width: 30%;
    margin: 20px;

    h3 {
      text-transform: uppercase;
      line-height: 2rem;
    }

    .chargingInstallation__learnMore {
      margin: 20px 0;

      img {
        vertical-align: middle;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

</style>
