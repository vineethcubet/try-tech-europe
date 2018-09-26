<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
import AddressSuggester from '@/services/maps/AddressSuggester'

export default {
  name: 'AutocompleteAddress',
  mounted () {
    new AddressSuggester.AddressSuggester(this.$el.querySelector('input'), this.suggestionReceived)
  },
  methods: {
    suggestionReceived (formattedAddress) {
      this.$emit('suggestion', formattedAddress)
      this.$el.querySelector('input').dispatchEvent(new Event('input'))
    }
  }
}
</script>

<style scoped>

</style>
