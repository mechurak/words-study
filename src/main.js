import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from 'firebase'
import { firebaseConfig } from './helpers/firebaseConfig'

Vue.use(Vuetify)

// "src/helpers/firebaseConfig.js" (gitignore) has below information
//
// export const firebaseConfig = {
//   apiKey: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAA',
//   authDomain: 'aaaaaaaaaaaa.firebaseapp.com',
//   databaseURL: 'https://aaaaaaaaaaa.firebaseio.com',
//   projectId: 'aaaaaaaaaaa',
//   storageBucket: 'aaaaaaaaaaa.appspot.com',
//   messagingSenderId: '0000000000'
// }
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
