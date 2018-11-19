<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Welcome to Awesome App</h1>
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
        <v-btn v-if="!isAuthenticated" id=signInBtn @click="userSignIn" :disabled="loading">Sign in with Google</v-btn>
        <v-btn v-if="isAuthenticated" to="/home" color="primary">Home</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      alert: false
    }
  },
  methods: {
    userSignIn () {
      this.$store.dispatch('userSignInWithGoogle')
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