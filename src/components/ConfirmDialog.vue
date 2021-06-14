<template>
  <!-- <v-row justify="center"> -->
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item
          v-bind="attrs"
          v-on="on"
        >
          <v-list-item-title
          class='red--text'
        >DELETE</v-list-item-title>
      </v-list-item>
        <!-- <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn> -->
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Delete the group
        </v-card-title>
        <v-card-text>Be aware that all tasks in the group will be deleted. Do you really want to delete the group?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green lighten-1"
            text
            @click="dialog = false"
          >
            No, Keep the group
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteGroups(group)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- </v-row> -->
</template>

<script>
  export default {
    props:['group'],
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      deleteGroups(group) {
        this.dialog = false; 
        const tasks = this.$store.state.tasks.filter( task => task.group_id === group.id)
        // delete groups
        this.$store.dispatch('deleteGroups', group)
        // delete tasks with the group id
        tasks.forEach(task => {
            this.$store.dispatch('deleteTasks', task)
        });
      }
    }
  }
</script>