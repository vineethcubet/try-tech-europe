<template>
  <div>
    <header class="maintenanceSavings__header">
      <div class="header__image"></div>
    </header>
    <ul data-qa="maintenance-savings-tabs"
        :class="['maintenanceSavings', activeClass].join(' ')">
      <li class="maintenanceSavings__saving maintenanceSavings__saving--cost">
        <button data-qa="cost-button"
                @click="active = 'cost'">Cost Electricity vs. Fuel</button>
        <h3>Cost: Electricity vs. Fuel</h3>
        <p>Charging a battery electric vehicle (BEV) typically costs around x.x cents per km, compared to a typical diesel fill up at x.x cents.</p>
        <p>The average BEV owner saves €XX per year on fuel.</p>
        <p>Find your savings with the savings calculator below.</p>
      </li>
      <li class="maintenanceSavings__saving maintenanceSavings__saving--parking">
        <button data-qa="parking-button"
                @click="active = 'parking'">Parking, crossing, &amp; congestion</button>
        <h3>Parking, crossing, &amp; congestion</h3>
        <p>In a battery electric vehicle, you can experience fewer or free costs for common expenses like parking, access to some city areas, and bridge, tunnel, & ferry crossings.</p>
        <p>Some public parking structures offer free BEV charging.</p>
      </li>
      <li class="maintenanceSavings__saving maintenanceSavings__saving--taxes">
        <button data-qa="taxes-button"
                @click="active = 'taxes'">Road tax exemptions</button>
        <h3>Road tax exemptions</h3>
        <p>Electric vehicle owners can receive a reduced cost or total exemption for the annual road tax required for standard fuel vehicles.</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MaintenanceSavings',
  data () {
    return {
      active: 'cost'
    }
  },
  computed: {
    activeClass () {
      return `maintenanceSavings--${this.active}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .header__image {
    background-image: url('../../assets/images/eurotrip.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: calc(100vh - 400px);
    margin: 0 auto;
    position: relative;
  }

  .maintenanceSavings {
    background-color: $dark-gray;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    overflow: hidden;

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
      height: 75px;
      width: 300px;
      padding: 20px 0 20px 80px;
    }

    &.maintenanceSavings--cost .maintenanceSavings__saving--cost,
    &.maintenanceSavings--parking .maintenanceSavings__saving--parking,
    &.maintenanceSavings--taxes .maintenanceSavings__saving--taxes {
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

    &.maintenanceSavings--cost .maintenanceSavings__saving--cost {
      button {
        background-image: url('../../assets/icons/savings/cost-active.svg');
      }
    }

    &.maintenanceSavings--parking .maintenanceSavings__saving--parking {
      button {
        background-image: url('../../assets/icons/savings/crossing-active.svg');
      }
    }

    &.maintenanceSavings--taxes .maintenanceSavings__saving--taxes {
      button {
        background-image: url('../../assets/icons/savings/tax-active.svg');
      }
    }
  }

  .maintenanceSavings__saving {
    background-repeat: no-repeat;
    background-position: 40px 40px;
    background-size: 60px;
    margin: 0 0 0 300px;
  }

  .maintenanceSavings__saving--cost {
    background-image: url('../../assets/icons/savings/cost-active.svg');

    button {
      background-image: url('../../assets/icons/savings/cost-inactive.svg');
      top: 0;
    }
  }

  .maintenanceSavings__saving--parking {
    background-image: url('../../assets/icons/savings/crossing-active.svg');

    button {
      background-image: url('../../assets/icons/savings/crossing-inactive.svg');
      top: 75px;
    }
  }

  .maintenanceSavings__saving--taxes {
    background-image: url('../../assets/icons/savings/tax-active.svg');

    button {
      background-image: url('../../assets/icons/savings/tax-inactive.svg');
      top: 150px;
    }
  }
</style>
