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
        <Diff :left-str="leftStr"/>
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
      curIndex: 0,
      rowCount: 0,
      meaningColIndex: -1,
      spellingColIndex: -1,
      descriptionColIndex: -1
    }
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
      this.leftStr = sheetData[1][this.spellingColIndex]
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