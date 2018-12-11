import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import './external/gapi.js'
import { privateConfig } from './helpers/privateConfig.js'

Vue.use(Vuetify)

Vue.config.productionTip = false

var gapi = window.gapi

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  methods: {
    updateSigninStatus (isSignedIn) {
      store.dispatch('updateSigninStatus', isSignedIn)
    },
    initGapi () {
      console.log('initGapi')
      gapi.client.init(privateConfig.gapiConfig)
      .then(function () {
        // Listen for sign-in state changes.
        // eslint-disable-next-line
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
        console.log(gapi.auth2.getAuthInstance())
        // Handle the initial sign-in state.
        // eslint-disable-next-line
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
      }, function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    console.log('mounted ()')
    gapi.load('client:auth2', this.initGapi)
  }
})

// Expose global function
window.updateSigninStatus = app.updateSigninStatus
