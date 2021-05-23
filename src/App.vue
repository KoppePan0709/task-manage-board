<template>
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
      <v-container fluid>
        <v-row dense justify="center" >
          <v-col cols='4' v-for='group in groups' :key='group.id'>
            <v-card width="500">
              <v-card-title class="text-h6">{{ group.name }}</v-card-title>
              <v-row justify="center">
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
        groups: [
          {
            group_id: 'A',
            name: 'Kubernetes',
          },
          {
            group_id: 'B',
            name: 'todo',
          },
          {
            group_id: 'A',
            name: 'done',
          }
        ],
        tasks: {
          Kubernetes: [
            {
              id: 'task_1',
              title: 'Commands',
              description: '\
              \n ### Pod\
              \n\n`kubectl get pods`\
              \n`kubectl get pod < pod name >`\
              \n`kubectl get pod < pod name > -o wide`\
              \n`kubectl get pod < pod name > -o yaml`\
              \n`kubectl description pod < pod name >`\
              \n`kubectl delete pods < pod name >`\
              \n\n ### Deployment\
              \n\n`kubectl get pods`\
              \n`kubectl get pod < pod name >`\
              \n`kubectl get pod < pod name > -o wide`\
              \n`kubectl get pod < pod name > -o yaml`\
              \n`kubectl description pod < pod name >`\
              \n`kubectl delete pods < pod name >`\
              \n',
              finished: false,
              group: 'Kubernetes'
            },
            {
              id: 'task_2',
              title: 'Ansible',
              description: '\
              \n ##### Playbook実行\
              \n\n`ansible-playbook -i inventories site.yaml`\
              \n##### Playbook実行（デバッグモード）\
              \n`ansible-playbook -i inventories site.yaml -check`\
              \n##### Playbook実行（詳細デバッグモード）\
              \n`ansible-playbook -i inventories site.yaml -vvv`\
              \n',
              finished: false,
              group: 'Kubernetes'
            },
          ],
          todo: [
            {
              id: 'task_4',
              title: '仮想サーバログインコマンド',
              description: '\
              \n ### VPC\
              \n - クラウド管理サーバ\
              \n\n`ssh -i ~/.ssh/id_rsa dkthiqcm11`\
              \n - APIDB\
              \n\n`ssh -i ~/.ssh/id_rsa dkthiqcm11`',
              finished: false,
              group: 'todo'
            },
          ],
          done: [],
        }  
      }
    },
    methods: {
    openDialog (task) {
      this.$refs.isShow.isShow(task)
    },
    save (task) {
      console.log('bofore', this.tasks[task.group][0])
      this.tasks[task.group][0].title = task.title
      this.tasks[task.group][0].description = task.description
      console.log('after', this.tasks[task.group][0])
    },
    updateCheckbox (task) {
      console.log(task)
      this.tasks[task.group].finished = !task.finished
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