<template>
  <div class="diff_container">
    <div class="backdrop">
        <div class="diff_highlights" v-html="highlightHtml"></div>
    </div>
    <textarea id="my_textarea" @input="update">
    </textarea>
    <v-text-field
      label="Regular"
      placeholder="Placeholder"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leftStr: 'Never let your memories greater than your dreams.',
      rightStr: '',
      highlightHtml: ''
    }
  },
  methods: {
    update (event) {
      console.log('update', event.target.value)
      console.log(event)

      var originText = event.target.value

      var jsdiff = require('diff')
      var diff = jsdiff.diffChars(this.leftStr, originText)
      console.log(diff)
      var resultHtml = ''
      var tempHtml = ''
      var startIndex = 0
      diff.forEach(part => {
        var color = part.added ? 'red' : part.removed ? 'green' : 'grey'
        var endIndex = startIndex + part.count
        if (color === 'red') {
          if (part.value.length > 0 && part.value.trim()) {
            tempHtml = '<span class="red">' + originText.substr(startIndex, part.count) + '</span>'
            resultHtml = resultHtml + tempHtml
          }
          startIndex = endIndex
        } else if (color === 'green') {
          // TODO: Ignore latest space
          if (part.value.length > 0 && part.value.trim()) {
            tempHtml = '<span class="green"></span>'
            resultHtml = resultHtml + tempHtml
          }
        } else {
          tempHtml = originText.substr(startIndex, part.count)
          resultHtml = resultHtml + tempHtml
          startIndex = endIndex
        }
        console.log(resultHtml)
      })
      console.log('result')
      console.log(resultHtml)

      this.highlightHtml = resultHtml
    }
  }
}
</script>

<style>
.diff_container, .backdrop, #my_textarea {
  width: 400px;
  height: 120px;
}
.diff_highlights, #my_textarea {
  font: 16px/24px 'Open Sans', sans-serif;
  letter-spacing: 1px;
}
.diff_container {
  display: block;
  margin: 0 auto;
  -webkit-text-size-adjust: none;
}
.backdrop {
  position: absolute;
  z-index: 1;
  border: 2px solid #685972;
  background-color: #fff;
  overflow: auto;
  pointer-events: none;
}
.diff_highlights {
    white-space: pre-wrap;
    word-wrap: break-word;
    color: transparent;
    text-align: left;
}
#my_textarea {
  display: block;
  position: absolute;
  z-index: 2;
  margin: 0;
  border: 2px solid #74637f;
  border-radius: 0;
  color: #444;
  background-color: transparent;
  overflow: auto;
  resize: none;
}
.diff_highlights > .green {
  color: transparent;
  outline-color: green;
  outline-style: solid;
}
.diff_highlights > .red {
  color: transparent;  
  background-color: red;
}
</style>
