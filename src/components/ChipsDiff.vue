<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-textarea
          v-model="inputStr"
          outline
          readonly
          hide-details
          rows="2"
          auto-grow
          label="spelling"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm12>
        <v-chip
          v-for="(item, index) in suffledLeftStrArray"
          :key="index"
          @click="selectWord(item, index)"
          v-if="item.length>0"
        >
          {{ item }}
        </v-chip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    leftStr: String
  },
  data () {
    return {
      curIndex: 0,
      inputStr: '',
      leftStrArry: [],
      suffledLeftStrArray: []
    }
  },
  methods: {
    /**
     * Shuffles array in place. ES6 version (Reference: https://stackoverflow.com/a/6274381)
     * @param {Array} a items An array containing the items.
     */
    shuffle (a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
    selectWord (word, index) {
      console.log('selectWord()', this.leftStrArry[this.curIndex], word)
      if (this.leftStrArry[this.curIndex] !== word) {
        console.log('selectWord(). not matched. do nothing')
        return
      }

      if (this.curIndex > 0) this.inputStr += ' '
      this.inputStr += word
      this.suffledLeftStrArray[index] = ''
      this.curIndex++
    }
  },
  watch: {
    leftStr (newValue, oldValue) {
      console.log('watch', newValue, oldValue)
      this.curIndex = 0
      this.inputStr = ''
      this.leftStrArry = this.leftStr.split(' ')
      this.suffledLeftStrArray = this.leftStr.split(' ')
      this.shuffle(this.suffledLeftStrArray)
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>
