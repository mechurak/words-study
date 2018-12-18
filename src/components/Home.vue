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
        <p>{{ meaning }}</p>
      </v-flex>
      <v-flex v-if="showAnswer" xs12 class="text-xs-center" mt-3>
        <p>{{ leftStr }}</p>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>{{ description }}</p>
      </v-flex>
      <v-flex @keyup.native.alt.67="nextRow" xs12 class="text-xs-center" mt-3>
        <Diff :left-str="leftStr"/>
        <v-btn @click="nextRow">next (alt+n)</v-btn>
        <v-btn @click="showAnswer = !showAnswer">hint (alt+h)</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Diff from './Diff.vue'

export default {
  data () {
    return {
      leftStr: 'Never let your memories greater than your dreams.',
      showAnswer: false,
      meaning: '',
      description: '',
      curIndex: 0,
      rowCount: 0,
      meaningColIndex: -1,
      spellingColIndex: -1,
      descriptionColIndex: -1
    }
  },
  methods: {
    nextRow () {
      console.log('nextRow')
      var sheetData = this.sheetValues
      this.curIndex++
      if (this.curIndex > this.rowCount) this.curIndex = 1
      this.leftStr = sheetData[this.curIndex][this.spellingColIndex]
      this.meaning = sheetData[this.curIndex][this.meaningColIndex]
      this.description = sheetData[this.curIndex][this.descriptionColIndex]
      this.showAnswer = false
    },
    checkKeyup (event) {
      if (event.altKey) {
        if (event.keyCode === 78) {  // 'n'
          this.nextRow()
        } else if (event.keyCode === 72) {  // 'h'
          this.showAnswer = !this.showAnswer
        }
      }
    }
  },
  created () {
    window.addEventListener('keyup', this.checkKeyup)
  },
  destroyed () {
    window.removeEventListener('keyup', this.checkKeyup)
  },
  computed: {
    sheetValues () {
      return this.$store.state.sheetValues
    }
  },
  mounted () {
    var sheetData = this.sheetValues
    console.log(sheetData)
    if (sheetData !== null && sheetData.length > 0) {
      console.log(sheetData[0])
      this.meaningColIndex = sheetData[0].indexOf('meaning')
      this.spellingColIndex = sheetData[0].indexOf('spelling')
      this.descriptionColIndex = sheetData[0].indexOf('description')
      console.log(this.meaningColIndex, this.spellingColIndex, this.descriptionColIndex)
      this.rowCount = sheetData.length - 1
      console.log('rowCount', this.rowCount)
      this.curIndex = 1
      this.leftStr = sheetData[this.curIndex][this.spellingColIndex]
      this.meaning = sheetData[this.curIndex][this.meaningColIndex]
      this.description = sheetData[this.curIndex][this.descriptionColIndex]
    }
  },
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