<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title v-bind="attrs" v-on="on">{{ taskTitle }}</v-card-title>
      </template>
      <v-card>
        <v-card-title class="headline">
            <!-- <Textfield :title.sync="task.title" @updateTask="updateTask"/> -->
            <Textfield v-model="taskTitle" :taskTitle="taskTitle"/>
            <Textarea v-model="taskDesc" :taskTitle="taskDesc"/>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false;" >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script scoped>
import Textfield from '@/components/Textfield'
import Textarea from '@/components/Textarea'

export default {
  props:{
    task: Object
  },
  data () {
    return {
      dialog: false,
    }
  },
  components: {
    Textfield,
    Textarea
  },  
  computed: {
    taskTitle: {
      get () {
        return this.task.title
      },
      set (newTitle) {
        this.task.title = newTitle
      }
    },
    taskDesc: {
      get () {
        return this.task.description
      },
      set (newDesc) {
        this.task.description = newDesc
        this.$emit('input', newDesc)
      }
    }
  }
}
</script>