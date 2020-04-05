/* eslint-disable no-undef */
<template>
  <div class="container">
    <div class="ui container title">
      <h3>
        Stay at Home
      </h3>
    </div>
    <div class="ui grid centered stackable container">
      <div class="fifteen wide column message">
        "The following is a simulation to demonstrate the power of staying home.
        <br />
        Algorithim used is 'very close' to the actual COVID-19 world statistics."
        <br />
        <br />
        Stay home stay safe.
      </div>
    </div>
    <div>
      <div class="ui container title">
        <h3>
          Simulate

          <arrow
            :arrow-down="arrowDown"
            @click.native="arrowDown = arrowDown === 'yes' ? 'no' : 'yes'"
          />
        </h3>
      </div>
      <configurator :hide-config="arrowDown" />
    </div>
  </div>
</template>

<script>
import Configurator from '~/components/configurator.vue'
import Arrow from '~/components/arrow.vue'
export default {
  components: {
    Configurator,
    Arrow
  },
  data() {
    return {
      arrowDown: 'yes'
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    /*
      CpM : 100000
      Cases: P
    */
    toggleConfig: () => {}
  }
}
</script>
