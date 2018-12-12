export const privateConfig = {
  gapiConfig: {
    apiKey: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    clientId: '1111111111111111111111AAAAAAAAAAAAAAAAAAAAAAA.apps.googleusercontent.com',
    discoveryDocs: [
      'https://sheets.googleapis.com/$discovery/rest?version=v4',
      'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
    ],
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.metadata.readonly'
  }
}
