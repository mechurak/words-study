
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
    signIn ({commit}) {
      console.log('signIn')
      commit('setLoading', true)
      // eslint-disable-next-line
      gapi.auth2.getAuthInstance().signIn()
      commit('setLoading', false)
      commit('setError', null)
    },
    updateSigninStatus ({commit}, isSignedIn) {
      console.log('updateSigninStatus', isSignedIn)
      if (isSignedIn) {
        commit('setUser', 'temp')
        router.push('/home')
      } else {
        commit('setUser', null)
        router.push('/')
      }
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    },
    userSignOut ({commit}) {
      // eslint-disable-next-line
      gapi.auth2.getAuthInstance().signOut()
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})
