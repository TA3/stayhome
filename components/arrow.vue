<template>
  <div :class="arrowDown == 'yes' ? 'down' : 'up'" class="arrowIcon">
    <svg
      id="Layer_1"
      data-content="Advanced settings"
      data-position="left center"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="30px"
      height="30px"
      viewBox="0 0 92 92"
      enable-background="new 0 0 92 92"
      xml:space="preserve"
    >
      <path
        id="XMLID_356_"
        fill="#191919"
        d="M73.8,39.8c-0.8,0.8-1.8,1.2-2.8,1.2c-1,0-2-0.4-2.8-1.2L50,21.6V80c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4V21.6
	L23.8,39.8c-1.6,1.6-4.1,1.6-5.7,0c-1.6-1.6-1.6-4.1,0-5.7l25-24.9c1.6-1.6,4.1-1.6,5.6,0l25,24.9C75.4,35.7,75.4,38.2,73.8,39.8z"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: ['arrowDown'],
  mounted() {
    window.$('.arrowIcon svg').popup('toggle')
  }
}
</script>
<style>
.arrowIcon {
  float: right;
  display: inline-block;
  position: relative;
  top: 0px;
  transform: rotate(-45deg);
  transition: all 0.3s ease-out;
  cursor: pointer;
}
.arrowIcon.down {
  transform: rotate(-135deg);
  top: 4px;
}
.ui.popup {
  border: none;
  background: #f6f5f0;
  box-shadow: 20px 20px 60px #969592, -20px -20px 60px #ffffff;
}
.ui.popup::before {
  background: #f6f5f0 !important;
  box-shadow: 20px 20px 60px #969592, -20px -20px 60px #ffffff !important;
  border:none;
}
</style>
