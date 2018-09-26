<template>
    <div class="chargingReminders">
        <div class="chargingReminders__image">
          <img src="../../../assets/images/charging-reminders.png"
               alt="Charging Reminders"/>
        </div>
      <div class="chargingReminders__details">
        <h3>Charging Reminders</h3>
        <h4>Wake up to a full charge</h4>
        <div class="chargingReminders__details__content">
          <p>For most drivers, a full charge can provide a week’s worth of driving.</p>
          <p>With a charging schedule, you’re in control of when & for how long to charge.</p>
          <p>Plus, by charging at home, you could save up to $800 a year on fuel costs. </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ChargingReminders'
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/config";

  .chargingReminders {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 40px 0 40px 0;
    background-color: $light-gray;
  }

  .chargingReminders__image {
    width: 30%;

    img {
      margin: 10px;
    }
  }

  .chargingReminders__details {
    margin: 40px;
    width: 25%;

    h3, h4 {
      text-transform: uppercase;
    }

    h4 {
      font-weight: normal;
      font-size: 1rem;
    }

    .chargingReminders__details__content {
      margin: 20px 0 20px 0;

      p {
        font-size: 1rem;
      }
    }

  }

</style>
