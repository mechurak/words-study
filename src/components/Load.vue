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
        <v-btn @click="listMajors" color="primary">listMajors</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
var gapi = window.gapi

export default {
  methods: {
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
  }
}
</script>
