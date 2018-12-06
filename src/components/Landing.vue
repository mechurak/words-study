<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Welcome to Words Study</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          It's a basic Single Page application <br>
          with Google Firebase authentication
        </blockquote>
      </v-flex>
      <v-flex>
        <v-alert type="error" dismissible v-model="alert">
          {{ error }}
        </v-alert>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <v-btn v-if="!isAuthenticated" id=signInBtn @click="userSignInButton" :disabled="loading">Sign in with Google</v-btn>
        <v-btn v-if="isAuthenticated" to="/home" color="primary">Home</v-btn>
        <v-btn @click="listMajors" color="primary">listMajors</v-btn>
        <v-btn @click="realSignIn" color="primary">SignIn</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { privateConfig } from '../helpers/privateConfig'

var gapi = window.gapi
var updateSigninStatus = window.updateSigninStatus

export default {
  data () {
    return {
      alert: false
    }
  },
  methods: {
    userSignIn () {
      console.log('userSignIn')
      gapi.client.init(privateConfig.gapiConfig)
      .then(function () {
        console.log('start of init.then')
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
        console.log(gapi.auth2.getAuthInstance())
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        console.log('end of init.then')
      }, function (error) {
        console.log(error)
      })
      // this.$store.dispatch('userSignInWithGoogle')
    },
    userSignInButton () {
      console.log('userSignInButton')
      gapi.load('client:auth2', this.userSignIn)
    },
    realSignIn () {
      console.log('realSignIn')
      gapi.auth2.getAuthInstance().signIn()
    },
    listMajors () {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E'
      }).then(function (response) {
        var range = response.result
        if (range.values.length > 0) {
          for (var i = 0; i < range.values.length; i++) {
            var row = range.values[i]
            // Print columns A and E, which correspond to indices 0 and 4.
            console.log(row[0] + ', ' + row[4])
          }
        } else {
          console.log('No data found.')
        }
      }, function (response) {
        console.log('Error: ' + response.result.error.message)
      })
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>

<style>
  #signInBtn { text-transform: none !important; }
</style>