<template>
  <v-col class="pa-0" >
    <v-card color="#4c758a" max-width="500" dark  @click="openDialog" >
      <v-img
            class="white--text align-end"
            height="10px"
            src="https://picsum.photos/id/384/200/300"
            ></v-img>
      <v-container class="pt-pb-0">
        <v-row no-gutters>
          <v-layout wrap>
            <v-col cols="10" class="pa-0 pt-1"><v-card-title class="pa-0 text-h6 font-weight-bold" >{{ task.title }}</v-card-title></v-col>
            <v-col cols="2" class="pa-0" align-self="top"><CardMenu :task="task"/></v-col>
          </v-layout >
          <v-col cols="12" ref="description" @click.stop="" align-self="center" class="ma-pa-0"><v-card-subtitle class="pa-0" v-html="description"></v-card-subtitle></v-col>
          <!-- <v-col cols="12" ref="description" @click.stop="" align-self="center" v-html="description"></v-col> -->
          <v-col cols="12" class="pa-0"><Dialog ref="isShow" :task="task" :isNew="false"/></v-col>
          <!-- <div class="highlight-json">
            <pre v-html="code"></pre>
          </div> -->
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import CardMenu from '@/components/CardMenu'
// import CardDescription from '@/components/CardDescription'
import hljs from 'highlight.js';
import 'highlight.js/styles/xcode.css';
import Dialog from '@/components/Dialog'
import marked from 'marked'
// import Vue from 'vue'

export default ({
  props: ['task'],
  data() {
    return {
      div: ''
    }
  },
  components: {
    CardMenu,
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
          console.log( marked(string))
          return string
          
        }else {          
          console.log(string.substring(0, max_length))
          return string.substring(0, max_length) + ommision
        }
        
      }else{
        return ''
      }
      
      // let string_org = marked(this.task.description)
      // const div = document.createElement('div')
      // const regexp_html = /(.[\s\S]*?)(?=<p><code)/
      // const regexp_code = /<p><code>(.[\s\S]*?)<\/code>([\s\S]*?)<\/p>|<pre><code(.[\s\S]*?)>(.[\s\S]*?)<\/code><\/pre>/
      // while (string_org.match(regexp_html) || string_org.match(regexp_code)) {
      //   if (string_org.match(regexp_html)) {
      //     const html =  string_org.match(regexp_html)
      //     string_org = string_org.replace(html[0], '')
      //     const div_html = document.createElement('div')
      //     div_html.innerHTML = html[0]
      //     div.appendChild(div_html)
      //   }
      //   if (string_org.match(regexp_code)) {
      //     const code = string_org.match(regexp_code)
      //     const div_code = document.createElement('div')
      //     string_org = string_org.replace(code[0], '')
      //     if (code[0].replace('<p>', '<p style="margin: 0;">') != null){
      //       div_code.innerHTML = code[0].replace('<p>', '<p style="margin: 0";>')
      //     }else{
      //       div_code.innerHTML = code[0]
      //     }
      //     let clazz = Vue.extend(CardDescription)
      //     let instance = new clazz({
      //       propsData: {
      //         code: div_code
      //       }
      //     }).$mount()
      //     div.appendChild(instance.$el)
      //     }
      //   }
      //   console.log(div)
      //   return div.innerHTML
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
})
</script>