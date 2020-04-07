window.$ = require('jquery')
<template>
  <div>
    <div class="ui centered container">
      <div class="ui top attached secondary menu">
        <div class="ui icon item">
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDMyIDMyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggQmV0YSAzLjMuMiAoMTIwNDEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPnN1bnNldC0yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2ggQmV0YS48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iSWNvbi1TZXQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNjAuMDAwMDAwLCAtODI3LjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzg4LDg1MyBMMzY0LDg1MyBDMzYzLjQ0Nyw4NTMgMzYzLDg1My40NDcgMzYzLDg1NCBDMzYzLDg1NC41NTMgMzYzLjQ0Nyw4NTUgMzY0LDg1NSBMMzg4LDg1NSBDMzg4LjU1Myw4NTUgMzg5LDg1NC41NTMgMzg5LDg1NCBDMzg5LDg1My40NDcgMzg4LjU1Myw4NTMgMzg4LDg1MyBMMzg4LDg1MyBaIE0zOTEsODQ5IEwzNjEsODQ5IEMzNjAuNDQ3LDg0OSAzNjAsODQ5LjQ0NyAzNjAsODUwIEMzNjAsODUwLjU1MyAzNjAuNDQ3LDg1MSAzNjEsODUxIEwzOTEsODUxIEMzOTEuNTUzLDg1MSAzOTIsODUwLjU1MyAzOTIsODUwIEMzOTIsODQ5LjQ0NyAzOTEuNTUzLDg0OSAzOTEsODQ5IEwzOTEsODQ5IFogTTM4MSw4NTcgTDM3MSw4NTcgQzM3MC40NDcsODU3IDM3MCw4NTcuNDQ3IDM3MCw4NTggQzM3MCw4NTguNTUzIDM3MC40NDcsODU5IDM3MSw4NTkgTDM3NS45OTYsODU5IEwzNzYsODU5IEwzNzYuMDA0LDg1OSBMMzgxLDg1OSBDMzgxLjU1Myw4NTkgMzgyLDg1OC41NTMgMzgyLDg1OCBDMzgyLDg1Ny40NDcgMzgxLjU1Myw4NTcgMzgxLDg1NyBMMzgxLDg1NyBaIE0zNjIuNTg4LDg0NyBDMzYyLjIxLDg0NS43MzEgMzYyLDg0NC4zOTEgMzYyLDg0MyBDMzYyLDgzNS4yNjkgMzY4LjI2OCw4MjkgMzc2LDgyOSBDMzgzLjczMiw4MjkgMzkwLDgzNS4yNjkgMzkwLDg0MyBDMzkwLDg0NC4zOTEgMzg5Ljc5LDg0NS43MzEgMzg5LjQxMiw4NDcgTDM5MS40NzYsODQ3IEMzOTEuODA2LDg0NS43MiAzOTIsODQ0LjM4NCAzOTIsODQzIEMzOTIsODM0LjE2NCAzODQuODM3LDgyNyAzNzYsODI3IEMzNjcuMTYzLDgyNyAzNjAsODM0LjE2NCAzNjAsODQzIEMzNjAsODQ0LjM4NCAzNjAuMTk0LDg0NS43MiAzNjAuNTI0LDg0NyBMMzYyLjU4OCw4NDcgTDM2Mi41ODgsODQ3IFoiIGlkPSJzdW5zZXQtMiIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
            alt=""
          />
        </div>
        <div class="right menu">
          <nuxt-link class="item" to="/" prefetch>Simulate</nuxt-link>
          <nuxt-link class="item" to="/statistics" prefetch
            >Statistics</nuxt-link
          >
        </div>
      </div>
    </div>
    <nuxt />
    <footer class="footer">
      Designed with ♥️ from 🏠
    </footer>
  </div>
</template>
<script>
export default {
  created() {
    const analytics = document.createElement('script')
    analytics.setAttribute('src', 'https://analytics.ta3.dev/tracker.js')
    analytics.setAttribute('async', '')
    analytics.setAttribute(
      'data-ackee-domain-id',
      '15bea3d3-8031-4241-b1f1-5dd1b8ea7e22'
    )
    analytics.setAttribute('data-ackee-server', 'https://analytics.ta3.dev')
    document.head.appendChild(analytics)


    const feedback = document.createElement('script')
    feedback.setAttribute('src', 'https://w.appzi.io/bootstrap/bundle.js?token=2Dx1V')
    feedback.setAttribute('async', '')
    document.head.appendChild(feedback)
  }
}
</script>
