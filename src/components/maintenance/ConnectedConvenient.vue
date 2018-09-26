<template>
<div class="connectedConvenient">
  <header class="connectedConvenient__header">
    <div class="header__text">
      <h2>Connected &amp; <div>Convenient</div></h2>
      <div class="header__copy">
        <p>In a battery electric vehicle, you’re covered with automatic updates and roadside assistance options that come to you-- keeping you out of the shop and on the road.</p>
      </div>
    </div>
  </header>
  <ul data-qa="connectedConvenient-tabs"
      :class="['connectedConvenient__descriptions', activeClass].join(' ')">
    <li data-qa="otaUpdates-tab"
        class="descriptions__description descriptions__description--otaUpdates">
      <button data-qa="otaUpdates-button"
              @click="active = 'otaUpdates'">OTA Updates</button>
      <h3>Over-the-Air Updates</h3>
      <p>Seamless vehicle software updates that can be schedule to fit your routine.</p>
      <p>Updates can be scheduled for specific times of day or happen seamlessly in the background. During an update, your vehicle remains operational.</p>
      <p>Your vehicle owner app provides access to full update details, so you know exactly what is improving.</p>
      <p><span class="bold">Updates include:</span> performance and safety updates</p>
    </li>
    <li data-qa="remoteDiagnostics-tab"
        class="descriptions__description descriptions__description--remoteDiagnostics">
      <button data-qa="remoteDiagnostics-button"
              @click="active = 'remoteDiagnostics'">Remote Diagnostics</button>
      <h3>Remote Diagnostics</h3>
      <p>Since your electric vehicle is always connected, issues can be remotely diagnosed, including what is needed to repair the issue.</p>
      <p>If your electric vehicle needs service, simply notify your dealership to schedule service. On the day of service, a mobile service van
        comes to your location - whether that’s home, work, or play - and makes necessary repairs on-site.</p>
      <p><span class="bold">Services include:</span> belt replacements and tire rotations</p>
    </li>
    <li data-qa="maintenanceAlerts-tab"
        class="descriptions__description descriptions__description--maintenanceAlerts">
      <button data-qa="maintenanceAlerts-button"
              @click="active = 'maintenanceAlerts'">Maintenance Alerts</button>
      <h3>Maintenance Alerts</h3>
      <p>Smart alerts communicate what your electric vehicle needs, like a tire rotation.</p>
      <p>When your EV needs maintenance, you’ll be notified and given the option to order replacement parts, delivered directly to you.
          The new part will include links to an online video explaining how to complete the installation.
          Installation of most parts will take approximately 5 mins.</p>
      <p><span class="bold">DIY maintenance includes:</span> replacing cabin air filter</p>
    </li>

    <li data-qa="roadsideAssistance-tab"
        class="descriptions__description descriptions__description--roadsideAssistance">
      <button data-qa="roadsideAssistance-button"
              @click="active = 'roadsideAssistance'">Roadside Assistance</button>
      <h3>Roadside Assistance</h3>
      <p><span class="bold">Pickup & Swap:</span> A roadsideAssistance service will deliver a loaner vehicle to your location and tow your battery electric vehicle to the nearest repair shop.</p>
      <p><span class="bold">Nearest Charger:</span> A roadsideAssistance service will come to your location and escort you and your electric vehicle home or to the nearest charging station.*</p>
      <p>*within 35 mile range. On average, electric vehicle owners are within 35 miles of a public charging station due to over 10,000 charging stations across the nation.</p>
    </li>

  </ul>
</div>
</template>

<script>
export default {
  name: 'ConnectedConvenient',
  data () {
    return {
      active: 'otaUpdates'
    }
  },
  computed: {
    activeClass () {
      return `connectedConvenient__descriptions--${this.active}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .connectedConvenient__header {
    background-image: url('../../assets/images/connected.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #FFF;
    height: calc(100vh - 400px);
    margin: 0 auto;
    position: relative;
  }

  .header__text {
    position: absolute;
    left: 25px;
    bottom: 25px;
    width: 460px;
  }

  .connectedConvenient__descriptions {
    background-color: $dark-gray;
    height: 400px;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;

    h3, p {
      display: none;
    }

    button {
      background-color: $dark-gray;
      background-repeat: no-repeat;
      background-position: 30px center;
      background-size: 30px;
      color: $darker-gray;
      font-size: 1rem;
      text-align: left;
      border: none;
      position: absolute;
      top: 20px;
      left: 0;
      z-index: 1000;
      padding: 0 0 0 80px;
      width: 250px;
      height: 75px;
    }

    &.connectedConvenient__descriptions--otaUpdates .descriptions__description--otaUpdates,
    &.connectedConvenient__descriptions--remoteDiagnostics .descriptions__description--remoteDiagnostics,
    &.connectedConvenient__descriptions--maintenanceAlerts .descriptions__description--maintenanceAlerts,
    &.connectedConvenient__descriptions--roadsideAssistance .descriptions__description--roadsideAssistance {
      background-color: #FFF;
      height: 400px;
      padding: 50px 0 0 130px;
      box-sizing: border-box;

      button {
        background-color: #FFF;
        color: $black;
        box-shadow: -3px 2px 5px $darker-gray;
        z-index: 1001;
      }

      h3, p {
        display: block;
        width: 70%;
      }
    }

    &.connectedConvenient__descriptions--otaUpdates .descriptions__description--otaUpdates {
      button {
        background-image: url('../../assets/icons/connectedConvenient/otaUpdates-active.svg');
      }
    }

    &.connectedConvenient__descriptions--remoteDiagnostics .descriptions__description--remoteDiagnostics {
      button {
        background-image: url('../../assets/icons/connectedConvenient/remoteDiagnostics-active.svg');
      }
    }

    &.connectedConvenient__descriptions--maintenanceAlerts .descriptions__description--maintenanceAlerts {
      button {
        background-image: url('../../assets/icons/connectedConvenient/maintenanceAlerts-active.svg');
      }
    }

    &.connectedConvenient__descriptions--roadsideAssistance .descriptions__description--roadsideAssistance {
      button {
        background-image: url('../../assets/icons/connectedConvenient/roadsideAssistance-active.svg');
      }
    }

  }

  .descriptions__description {
    background-repeat: no-repeat;
    background-position: 40px 40px;
    background-size: 60px;
    margin: 0 0 0 250px;
  }

  .descriptions__description--otaUpdates {
    background-image: url('../../assets/icons/connectedConvenient/otaUpdates-active.svg');

    button {
      background-image: url('../../assets/icons/connectedConvenient/otaUpdates-inactive.svg');
      top: 0;
    }
  }

  .descriptions__description--remoteDiagnostics {
    background-image: url('../../assets/icons/connectedConvenient/remoteDiagnostics-active.svg');

    button {
      background-image: url('../../assets/icons/connectedConvenient/remoteDiagnostics-inactive.svg');
      top: 75px;
    }
  }

  .descriptions__description--maintenanceAlerts {
    background-image: url('../../assets/icons/connectedConvenient/maintenanceAlerts-active.svg');

    button {
      background-image: url('../../assets/icons/connectedConvenient/maintenanceAlerts-inactive.svg');
      top: 150px;
    }
  }

  .descriptions__description--roadsideAssistance {
    background-image: url('../../assets/icons/connectedConvenient/roadsideAssistance-active.svg');

    button {
      background-image: url('../../assets/icons/connectedConvenient/roadsideAssistance-inactive.svg');
      top: 225px;
    }
  }
</style>
