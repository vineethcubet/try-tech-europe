<template>
  <div class="lifestyleQuiz">
    <header class="lifestyleQuiz__header">
      <h2>Your Charging Profile</h2>
      <p>Charging solutions are flexible and adaptable to your day. Find your home and public charging recommendations.</p>
    </header>
    <div class="lifestyleQuiz__details">
      <div class="lifestyleQuiz__input">
        <label>I live in a</label>
        <input type="radio"
               class="dwellingType dwellingType--house"
               data-qa="dwelling-type-house"
               value="house"
               v-model="dwellingType">
        <input type="radio"
               class="dwellingType dwellingType--apartment"
               data-qa="dwelling-type-apartment"
               value="apartment"
               v-model="dwellingType">
      </div>
      <div class="lifestyleQuiz__input">
        <label for="hoursDrivenPerDay">I drive approximately</label>
        <select data-qa="hoursDrivenPerDay"
                id="hoursDrivenPerDay"
                v-model.number="hoursDrivenPerDay">
          <option value="0" disabled>-- kilometers per day</option>
          <option value="1">10,000 - 20,000 km</option>
          <option value="2">20,000 - 30,000 km</option>
          <option value="3">30,000 km or more</option>
        </select>
      </div>
      <div class="lifestyleQuiz__input">
        <label>I can charge at work</label>
        <input type="radio"
               class="chargeAtWork chargeAtWork--yes"
               :value="true"
               v-model="chargeAtWork">
        <input type="radio"
               class="chargeAtWork chargeAtWork--no"
               :value="false"
               v-model="chargeAtWork">
      </div>
    </div>
    <p>Recommendations are made based on your<br/>home type and driving. To see all options, visit<br/>the Home and Public charging sections below.</p>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import Bus from '@/Bus'

export default {
  name: 'LifestyleQuiz',
  data () {
    return {
      dwellingType: '',
      chargeAtWork: false,
      hoursDrivenPerDay: 0
    }
  },
  computed: mapGetters({
    storedDwellingType: 'dwellingType',
    storedHoursDrivenPerDay: 'chargingRecommendation'
  }),
  watch: {
    dwellingType () {
      this.setDwellingType(this.dwellingType)
    },
    hoursDrivenPerDay () {
      this.setChargingRecommendation(this.hoursDrivenPerDay)
    },
    storedHoursDrivenPerDay () {
      this.hoursDrivenPerDay = this.storedHoursDrivenPerDay
    }
  },
  methods: {
    ...mapMutations(['setDwellingType', 'setChargingRecommendation']),
    startJourney () {
      Bus.$emit('navigate', 'route')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .lifestyleQuiz {
    padding: 40px 20px 20px;

    h2 {
      font-weight: normal;
      font-size: $h3-font-size;
      line-height: $h3-font-size;
    }
  }

  .lifestyleQuiz__header {
    position: relative;
  }

  .lifestyleQuiz__details {
    display: flex;
    flex-direction: column;
    flex-basis: 0;
    margin: 0 0 40px;
  }

  .lifestyleQuiz__input {
    flex-grow: 1;
    margin: 40px 0 0;

    select {
      margin: 0 10px;
      height: 36px;
    }

    label {
      font-weight: bold;
      display: block;
    }

    &:nth-of-type(2) {
      margin: 70px 0 0;
    }
  }

  .lifestyleQuiz__beginJourney img {
    transform: rotate(90deg);
    width: 30px;
    cursor: pointer;
  }

  .dwellingType,
  .chargeAtWork {
    width: 120px;

    &::before {
      background-color: $dark-gray;
      text-align: center;
      content: "OPTION";
      display: inline-block;
      border-radius: 5px;
      width: 120px;
      padding: 10px 0;
      cursor: pointer;
    }

    &:checked::before {
      background-color: $ev-green;
      color: #FFF;
    }
  }

  .dwellingType--house::before {
    content: "House";
  }

  .dwellingType--apartment::before {
    content: "Apt/Condo";
  }

  .chargeAtWork--yes::before {
    content: "Yes";
  }

  .chargeAtWork--no::before {
    content: "No";
  }
</style>
