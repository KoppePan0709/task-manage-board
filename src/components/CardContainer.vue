<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-container>
      <v-row dense>
        <v-col  cols="12">
          <Cardv2 v-for="(task, i) in tasks" :key="i" :task="task"
            v-on:click.native="openDialog(task)"
            @updateCheckbox="updateCheckbox"/>
        </v-col>
      </v-row>
    </v-container>
    <Dialog ref="isShow" @save="save"/>
    <CreateTaskButton/>
  </v-card>
</template>

<script>
// import Card from '@/components/Card'
import Dialog from '@/components/Dialog'
import CreateTaskButton from '@/components/CreateTaskButton'
import Cardv2 from './Cardv2.vue'

export default {
  data: () => ({
    tasks: {
      task_1: {
        id: 'task_1',
        title: 'Task Name 1',
        description: 'Descritiipn',
        finished: false
      },
      task_2: {
        id: 'task_2',
        title: 'Task Name 2',
        description: 'Descritiipn',
        finished: false
      },
      task_3: {
        id: 'task_3',
        title: 'Task Name 3',
        description: 'Descritiipn',
        finished: true
      },
      task_4: {
        id: 'task_4',
        title: 'Task Name 4',
        description: 'Descritiipn',
        finished: true
      }
    },
    dialog: true
  }),
  components: {
    Dialog,
    CreateTaskButton,
    Cardv2
  },
  methods: {
    openDialog (task) {
      console.log('OPEN')
      console.log(this.$refs.isShow.$emit('isShow'))
      this.$refs.isShow.isShow(task)
    },
    save (task) {
      this.tasks[task.id].title = task.title
      this.tasks[task.id].description = task.description
      console.log('SAVE REACH')
    },
    updateCheckbox (task) {
      console.log(task)
      this.tasks[task.id].finished = !task.finished
      console.log(this.tasks[task.id])
    }
  }
}
</script>