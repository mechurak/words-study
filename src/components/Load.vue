<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Load page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a page to import words data from google sheet</p>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <v-btn @click="listSheets" color="primary">list Sheets</v-btn>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <v-list v-if="items.length > 0">
          <template v-for="item in items">
            <v-list-tile
              :key="item.name"
              @click="selectSheet(item.id, item.name)"
              >
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
var gapi = window.gapi

export default {
  data () {
    return {
      items: []  // {'name': 'test title', 'id': 'sheet_id'}
    }
  },
  methods: {
    listSheets () {
      gapi.client.drive.files.list({
        'pageSize': 10,
        'q': 'mimeType = "application/vnd.google-apps.spreadsheet"',
        'fields': 'nextPageToken, files(id, name)'
      }).then(response => {
        console.log(response)
        console.log('Files:')
        var files = response.result.files
        console.log(files)
        if (files && files.length > 0) {
          this.items = files
          for (var i = 0; i < files.length; i++) {
            var file = files[i]
            console.log(file.name + ' (' + file.id + ')')
          }
        } else {
          console.log('No files found.')
        }
      })
    },
    selectSheet (sheetId, sheetName) {
      console.log('selectSheet ()', sheetId)
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'A:G'
      }).then(response => {
        console.log(response)
        var range = response.result
        if (range.values.length > 0) {
          const parsed = JSON.stringify(response.result.values)
          localStorage.setItem('lastLoadedSheetValues', parsed)
          localStorage.setItem('lastLoadedSheetName', sheetName)
          var date = new Date()
          localStorage.setItem('lastLoadedTime', date.toLocaleString())
          this.$store.dispatch('onSheetLoaded')
        } else {
          console.log('No data found.')
        }
      }, function (response) {
        console.log('Error: ' + response.result.error.message)
      })
    }
  }
}
</script>
