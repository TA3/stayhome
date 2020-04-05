<template>
  <div>
    <div
      id="configurator"
      :class="hideConfig == 'yes' ? 'hidden' : ''"
      class="ui grid centered stackable container"
    >
      <div class="seven wide column">
        <div class="selection">
          <div id="depth" class="ui labeled ticked slider">
            <div class="ui pointing label">Depth</div>
          </div>
        </div>
      </div>
      <div class="seven wide column">
        <div class="selection">
          <div id="interaction" class="ui labeled ticked slider">
            <div class="ui pointing label">Interaction</div>
          </div>
        </div>
      </div>
      <div class="fourteen wide column">
        <div class="selection">
          <div id="death" class="ui labeled ticked slider">
            <div class="ui pointing label">Death Factor</div>
          </div>
        </div>
      </div>
      <div class="fourteen wide column">
        <div class="selection">
          <div id="percentage" class="ui labeled ticked slider">
            <div class="ui pointing label">Effect</div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="hideResult == 'yes' ? 'hidden' : ''"
      class="ui grid centered stackable container marginAuto"
    >
      <div class="sixteen wide column story">
        In a population of <span id="population">0</span>,
        <span id="infectionCause">0</span>
        <div class="circle redStroke"></div>
        people whom show no symptoms, have caused the infection to spread to
        <span id="infections">0</span>
        <div class="circle red"></div>
        people. <span id="death">0</span>
        <div class="circle black"></div>
        of which has died.
      </div>
      <div class="sixteen wide column">
        <div class="controls">
          <div class="ui icon buttons">
            <button
              data-content="Start Simulation"
              class="ui button"
              @click="simulate"
            >
              <i class="play icon"></i>
            </button>
            <button data-content="Reset" class="ui button" @click="reset">
              <i class="undo alternate icon"></i>
            </button>
            <span class="ui button status" disabled>Ready</span>
          </div>
        </div>
        <div class="result"></div>
      </div>
      <div class="one wide column"></div>
      <div class="eleven wide column"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['hideConfig', 'hideResult'],
  mounted() {
    window.$('.button').popup({
      position: 'top left'
    })
    window.$('.ui.slider#depth').slider({
      min: 3,
      max: 6,
      start: 5,
      step: 1,
      onChange: (v) => {
        updateValues()
      }
    })

    window.$('.ui.slider#interaction').slider({
      min: 2,
      max: 4,
      start: 3,
      step: 1,
      onChange: (v) => {
        updateValues()
      }
    })
    window.$('.ui.slider#percentage').slider({
      min: 7,
      max: 10,
      start: 9.5,
      step: 0.5,
      onChange: (v) => {
        updateValues()
      }
    })
    window.$('.ui.slider#death').slider({
      min: 0,
      max: 30,
      start: 6,
      step: 2,
      onChange: (v) => {
        updateValues()
      }
    })
    updateValues()
  },
  methods: {
    simulate: () => {
      document.querySelector('.status').textContent = 'Running'
      document
        .querySelector('.story')
        .scrollIntoView({ behavior: 'smooth', block: 'start' })
      document.querySelectorAll('.node.unwell').forEach((e) => {
        setTimeout(() => {
          infect(e.className.baseVal.split(' ')[2], infectionPercentage)
        }, 300)
        setTimeout(() => {
          death(deathPercentage)
        }, depth * 2700)
      })
      document.querySelectorAll('.controls>.buttons>button').forEach((e) => {
        e.setAttribute('disabled', true)
      })
    },
    reset: () => {
      updateValues()
      document.querySelector('.status').textContent = 'Ready'
    },
    share: () => {}
  }
}
</script>
