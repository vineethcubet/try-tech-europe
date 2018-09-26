<template>
  <div class="options__option options__option--basic">
    <header class="option__header option__header--withoutImage">
      <h4>Fixed Charging Plan</h4>
      <p class="header__cost">$350</p>
      <p>Each 30 minute charge provides <br><b>90 miles of range</b> to your EV</p>
    </header>
    <div class="options__detailsGroups">
      <div class="details__group">
        <ul class="option__details">
          <li>Two years of fast charging</li>
          <li>Pays for itself after 10 charges</li>
          <li>1,000 kWh (up to 40 charge events)</li>
          <li>Access to largest charging networks</li>
        </ul>
      </div>
    </div>
    <p class="option__additionalInfo">Some public charging stations offer free charging. Look for charging stations near work, restaurants and shopping centers.</p>
  </div>
</template>

<script>
export default {
  name: 'FixedCharging'
}
</script>
