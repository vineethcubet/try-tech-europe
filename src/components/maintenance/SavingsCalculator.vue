<template>
  <div class="savingsCalculator">
    <header class="savingsCalculator__header">
      <h2>Discover Your Savings</h2>
      <p>See your annual petrol and maintenance savings when you drive an electric vehicle</p>
    </header>
    <form class="savingsCalculator__form"
          data-qa="calculate-savings-form"
          @submit.prevent="calculateSavings">
      <label for="mpg">I get</label>
      <select id="mpg"
              data-qa="mpg-field"
              v-model.number="litersPerHundredKms">
        <option value="0" disabled>-- l/100km</option>
        <option value="3">3 l/100km</option>
        <option value="4">4 l/100km</option>
        <option value="5">5 l/100km</option>
        <option value="6">6 l/100km</option>
        <option value="7">7 l/100km</option>
        <option value="8">8 l/100km</option>
        <option value="9">9 l/100km</option>
        <option value="10">10 l/100km</option>
      </select>
      <label for="miles-per-year">and I drive approximately</label>
      <select id="miles-per-year"
              data-qa="annual-mileage-field"
              v-model.number="kmsDrivenPerYear">
        <option value="0" disabled>-- km/year</option>
        <option value="10000">10,000 km/year</option>
        <option value="20000">20,000 km/year</option>
        <option value="30000">30,000 km/year</option>
        <option value="40000">40,000 km/year</option>
        <option value="50000">50,000 km/year</option>
        <option value="60000">60,000 km/year</option>
        <option value="70000">70,000 km/year</option>
        <option value="80000">80,000 km/year</option>
      </select>
      <div class="form__buttonRow">
        <button class="button button--tertiary">Show my savings</button>
      </div>
    </form>
    <div class="savingsCalculator__result">
      <h3>You could save up to</h3>
      <p class="result__totalSavings"
         data-qa="total-savings">{{ formattedTotalSavings }}</p>
      <h3>per year in an electric vehicle</h3>
      <div class="result__details">
        <div class="details__gasSavings">
          <p>Annual petrol savings: <span data-qa="annual-cost-of-gas">{{ formattedAnnualCostOfPetrol }}</span></p>
          <p>(based on EU average of €1.30/liter of Super 95) </p>
        </div>
        <div class="details__electricityCosts">
          <p>Annual electricity costs: <span data-qa="annual-cost-of-electricity">{{ formattedAnnualCostOfElectricity }}</span></p>
          <p>(based on €0.30 kWh EU average)</p>
        </div>
        <div class="details__maintenanceSavings">
          <p>Maintenance savings: + €100</p>
          <p>(based on EU averages for oil &amp; fluid changes)</p>
        </div>
      </div>
      <p class="savingsCalculator__disclaimer">Depending on your country of residence, you may qualify for additional savings. Talk to your electricity provider about potential additional savings and rebates in your area.</p>
    </div>
  </div>
</template>

<script>
const KW_HOURS_PER_CHARGE = 99

const EUROS_PER_LITER_OF_PETROL = 1.3
const EUROS_PER_KWH_OF_ELECTRICITY = 0.3
const KMS_PER_FULL_CHARGE = 480

export default {
  name: 'SavingsCalculator',
  data () {
    return {
      litersPerHundredKms: 0,
      kmsDrivenPerYear: 0,
      annualCostOfPetrol: 0,
      annualCostOfElectricity: 0
    }
  },
  computed: {
    formattedAnnualCostOfPetrol () {
      return this.formatSavings(this.annualCostOfPetrol)
    },

    formattedAnnualCostOfElectricity () {
      return this.formatSavings(this.annualCostOfElectricity)
    },

    formattedTotalSavings () {
      if (this.annualCostOfPetrol === 0 || this.annualCostOfElectricity === 0) return '-----'

      return this.formatSavings(this.annualCostOfPetrol - this.annualCostOfElectricity)
    },
    litersPerKm () {
      return this.litersPerHundredKms / 100
    }
  },
  methods: {
    calculateSavings () {
      this.annualCostOfPetrol = (this.kmsDrivenPerYear * this.litersPerKm) * EUROS_PER_LITER_OF_PETROL
      this.annualCostOfElectricity = ((this.kmsDrivenPerYear / KMS_PER_FULL_CHARGE) * KW_HOURS_PER_CHARGE) * EUROS_PER_KWH_OF_ELECTRICITY
    },
    formatSavings (amount) {
      const amountRounded = Math.ceil(amount)

      if (amountRounded === 0 || amountRounded < 0) return '€0.00'

      return `€${amountRounded.toLocaleString('en')}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';
  @import '../../assets/scss/components/floatingBox';

  .savingsCalculator {
    @include floatingBox;

    text-align: center;
    width: $wrapper-width-desktop;
    max-width: 100%;
  }

  .savingsCalculator__form {
    margin: 0 0 40px;

    select {
      margin: 0 10px;
    }

    label {
      font-weight: bold;
      font-size: 1.25rem;
    }
  }

  .savingsCalculator__header {
    margin: 0 0 40px;
  }

  .form__buttonRow {
    margin: 40px 0 0;
  }

  .result__totalSavings {
    color: $ev-green;
    font-size: 4rem;
    margin: 40px 0;
  }

  .result__details {
    display: flex;
    justify-content: center;
    margin: 0 0 30px;
  }

  .details__gasSavings,
  .details__electricityCosts {
    padding: 0 20px 0 0;
    border-right: 2px solid $darker-gray;
  }

  .details__electricityCosts,
  .details__maintenanceSavings {
    margin: 0 0 0 20px;
  }

  .savingsCalculator__disclaimer{
    color: $darker-gray;
    font-size: .75rem;
  }

  .details__electricityCosts,
  .details__gasSavings,
  .details__maintenanceSavings{
    p:nth-of-type(1) {
      margin: 0 0 10px;
    }

    p:nth-of-type(2) {
      font-size: .75rem;
      line-height: .75rem;
    }

  }
</style>
