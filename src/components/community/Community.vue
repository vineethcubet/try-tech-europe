<template>
  <div class="community">
    <ul class="community__realPeople">
      <li class="realPeople__person">
        <img src="../../assets/images/owners/wolfgang.png"
             class="person__photo"
             alt="" />
        <p class="person__quote">What is the best place to have an electric vehicle serviced?</p>
        <p class="person__bio">Wolfgang, Frankfurt, DE</p>
      </li>
      <li class="realPeople__person">
        <img src="../../assets/images/owners/kiesha.png"
             class="person__photo"
             alt="" />
        <p class="person__quote">Will an electric car run differently in hot or cold weather?</p>
        <p class="person__bio">Kiesha, London, UK</p>
      </li>
      <li class="realPeople__person">
        <img src="../../assets/images/owners/ricky.png"
             class="person__photo"
             alt="" />
        <p class="person__quote">How long does the battery take to charge?</p>
        <p class="person__bio">Alexander, Oslo, NO</p>
      </li>
      <li class="realPeople__person">
        <img src="../../assets/images/owners/penelope.png"
             class="person__photo"
             alt="" />
        <p class="person__quote">Are there places to charge my car for free?</p>
        <p class="person__bio">Eva, Amsterdam, NL</p>
      </li>
    </ul>
    <div class="community__textBox">
      <header class="textBox__header">
        <h2>Connect with an owner</h2>
        <p>Questions &amp; answers from the EV community</p>
      </header>

      <p>Quickly find answers to your electric vehicle<br/>questions with the help of current owners in the<br/>BEV Community forum.</p>

      <p class="bold">Categories include:</p>

      <ul>
        <li>Safety & performance</li>
        <li>Range</li>
        <li>Battery &amp; charging</li>
        <li>Maintenance &amp; warranties</li>
      </ul>

      <div class="textBox__buttons">
        <FeatureNotAvailable text="Ask your own question"
                             classes="button--tertiary button--community" />
        <FeatureNotAvailable text="Visit the EV community"
                             classes="button--white button--community" />
      </div>
    </div>
  </div>
</template>

<script>
import FeatureNotAvailable from '../FeatureNotAvailable'

export default {
  name: 'Community',
  components: {FeatureNotAvailable}
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/config';

  .community {
    background-color: $light-gray;
    display: flex;
    margin: 0 0 20px;
    padding: 60px 0;
    box-sizing: border-box;
  }

  .community__realPeople {
    background-color: #FFF;
    border-radius: 8px;
    box-shadow: 4px 5px 5px 0 rgba(0, 0, 0, 0.15);
    border: solid 1px #e6e7e8;
    list-style: none;
    display: inline-block;
    padding: 40px;
    margin: 0 100px;
  }

  .realPeople__person {
    clear: left;

    &:last-of-type {
      .person__photo {
        margin-bottom: 0;
      }
    }
  }

  .person__photo {
    float: left;
    margin: 0 20px 60px 0;
  }

  .person__quote {
    font-weight: bold;
  }

  .person__bio {
    color: $darker-gray;
    font-style: italic;
  }

  .textBox__header {
    margin: 0 0 20px;

    p {
      text-transform: uppercase;
    }
  }

  .textBox__buttons {
    display: inline-block;
  }
</style>

<style lang="scss">
  .button--community {
    margin: 40px 0 0;
  }
</style>
