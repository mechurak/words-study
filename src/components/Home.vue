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
        <p>{{ leftStr }}</p>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <hilightable-iput
          id="inputStr"
          :highlight="highlight"
          v-model="rightStr"
        ></hilightable-iput>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HilightableIput from 'vue-highlightable-input'

export default {
  data () {
    return {
      leftStr: 'Never let your memories greater than your dreams.',
      rightStr: '',
      highlight: [
        {text: 'chicken', style: 'background-color:#f37373'}
      ]
    }
  },
  watch: {
    rightStr (value) {
      var jsdiff = require('diff')
      var diff = jsdiff.diffChars(this.leftStr, this.rightStr)
      var startIndex = 0
      var retRule = [{text: 'chicken', style: 'background-color:#f37373'}]
      diff.forEach(part => {
        var color = part.added ? 'green' : part.removed ? 'red' : 'grey'
        var endIndex = startIndex + part.count
        if (color === 'green') {
          if (part.value.length > 0 && part.value.trim()) {
            retRule.push({start: startIndex, end: endIndex, style: 'background-color:#bbe4cb'})
          }
          startIndex = endIndex
        } else if (color === 'red') {
          // TODO: Ignore latest space
          if (part.value.length > 0 && part.value.trim()) {
            retRule.push({start: startIndex, end: endIndex, style: 'background-color:#f37373'})
          }
        } else {
          startIndex = endIndex
        }
      })
      this.highlight = retRule
    }
  },
  components: {
    HilightableIput
  }
}
</script>

<style>
#inputStr {
  border-style: solid;
  color: #2c3e50;
}
</style>