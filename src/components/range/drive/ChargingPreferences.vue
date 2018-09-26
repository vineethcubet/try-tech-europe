<template>
  <div>
    <select v-model="poiType" data-qa="chargers-within-miles">
      <option value="">Show chargers within 10 kilometers</option>
      <option value="shopping">Show chargers near shopping</option>
      <option value="lodging">Show chargers near lodging</option>
      <option value="restaurants">Show chargers near restaurants</option>
    </select>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'ChargingPreferences',
  data () {
    return {
      poiType: ''
    }
  },
  mounted () {
    this.poiType = this.chargerPreferences.showChargersNearPoi
  },
  watch: {
    poiType () {
      this.updateChargerPreferences({
        showChargersNearPoi: this.poiType
      })
    },
    chargerPreferences () {
      this.poiType = this.chargerPreferences.showChargersNearPoi
    }
  },
  methods: mapActions(['updateChargerPreferences']),
  computed: mapGetters(['chargerPreferences'])
}
</script>
