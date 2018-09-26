<template>
  <div class="innerScroll"
       ref="innerScroll">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bus from '@/Bus'
import _ from 'lodash'

export default {
  name: 'InnerScroll',
  data () {
    return {
      scrollTop: null,
      scrollDirection: null,
      scrollInput: 0
    }
  },
  computed: {
    hitBottomEdge () {
      const scrollTop = this.scrollTop
      const element = this.$refs.innerScroll

      if (typeof element === 'undefined') return false

      const endOfScroll = element.scrollHeight - element.clientHeight

      return scrollTop === endOfScroll
    },
    hitTopEdge () {
      return this.scrollTop === 0
    },
    scrollingDown () {
      return this.scrollDirection === 'down'
    },
    scrollingUp () {
      return this.scrollDirection === 'up'
    }
  },
  watch: {
    scrollInput () {
      if (this.hitBottomEdge && this.scrollingDown) this.emitScroll('scroll:nextSection')
      if (this.hitTopEdge && this.scrollingUp) this.emitScroll('scroll:previousSection')
    }
  },
  mounted () {
    this.$refs.innerScroll.addEventListener('wheel', this.handleWheel)
  },
  methods: {
    handleWheel (e) {
      e.stopPropagation()

      this.scrollTop = this.$refs.innerScroll.scrollTop
      this.scrollInput = e.deltaY
      this.scrollDirection = e.deltaY < 0 ? 'up' : 'down'
    },
    emitScroll: _.throttle((eventName) => {
      Bus.$emit(eventName)
    }, 1500, {
      trailing: false
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/config';

  .innerScroll {
    height: 100vh;
    width: inherit;
    overflow: scroll;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
