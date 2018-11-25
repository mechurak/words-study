<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a user's home page</p>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Never let your memories greater than your dreams.</p>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <Diff/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Diff from './Diff.vue'

export default {
  components: {
    Diff
  }
}
</script>

<style>
#inputStr {
  border-style: solid;
  color: #2c3e50;
}
</style>