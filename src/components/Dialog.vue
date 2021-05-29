<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
        <v-card class="pa-4" >
            <v-container>
                <v-row>
                    <v-col cols="12" align="center"><v-text-field v-model="task.title" label="task title" required></v-text-field></v-col>
                    <v-col cols="12" align="center"><v-textarea name="input-7-1" label="Description"  v-model="task.description" rows="20"></v-textarea></v-col>
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
  props: ['task', 'isNew'],
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
        this.$store.commit('updateTasks', this.task)
      }else{
        this.dialog = !this.dialog
        this.$store.dispatch('createTasks', this.task)
      }
      
      
    }
  }
}
</script>