<template>
<div>
  <v-dialog
    v-model="dialog"
    max-width="600"
    @input="v => v || offEditting()"
    >
    <v-card v-if="!editting" :color="task.color" dark min-height="800">
      <v-container>
        <v-row no-gutters class="pa-4">
          <v-layout wrap>
            <v-col cols="9" class="pa-1">
              <v-card-title class="pa-0 text-h6 font-weight-bold" >{{ task.title }}</v-card-title>
            </v-col>
            <v-col cols="1" class="pa-1"><CardColorDialog :task="task"/></v-col>
            <v-col cols="1" class="pa-1"><v-icon @click="onEditting()">mdi-square-edit-outline</v-icon></v-col>
            <v-col cols="1" class="pa-1"><CardDeleteButton :task="task"/></v-col>
          </v-layout >
          <v-col cols="12"><tagLine :task="task"/></v-col>
          <v-col cols="12" ref="description" align-self="center" v-html="description">
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-else :color="task.color" dark>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="pa-10"
           >
          <v-layout column >
          <v-card-title class="pa-0 pb-1"><v-icon class="pr-3">mdi-subtitles-outline</v-icon>Title</v-card-title>
          <v-text-field
              color="white"
              class="ma-0"
              :rules="rules"
              v-model="taskData.title"
              dense
              required
              outlined
             ></v-text-field>
          <v-card-title class="pa-0 ma-0 mb-1"><v-icon class="pr-3">mdi-tag-outline</v-icon>Tags</v-card-title>
            <div>
            
              <tagAddButton :task="task" @input="selectTags($event)"/>

            </div>
          <v-card-title class="pa-0 pb-1"><v-icon class="pr-3">mdi-language-markdown</v-icon>Description</v-card-title>
          <v-textarea
              color="white"
              name="input-7-1"
              v-model="taskData.description"
              rows="15"
              outlined
              ></v-textarea>
              
          <v-btn                     
                @click="save"
                color="white"
                outlined
                dark
              >Save</v-btn>
          </v-layout>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script scoped>
// import { mapMutations } from 'vuex'
import marked from 'marked'
import CardColorDialog from '@/components/CardColorDialog'
import CardDeleteButton from '@/components/CardDeleteButton'
import tagAddButton from '@/components/tagAddButton'
import tagLine from '@/components/tagLine'


export default {
  props: ['task', 'isNew', 'group_name'],
  data () {
      return {
          dialog: false,
          taskData: this.task,
          editting: false,
          valid: true,
          rules: [
            v => !!v || 'Name is required',
          ],
      }
  },
  components: {
    CardColorDialog,
    CardDeleteButton,
    tagAddButton,
    tagLine
  },
  methods:{
    validate () {
        if(this.$refs.form.validate() === true){
          this.dialog = !this.dialog
          const group = {
            id: getUniqueID(),
            user_id: this.$store.state.user_id,
            name: this.groupName,
            active: true
          }
          this.groupName = ''
          this.$store.dispatch('createGroups', group)
        }else {
          console.log(this.$refs.form.validate())
        }
      },
    openDialog () {
      console.log('Dialog: openDialog')
      this.dialog = true
    },  
    save () {
      console.log('Dialog: save')
      this.editting = false
      this.$store.dispatch('updateTasks', this.taskData)
    },
    onEditting () {
      console.log('Dialog: onEditting')
      this.editting = true
      console.log('switch', this.editting)
    },
    offEditting () {
      console.log('Dialog: offEditting')
      this.save()
      this.dialog = false
    },
    deleteCard (task) {
      console.log('Dialog: deleteCard')
      this.$store.dispatch('deleteTasks', task)
    },
    selectTags (event) {
      console.log('Dialog: selectTags')
      this.taskData.tags = event
    }
  },
  computed: {
    description: function () {
      // if (this.task.description) {
      //     return marked(this.task.description)
      // }else{
      //   return ''
      // }

    const codeBlock = {
      name: 'codeBlock',
      level: 'block',                                     // Is this a block-level or inline-level tokenizer?
      start(src) { return src.match(/```[\s\S][^```\n]/)?.index;}, // Hint to Marked.js to stop and check for a match
      tokenizer(src, tokens) {
        console.log(tokens)
        const rule = /```[\s\S]*?```/;    // Regex for the complete token
        const match = rule.exec(src);
        if (match) {
          return {                                        // Token to generate
            type: 'codeBlock',                      // Should match "name" above
            raw: match[0],                                // Text to consume from the source
            text: match[0].trim(),                        // Additional custom properties
            tokens: this.inlineTokens(match[0].trim())    // inlineTokens to process **bold**, *italics*, etc.
          };
        }
      },
      renderer(token) {
        return `<dl>${this.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
      }
    };

    marked.use({extensions: [codeBlock] });

      let descHtml = marked(this.task.description)
      console.log(descHtml)
      const div = document.createElement('div')

      div.innerHTML = descHtml
      const codes = div.getElementsByTagName('code')
      codes.forEach(code => {
        const parent = code.parentElement
        const icon = document.createElement('i')
        icon.setAttribute('class', "far fa-copy")
        icon.setAttribute('style', "margin-left: 10px;")
        icon.setAttribute('onclick', `execCopy(event)`)
        parent.insertBefore(icon, code.nextSibling)
      })

      console.log(codes)

      // const div = document.createElement('div')
      // div.innerHTML = 'aoisdjof'
      // const button = document.createElement('button')
      // button.innerHTML = 'Copy'
      // button.setAttribute('onclick', "console.log('Copied')")
      // div.appendChild(button)

      // div.getElementsByTagName('button').onclick = () =>{
      //   console.log('osdfjo')
      // }
      // document.getElementById('button').onclick = () => {
      //   var text = document.getElementById('textarea').value;
      //   ).then(e => {
      //     console.log(e)
      //     alert('コピーできました');
      //   });navigator.clipboard.writeText(text
      // };
    
    
        
      
    
      // const div = document.createElement('div')
      // const regexp_html = /(.[\s\S]*?)(?=<p><code)/ //code以外を抽出する正規表現
      // const regexp = /<.*?>/g
      // const regexp = />.*?</g
      // const regexp_html = /(.[\s\S]*?)(?=<code)/ //code以外を抽出する正規表現
      // const regexp_code = /<p><code>(.[\s\S]*?)<\/code>([\s\S]*?)<\/p>|<pre><code(.[\s\S]*?)>(.[\s\S]*?)<\/code><\/pre>/  //codeを抽出する正規表現
      // console.log(descHtml.match(regexp))
      // while (descHtml.match(regexp_html) || descHtml.match(regexp_code)) {
      //   /* code以外の要素を処理 */
      //   if (descHtml.match(regexp_html)) {
      //     const html =  descHtml.match(regexp_html)
      //     descHtml = descHtml.replace(html[0], '')
      //     const div_html = document.createElement('div')
      //     div_html.innerHTML = html[0]
      //     div.appendChild(div_html)
      //     console.log('hhhhhhhhhhh', div)
      //   }
      //   /* codeの要素を処理 */
      //   if (descHtml.match(regexp_code)) {
      //     const code = descHtml.match(regexp_code)
      //     const div_code = document.createElement('div')
      //     descHtml = descHtml.replace(code[0], '')
      //     if (code[0].replace('<p>', '<p style="margin: 0;">') != null){
      //       div_code.innerHTML = code[0].replace('<p>', '<p style="margin: 0";>')
      //     }else{
      //       div_code.innerHTML = code[0]
      //     }
      //     div_code.onclick = function(){
      //       console.log('Fire')
      //     }
      //     // let clazz = Vue.extend(CardDescription)
      //     // let instance = new clazz({
      //     //   propsData: {
      //     //     code: div_code
      //     //   }
      //     // }).$mount()
      //     // div.appendChild(instance.$el)
      //     // }
      //     div.appendChild(div_code)
      //   }
      // //   console.log(div)
      // }
      // return div.innerHTML
      return div.innerHTML
    }
  }
}

function getUniqueID(myStrong){
  /* ToDoのIDを作成 */
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}


</script>
