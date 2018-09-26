<template>
    <div class="featureNotAvailable">
      <div class="featureNotAvailable__emailForm"
           v-if="showForm">
        <form @submit.prevent="captureEmail"
              data-qa="capture-email-form">
          <div class="emailForm__input">
            <label for="emailAddress">We'll let you know when this feature is available.</label>
            <input id="emailAddress"
                   data-qa="email-address-input"
                   v-model="emailAddress"
                   placeholder="Enter your email address for updates..."
                   type="email" />
          </div>
          <div class="emailForm__buttonRow">
            <button class="button">Submit</button>
            <button class="button button--secondary">Cancel</button>
          </div>
        </form>
      </div>
      <div class="featureNotAvailable__buttons">
        <button :class="'button ' + classes"
                data-qa="build-vehicle-button"
                @click="showForm = true">{{ text }}</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FeatureNotAvailable',
  data () {
    return {
      emailAddress: '',
      showForm: false
    }
  },
  props: {
    text: {
      required: true
    },
    classes: {
      default: ''
    }
  },
  methods: {
    captureEmail () {
      this.emailAddress = ''
      this.showForm = false
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/scss/components/modal';

  .featureNotAvailable__emailForm {
    @include modal-shadow;

    form {
      @include modal-window(500px);
    }

    label {
      font-weight: bold;
      display: block;
      margin: 0 0 20px;
    }
  }

  .emailForm__input {
    margin: 0 0 20px;
  }

  .emailForm__buttonRow {
    button {
      margin: 0 10px 0 0;
    }
  }

  .featureNotAvailable__buttons {
    text-align: center;
    margin: 0 0 20px;

    button {
      width: 280px;
      display: inline-block;
      padding: 15px 0;
    }
  }

</style>
