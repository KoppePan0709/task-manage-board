<template>
<div>
  <v-dialog v-model="dialog" max-width="600">
    <v-card color="green" dark>
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
              v-model="task.title"
              dense
              required
              outlined
             ></v-text-field>
          <v-card-title class="pa-0"><v-icon class="pr-3">mdi-language-markdown</v-icon>Description</v-card-title>
          <v-textarea
              color="white"
              name="input-7-1"
              v-model="task.description"
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
export default {
  props: ['group_id'],
  data () {
      return {
          dialog: false,
          task: { title: '', description: ''},
          valid: true,
          rules: [
            v => !!v || 'Name is required',
          ],
      }
  },
  methods: {
    openDialog () {
      this.dialog = !this.dialog
    },
    validate () {
        this.$refs.form.validate()
      },
    save () {
      console.log('createCardDialog: save()')
      this.dialog = !this.dialog
        const task = {
          id: getUniqueID(),
          user_id: this.$store.state.user_id,
          group_id: this.group_id,
          title: this.task.title,
          description: this.task.description
        }
        this.$store.dispatch('createTasks', task)
        this.task.title = ''
        this.task.description = ''
    },
  }
}

function getUniqueID(myStrong){
  /* ToDoのIDを作成 */
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

</script>
