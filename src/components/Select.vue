<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Select page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a page to filter words from selected google sheet.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      curIndex: 0,
      rowCount: 0,
      titleColIndex: -1,
      sheetName: '',
      loadedTime: '',
      sheetValues: null
    }
  },
  methods: {
    listSheets () {
      console.log('listSheets')
    }
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
    if (this.sheetValues !== null && this.sheetValues.length > 0) {
      console.log(this.sheetValues[0])
      this.titleColIndex = this.sheetValues[0].indexOf('title')
      this.rowCount = this.sheetValues.length - 1

      // TODO: Get title list from sheetValues
    }
  }
}
</script>
