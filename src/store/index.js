
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'Words Study',
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    userSignInWithGoogle ({commit}) {
      // commit('setLoading', true)
      // var provider = new firebase.auth.GoogleAuthProvider()
      // // provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      // firebase.auth().signInWithPopup(provider)
      // .then(firebaseUser => {
      //   commit('setUser', {email: firebaseUser.user.email, token: firebaseUser.credential.accessToken})
      //   commit('setLoading', false)
      //   commit('setError', null)
      //   router.push('/home')
      // })
      // .catch(error => {
      //   commit('setError', error.message)
      //   commit('setLoading', false)
      // })
      console.log('userSignInWithGoogle')
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    },
    userSignOut ({commit}) {
      // firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})
