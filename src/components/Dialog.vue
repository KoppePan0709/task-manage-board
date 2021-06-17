<template>
<div>
  <v-dialog
    v-model="dialog"
    max-width="600"
    @input="v => v || offEditting()"
    >
    <v-card v-if="!editting" :color="task.color" dark >
      <v-container>
        <v-row no-gutters class="pa-4">
          <v-layout wrap>
            <v-col cols="9">
              <v-card-title class="pa-0 text-h6 font-weight-bold" >{{ task.title }}</v-card-title>
            </v-col>
            <v-col cols="1" ><CardColorDialog :task="task"/></v-col>
            <v-col cols="1" ><v-icon @click="onEditting()">mdi-square-edit-outline</v-icon></v-col>
            <!-- <v-col cols="1" ><v-icon @click="deleteCard(task)">mdi-delete</v-icon></v-col> -->
            <v-col cols="1" ><CardDeleteButton :task="task"/></v-col>
          </v-layout >
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
          <v-card-title class="pa-0"><v-icon class="pr-3">mdi-subtitles-outline</v-icon>Title</v-card-title>
          <v-text-field
              color="white"
              :rules="rules"
              v-model="taskData.title"
              dense
              required
              outlined
             ></v-text-field>
          <v-card-title class="pa-0"><v-icon class="pr-3">mdi-language-markdown</v-icon>Description</v-card-title>
          <v-textarea
              color="white"
              name="input-7-1"
              v-model="taskData.description"
              rows="15"
              outlined
              ></v-textarea>
              
          <v-btn                     
                v-on:click="save"
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
    CardDeleteButton
  },
  methods:{
    // copy(text) {
    //   console.log('fire')
    //   var input = document.createElement('input');
    //   input.setAttribute('id', 'copyinput');
    //   document.body.appendChild(input);
    //   input.value = text;
    //   input.select();
    //   document.execCommand('copy');
    //   document.body.removeChild(input);
    // },
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
    isShow () {
      this.dialog = !this.dialog
      console.log('isShow', this.taskData)
    },  
    save () {   
      if (this.isNew != true) {
        // this.dialog = !this.dialog
        this.editting = !this.editting
        console.log('FIRE')
        this.$store.dispatch('updateTasks', this.taskData)

      }else{
        this.dialog = !this.dialog
        const task = {
          id: getUniqueID(),
          user_id: this.$store.state.user_id,
          group_id: this.group_name,
          title: this.taskData.title,
          description: this.taskData.description
        }
        this.$store.dispatch('createTasks', task)
        this.taskData.title = ''
        this.taskData.description = ''
      }
    },
    onEditting () {
      this.editting = true
      console.log('switch', this.editting)
    },
    offEditting () {
      this.editting = false
      console.log(this.editting)
    },
    deleteCard (task) {
      this.$store.dispatch('deleteTasks', task)
    }
  },
  computed: {
    description: function () {
      // if (this.task.description) {
      //     return marked(this.task.description)
      // }else{
      //   return ''
      // }


      let descHtml = marked(this.task.description)
      const div = document.createElement('div')
      div.innerHTML = descHtml
      const codes = div.getElementsByTagName('code')
      codes.forEach(code => {
        console.log(code)
        code.setAttribute('onclick', "const input = document.createElement('input'); \
        input.setAttribute('id', 'copyinput');\
        document.body.appendChild(input);\
        input.value = 'HHHHHH';\
        input.select();\
        document.execCommand('copy');\
        document.body.removeChild(input);\
        console.log('resch')")
      })
      
      console.log(codes)
    
    
        
      
    
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
