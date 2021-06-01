<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600"
      
    >
        <v-card class="pa-4" >
            <v-container>
              <v-row justify="center">
                <v-col cols="12" align="center" class="pb-0"><v-text-field color="teal"  label="Task Title" v-model="task.title" outlined dense required></v-text-field></v-col>
                <!-- <v-col cols="2" align="center" class="pt-pb-0"><v-chip class="ma-0" color="primary">#111111</v-chip></v-col> -->
              </v-row>
              <v-row>
                  <v-col cols="12" align="center">
                    <v-textarea color="teal" append-icon="mdi-language-markdown" name="input-7-1" label="Description"  v-model="task.description" rows="20" outlined></v-textarea></v-col>
                  <v-col cols="12" align="center">
                      <v-btn elevation="2" rounded color="#385F73" dark v-on:click="save">Save</v-btn>
                  </v-col>
              </v-row>
            </v-container> 
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script scoped>
// import { mapMutations } from 'vuex'

export default {
  props: ['task', 'isNew', 'group_name'],
  data () {
      return {
          dialog: false,
      }
  },
  methods: {
    isShow () {
      this.dialog = !this.dialog
      console.log('isShow', this.task)
    },  
    save () {   
      if (this.isNew != true) {
        this.dialog = !this.dialog
        console.log('FIRE')
        this.$store.dispatch('updateTasks', this.task)
      }else{
        this.dialog = !this.dialog
        const task = {
          id: getUniqueID(),
          user_id: this.$store.state.user_id,
          group_id: this.group_name,
          title: this.task.title,
          description: this.task.description
        }
        this.$store.dispatch('createTasks', task)
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