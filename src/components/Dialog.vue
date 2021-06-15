<template>
<div>
  <v-dialog v-model="dialog" max-width="600"  @input="v => v || offEditting()">
    <v-card v-if="!editting" :color="task.color" dark >
      <v-container>
        <v-row no-gutters class="pa-4">
          <v-layout wrap>
            <v-col cols="10">
              <v-card-title class="pa-0 text-h6 font-weight-bold" >{{ task.title }}</v-card-title>
            </v-col>
            <!-- <v-col cols="1" align-self="right"><v-icon  @click="onEditting()">mdi-square-edit-outline</v-icon></v-col> -->
            <v-col cols="1" ><v-icon  @click="onEditting()">mdi-square-edit-outline</v-icon></v-col>
            <!-- <v-col cols="1" align-self="right"><v-icon>mdi-delete</v-icon></v-col> -->
            <v-col cols="1" ><v-icon>mdi-delete</v-icon></v-col>
          </v-layout >
          <v-col cols="12" ref="description" @click.stop="" align-self="center" v-html="description"></v-col>
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
  },
  methods: {
    validate () {
        this.$refs.form.validate()
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
    }
  },
  computed: {
    description: function () {
      if (this.task.description) {
          return marked(this.task.description)
      }else{
        return ''
      }
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
