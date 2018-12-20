<template>
  <div class="diff_container">
    <div class="backdrop">
        <div class="diff_highlights" contenteditable="true" v-html="highlightHtml"></div>
    </div>
    <div id="input_str" ref="input_str" contenteditable="true" @input="update" >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftStr: String
  },
  data () {
    return {
      highlightHtml: ''
    }
  },
  methods: {
    update (event) {
      var inputStr = event.target.innerText

      var jsdiff = require('diff')
      var diff = jsdiff.diffChars(this.leftStr, inputStr)
      var resultHtml = ''
      var tempHtml = ''
      var startIndex = 0
      diff.forEach(part => {
        var color = part.added ? 'red' : part.removed ? 'green' : 'grey'
        var endIndex = startIndex + part.count
        if (color === 'red') {
          if (part.value.length > 0 && part.value.trim()) {
            tempHtml = '<span class="red">' + inputStr.substr(startIndex, part.count) + '</span>'
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
          tempHtml = inputStr.substr(startIndex, part.count)
          resultHtml = resultHtml + tempHtml
          startIndex = endIndex
        }
      })

      this.highlightHtml = resultHtml
    }
  },
  watch: {
    leftStr (newValue, oldValue) {
      this.$refs.input_str.innerText = ''
      this.highlightHtml = ''
    }
  }
}
</script>

<style>
.diff_container, .backdrop, #input_str {
  width: 100%;
  height: 120px;
}
.diff_highlights, #input_str {
  font-family: sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  line-height: 1.3;
}
.diff_container {
  display: block;
  position: relative;
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
#input_str {
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
  text-align: left;
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
