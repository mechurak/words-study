<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-xs-center" mt-3>
        <h2>{{ sheetName }}</h2>
        (last sync : {{ loadedTime }})
      </v-flex>
      <v-flex xs12 sm8>
        <v-textarea
          v-model="meaning"
          outline
          readonly
          label="meaning"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm8 class="text-xs-center" mt-3>
        <Diff :left-str="leftStr"/>
        <v-btn @click="nextRow">next (alt+n)</v-btn>
        <v-tooltip v-model="showAnswer" bottom>
          <v-btn slot="activator" @click="showAnswer = !showAnswer">hint (alt+h)</v-btn>
          <span> {{ leftStr }}</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs12 sm8>
        <v-textarea
          v-model="description"
          placeholder = "no description"
          readonly
          label="description"
        ></v-textarea>
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
      descriptionColIndex: -1,
      sheetName: '',
      loadedTime: '',
      sheetValues: null
    }
  },
  methods: {
    nextRow () {
      console.log('nextRow')
      if (!this.sheetValues) {
        console.warn('!this.sheetValues')
        return
      }
      this.curIndex++
      if (this.curIndex > this.rowCount) this.curIndex = 1
      this.leftStr = this.sheetValues[this.curIndex][this.spellingColIndex]
      this.meaning = this.sheetValues[this.curIndex][this.meaningColIndex]
      this.description = this.sheetValues[this.curIndex][this.descriptionColIndex]
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
  mounted () {
    var lastLoadedSheetValues = localStorage.getItem('lastLoadedSheetValues')
    if (!lastLoadedSheetValues) {
      console.warn('lastLoadedSheetValues does not exist in localStorage')
      return
    }

    this.sheetName = localStorage.getItem('lastLoadedSheetName')
    this.loadedTime = localStorage.getItem('lastLoadedTime')
    this.sheetValues = JSON.parse(lastLoadedSheetValues)
    console.log(this.sheetValues)
    if (this.sheetValues !== null && this.sheetValues.length > 0) {
      console.log(this.sheetValues[0])
      this.meaningColIndex = this.sheetValues[0].indexOf('meaning')
      this.spellingColIndex = this.sheetValues[0].indexOf('spelling')
      this.descriptionColIndex = this.sheetValues[0].indexOf('description')
      console.log(this.meaningColIndex, this.spellingColIndex, this.descriptionColIndex)
      this.rowCount = this.sheetValues.length - 1
      console.log('rowCount', this.rowCount)
      this.curIndex = 1
      this.leftStr = this.sheetValues[this.curIndex][this.spellingColIndex]
      this.meaning = this.sheetValues[this.curIndex][this.meaningColIndex]
      this.description = this.sheetValues[this.curIndex][this.descriptionColIndex]
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