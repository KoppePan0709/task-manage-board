<template>
  <v-col  cols="12">
    <v-card color="#385F73" width="350" dark class="overflow-hidden">
      <v-container class="pt-0">
        <v-row no-gutters>
          <v-layout wrap>
          <!-- <v-col cols="1" >
            <v-checkbox
              :input-value="task.finished"
              @click.stop
              @change="updateCheckbox"
              class="pt-pb-1"
            ></v-checkbox>
          </v-col> -->
          <v-col cols="12"><v-card-title class="pa-0 text-h6 font-weight-bold">{{ task.title }}</v-card-title></v-col>
          <!-- <v-col cols="2" align-self="center"><CardMenu/></v-col> -->
          </v-layout >
          <v-col cols="12" ref="description" @click.stop="" align-self="center" v-html="description">
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
// import CardMenu from '@/components/CardMenu'
import CardDescription from '@/components/CardDescription'
import Vue from 'vue'
import marked from 'marked'
// import hljs from 'highlightjs'


export default ({
  props: ['task'],
  data() {
    return {
      task_object: this.task,
      div: ''
    }
  },
  components: {
    // CardMenu,
  },
  methods: {
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
  // mounted () {
  //   let clazz = Vue.extend(CardDescription)
  //   let string_org = marked(this.task.description)
  //   const regexp_html = /(.[\s\S]*?)(?=<p><code)/
  //   const regexp_code = /<p><code>(.[\s\S]*?)<\/code>([\s\S]*?)<\/p>|<pre><code(.[\s\S]*?)>(.[\s\S]*?)<\/code><\/pre>/
  //   while (string_org.match(regexp_html) || string_org.match(regexp_code)) {
  //     if (string_org.match(regexp_html)) {
  //       const div = document.createElement('div')
  //       const html =  string_org.match(regexp_html)
  //       string_org = string_org.replace(html[0], '')
  //       div.innerHTML = html[0]
  //       console.log(html[0])
  //       this.$refs.description.appendChild(div)
  //     }
  //     if (string_org.match(regexp_code)) {
        
  //       const div = document.createElement('div')
  //       const code = string_org.match(regexp_code)
  //       string_org = string_org.replace(code[0], '')
  //       console.log(code[0])
  //       if (code[0].replace('<p>', '<p style="margin: 0;">') != null){
  //         console.log('replace reach')
  //         div.innerHTML = code[0].replace('<p>', '<p style="margin: 0";>')
  //       }else{
  //         console.log('else reach')
  //         div.innerHTML = code[0]
  //       }
        
  //       let instance = new clazz({
  //         propsData: {
  //           code: div
  //         }
  //       }).$mount()
        
  //       this.$refs.description.appendChild(instance.$el)
  //       console.log('instance: ' + instance.$el.innerHTML)
  //       this.text = ''
  //     }
  //   }
  // },

  computed: {
    description: function () {
      let string_org = marked(this.task.description)
      const div = document.createElement('div')
      const regexp_html = /(.[\s\S]*?)(?=<p><code)/
      const regexp_code = /<p><code>(.[\s\S]*?)<\/code>([\s\S]*?)<\/p>|<pre><code(.[\s\S]*?)>(.[\s\S]*?)<\/code><\/pre>/
      while (string_org.match(regexp_html) || string_org.match(regexp_code)) {
        if (string_org.match(regexp_html)) {
          const html =  string_org.match(regexp_html)
          string_org = string_org.replace(html[0], '')
          const div_html = document.createElement('div')
          div_html.innerHTML = html[0]
          div.appendChild(div_html)
        }
        if (string_org.match(regexp_code)) {
          const code = string_org.match(regexp_code)
          const div_code = document.createElement('div')
          string_org = string_org.replace(code[0], '')
          if (code[0].replace('<p>', '<p style="margin: 0;">') != null){
            div_code.innerHTML = code[0].replace('<p>', '<p style="margin: 0";>')
          }else{
            div_code.innerHTML = code[0]
          }
          let clazz = Vue.extend(CardDescription)
          let instance = new clazz({
            propsData: {
              code: div_code
            }
          }).$mount()
          div.appendChild(instance.$el)
          }
        }
        console.log(div)
        return div.innerHTML
      }
  }
  // watch: {
  //   task_object: {
  //     deep: true,
  //     hundler: function () {
  //     let string_org = marked(this.task.description)
  //     const div = document.createElement('div')
  //     const regexp_html = /(.[\s\S]*?)(?=<p><code)/
  //     const regexp_code = /<p><code>(.[\s\S]*?)<\/code>([\s\S]*?)<\/p>|<pre><code(.[\s\S]*?)>(.[\s\S]*?)<\/code><\/pre>/
  //     while (string_org.match(regexp_html) || string_org.match(regexp_code)) {
  //       if (string_org.match(regexp_html)) {
  //         const html =  string_org.match(regexp_html)
  //         string_org = string_org.replace(html[0], '')
  //         const div_html = document.createElement('div')
  //         div_html.innerHTML = html[0]
  //         div.appendChild(div_html)
  //       }
  //       if (string_org.match(regexp_code)) {
  //         const code = string_org.match(regexp_code)
  //         const div_code = document.createElement('div')
  //         string_org = string_org.replace(code[0], '')
  //         if (code[0].replace('<p>', '<p style="margin: 0;">') != null){
  //           div_code.innerHTML = code[0].replace('<p>', '<p style="margin: 0";>')
  //         }else{
  //           div_code.innerHTML = code[0]
  //         }
  //         let clazz = Vue.extend(CardDescription)
  //         let instance = new clazz({
  //           propsData: {
  //             code: div_code
  //           }
  //         }).$mount()
  //         div.appendChild(instance.$el)
  //         }
  //       }
  //       console.log(div)
  //       this.div = div
  //     }  
  //   }
  // }  
})
</script>
