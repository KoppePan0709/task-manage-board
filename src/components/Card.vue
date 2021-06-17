<template>
  <v-col class="pa-0" >
    <v-card :color="task.color" max-width="500" dark  @click="openDialog">
      <v-container class="pt-pb-0">
        <v-row no-gutters>
          <v-layout wrap>
            <v-col cols="12" class="pa-0 pt-1">
              <v-card-text class="pa-0 font-weight-bold" >{{ task.title }}</v-card-text>
            </v-col>
          </v-layout >
          <v-col cols="12" ref="description" class="ma-pa-0">
            <v-card-subtitle class="pa-0" v-html="description"></v-card-subtitle>
          </v-col>

          <v-col cols="12" class="pa-0">
            <Dialog ref="isShow" :task="task" :isNew="false"/>
          </v-col>
          <!-- <div class="highlight-json">
            <pre v-html="code"></pre>
          </div> -->
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
// import CardDescription from '@/components/CardDescription'
import hljs from 'highlight.js';
import 'highlight.js/styles/xcode.css';
import Dialog from '@/components/Dialog'
import marked from 'marked'


export default {
  props: ['task'],
  data() {
    return {
    }
  },
  components: {
    Dialog
  },
  methods: {
    openDialog () {
      this.$refs.isShow.isShow()
    },
    updateCheckbox () {
      this.$emit('updateCheckbox', this.task)
    },
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function () {
      alert('Failed to copy texts')
    }
  },
  computed: {
    code: function () {
      const code = 'for (let i = 0; i < cnt; i ++){\
      \n console.log(i)}'
      return hljs.highlightAuto(code,['javascript']).value
    },
    description: function () {
      if (this.task.description) {
        const string = this.task.description
        const lenght = string.length
        const max_length = 20
        const ommision = '...'
        if ( lenght <= max_length) {          
          console.log( 'heyhey', marked(string))
          return string
          
        }else {          
          console.log(string.substring(0, max_length))
          return string.substring(0, max_length) + ommision
        }
        
      }else{
        return ''
      }
    }
  },
  filters: {
    truncate: function(value) {
      var length = 20;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    }
  },
}
</script>