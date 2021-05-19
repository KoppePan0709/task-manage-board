<template>
  <!-- <v-app id="inspire">
    <v-main>
      <Drawer/>
    </v-main>
  </v-app> -->
  <v-app id="inspire">
    <v-app-bar
      app
      shrink-on-scroll
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols='4' v-for='group in taskGroups' :key='group.id'>
            <v-card>
              <v-card-title>{{ group.name }}</v-card-title>
              <v-row>
                <draggable v-model="tasks[group.name]" group="tasks" @start="drag=true" @end="drag=false">
                  <v-col cols='12' v-for="task in tasks[group.name]" :key="task.id">
                    <Cardv2 :task="task"
                    v-on:click.native="openDialog(task)"
                    @updateCheckbox="updateCheckbox"/>
                  </v-col>
                </draggable>
              </v-row>
            </v-card>
          </v-col>
          <!-- <v-col cols='4'>
            <v-card>
              <v-card-title>Doign</v-card-title>
              <v-row>
                <draggable v-model="lists2" group="people" @start="drag=true" @end="drag=false">
                  <v-col cols='12' v-for="list in lists2" :key="list.id"><Cardv2 :task="list"/></v-col>
                </draggable>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols='4'>
            <v-card>
              <v-card-title>Done</v-card-title>
              <v-row>
                <draggable v-model="lists3" group="people" @start="drag=true" @end="drag=false">
                  <v-col cols='12' v-for="list in lists3" :key="list.id"><Cardv2 :task="list"/></v-col>
                </draggable>
              </v-row>
            </v-card>
          </v-col> -->
        </v-row>
      </v-container>
      <Dialog ref="isShow" @save="save"/>
    </v-main>
  </v-app>
</template>

<script>
// import Drawer from '@/components/Drawer'

// export default {
//   data: () => ({ drawer: null }),
//   components: {
//     Drawer
//   }
// }
import Cardv2 from '@/components/Cardv2'
import Dialog from '@/components/Dialog'
import draggable from 'vuedraggable'

export default {
    data () {
      return {
        taskGroups: [
          {
            group_id: 'A',
            name: 'backlog',
          },
          {
            group_id: 'B',
            name: 'todo',
          },
          {
            group_id: 'A',
            name: 'doing',
          },
          {
            group_id: 'A',
            name: 'done',
          }
        ],
        tasks: {
          backlog: [{
            id: 'task_1',
            title: 'Task Name XXX',
            description: '### You can user mrkdwn here like ...\
            \n - list\
            \n 1. numberned list\
            \n 2. numberned list\
            \n `inline code`\
            \n <details><summary>the script here is shown as a summary when the tab is closed</summary>You can write details</details>',
            finished: false
          },
          {
            id: 'task_1',
            title: 'Task Name YYY',
            description: 'Descritiipn',
            finished: false
          },
          {
            id: 'task_1',
            title: 'Task Name ZZZ',
            description: 'Descritiipn',
            finished: false
          }],
          todo: [{
            id: 'task_1',
            title: 'Task Name XXX',
            description: 'Descritiipn',
            finished: false
          },
          {
            id: 'task_1',
            title: 'Task Name YYY',
            description: 'Descritiipn',
            finished: false
          },
          {
            id: 'task_1',
            title: 'Task Name ZZZ',
            description: 'Descritiipn',
            finished: false
          }],
          doing: [{
            id: 'task_1',
            title: 'Task Name XXX',
            description: 'Descritiipn',
            finished: false
          },
          {
            id: 'task_1',
            title: 'Task Name YYY',
            description: 'Descritiipn',
            finished: false
          },
          {
            id: 'task_1',
            title: 'Task Name ZZZ',
            description: 'Descritiipn',
            finished: false
          }],
          done: [{
            id: 'task_1',
            title: 'Task Name XXX',
            description: 'Descritiipn',
            finished: false
          },
          {
            id: 'task_1',
            title: 'Task Name YYY',
            description: 'Descritiipn',
            finished: false
          },
          {
            id: 'task_1',
            title: 'Task Name ZZZ',
            description: 'Descritiipn',
            finished: false
          }],
        }  
      }
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
  },
    components: {
      Cardv2,
      Dialog,
      draggable
    }
  }
</script>