<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'App',
  mounted () {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setGeolocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  },
  methods: mapActions(['setGeolocation'])
}
</script>

<style lang="scss">
  @import './assets/scss/config';

  html {
    overflow: hidden;
  }

  body {
    background-color: #FFF;
    font-family: $font-family;
    font-size: $root-font-size;
    color: $black;
    margin: 0;
  }

  h1, h2, h3, h4 {
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 20px;
  }

  h1 {
    font-size: $h1-font-size;
    line-height: $h1-font-size;
  }

  h2 {
    font-size: $h2-font-size;
    line-height: $h2-font-size;
  }

  h3 {
    font-size: $h3-font-size;
    line-height: $h3-font-size;
    font-weight: normal;
    letter-spacing: 1px;
    position: relative;

    hr {
      border: none;
      border-bottom: 2px solid $ev-green;
      width: 100px;
      position: absolute;
      left: 0;
    }
  }

  h4 {
    font-size: $h4-font-size;
    line-height: $h4-font-size;
  }

  input, select, button {
    font-size: $input-font-size;
    outline: none;
  }

  input[type="text"],
  input[type="email"] {
    border: 1px solid $darker-gray;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
  }

  button {
    cursor: pointer;
  }

  .button {
    background-color: $button-background-color;
    color: #FFF;
    text-transform: uppercase;
    font-size: $button-font-size;
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin: 0 0 10px;
    box-shadow: 1px 1px 2px #999;
    cursor: pointer;

    &.button--full {
      width: 100%;
    }

    &.button--secondary {
      background: transparent;
      color: #666;
      font-weight: normal;
      text-decoration: underline;
      border: none;
      box-shadow: none;

      &:hover {
        background-color: $dark-gray;
      }
    }

    &.button--tertiary {
      background-color: $ev-green;
    }

    &.button--white {
      background-color: #FFF;
      color: $black;
      font-weight: normal;
    }
  }

  a.button {
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    padding: 10px 40px;
    width: auto;
  }

  p, label, .label, ul, li, dt, dd {
    font-size: $paragraph-font-size;
    line-height: 1.75rem;
  }

  p {
    margin: 0 0 10px;

    &:last-of-type {
      margin: 0;
    }
  }

  .bold {
    font-weight: bold;
  }

  .italic {
    font-style: italic;
  }

  .center {
    text-align: center;
  }

  .grayText {
    color: $darker-gray;
  }

  a {
    color: $solar-orange;
    cursor: pointer;
  }

  .rangeIndicator__label {
    font-size: 1rem;
    font-weight: normal;
    font-family: $font-family;
    display: block;
  }

  .rangeIndicator__miles {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: $font-family;
  }

  .welcome {
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;

    &.welcome--transition {
      background-color: transparent;
      transition: 1.5s;
    }

    &.welcome--hidden {
      display: none;
    }
  }
</style>
