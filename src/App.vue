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
        </v-row>
      </v-container>
      <Dialog ref="isShow" @save="save"/>
    </v-main>
  </v-app>
</template>

<script>
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
            title: 'Title, Descriptionを変更する機能を追加する',
            description: '\
            \n ### 課題\
            \n - Dictionary型でDraggableをできる方法が必要\
            \n - データ構造を検討\
            \n  - 各タスクをidで識別する必要がありそう',
            finished: false,
            belong_to: 'backlog'
          },
          {
            id: 'task_1',
            title: 'Task Name YYY',
            description: '### You can user mrkdwn here like ...\
            \n\n \
            \n```bash\
            \n ここはコードブロック\
            \n ここはコードブロック\
            \n ここはコードブロック\
            \n ここはコードブロック\
            \n ここはコードブロック\
            \n\
            \n```\
            \n',
            finished: false,
            belong_to: 'backlog'
          },
          {
            id: 'task_1',
            title: 'Task Name ZZZ',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'backlog'
          }],
          todo: [{
            id: 'task_1',
            title: 'Task Name XXX',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'todo'
          },
          {
            id: 'task_1',
            title: 'Task Name YYY',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'todo'
          },
          {
            id: 'task_1',
            title: 'Task Name ZZZ',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'todo'
          }],
          doing: [{
            id: 'task_1',
            title: 'Task Name XXX',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'doing'
          },
          {
            id: 'task_1',
            title: 'Task Name YYY',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'doing'
          },
          {
            id: 'task_1',
            title: 'Task Name ZZZ',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'doing'
          }],
          done: [{
            id: 'task_1',
            title: 'Task Name XXX',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'done'
          },
          {
            id: 'task_1',
            title: 'Task Name YYY',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'done'
          },
          {
            id: 'task_1',
            title: 'Task Name ZZZ',
            description: 'Descritiipn',
            finished: false,
            belong_to: 'done'
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
      console.log('bofore', this.tasks[task.belong_to])
      this.tasks[task.belong_to].title = task.title
      this.tasks[task.belong_to].description = task.description
      console.log('after', this.tasks[task.belong_to].description)
      console.log('SAVE REACH')
    },
    updateCheckbox (task) {
      console.log(task)
      this.tasks[task.belong_to].finished = !task.finished
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