<template>
  <div :class="'rating ' + selectedRatingClass">
    <div class="rating__group rating__group--1">
      <span class="rating__star" @click="rateIt(1)"></span>
      <div class="rating__group rating__group--2">
        <span class="rating__star" @click="rateIt(2)"></span>
        <div class="rating__group rating__group--3">
          <span class="rating__star" @click="rateIt(3)"></span>
          <div class="rating__group rating__group--4">
            <span class="rating__star" @click="rateIt(4)"></span>
            <div class="rating__group rating__group--5">
              <span class="rating__star" @click="rateIt(5)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    value: {
      default: 0
    }
  },
  computed: {
    selectedRatingClass () {
      return `rating--${this.value}`
    }
  },
  methods: {
    rateIt (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .rating__group {
    display: inline;
  }

  .rating__group:hover > .rating__star:before {
    content:'\2605';
  }

  .rating--1,
  .rating--2,
  .rating--3,
  .rating--4,
  .rating--5 {
    .rating__group--1 > .rating__star:before {
      content:'\2605';
    }
  }

  .rating--2,
  .rating--3,
  .rating--4,
  .rating--5 {
    .rating__group--2 > .rating__star:before {
      content:'\2605';
    }
  }

  .rating--3,
  .rating--4,
  .rating--5 {
    .rating__group--3 > .rating__star:before {
      content:'\2605';
    }
  }

  .rating--4,
  .rating--5 {
    .rating__group--4 > .rating__star:before {
      content:'\2605';
    }
  }

  .rating--5 {
    .rating__group--5 > .rating__star:before {
      content:'\2605';
    }
  }

  .rating__star {
    cursor: pointer;

    &:before {
      content: '\2606'
    }
  }
</style>
