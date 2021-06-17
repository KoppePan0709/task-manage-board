<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
  
    <template v-slot:activator="{ on, attrs }">
      
      <v-icon
        v-bind="attrs"
        v-on="on"
      >mdi-delete</v-icon>
    
    </template>
      
    <v-card>
      
      <v-card-title class="text-h5">
        Delete the Card?
      </v-card-title>
      
      <v-card-actions>
        <v-spacer></v-spacer>
          
          <v-btn
            color="green lighten-1"
            text
            @click="dialog = false"
          >
            No
          </v-btn>
          
          <v-btn
            color="red darken-1"
            text
            @click="deleteTasks(task)"
          >
            Yes
          </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>
  
</template>

<script>
export default {
    props:['task'],
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      deleteTasks(task) {
        this.dialog = false; 
        this.$store.dispatch('deleteTasks', task)
        }
    }
}
</script>