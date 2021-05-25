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
        <v-row dense  >
          <v-col cols='3' v-for='group in groups' :key='group.id'>
            <v-card width="400" >
              <v-row justify="space-between">
                <v-col cols='10' align-self="center" class="pl-5"><v-card-title class="text-h6" > {{ group.name }} </v-card-title></v-col>
                <v-col cols='2' align-self="center" class="pa-1"><v-btn color="#385F73" fab small dark v-on:click.native="openDialog(group.name)"><v-icon dark>mdi-plus</v-icon></v-btn></v-col>
              </v-row>
              <v-row justify="center" >
                <draggable v-model="tasks[group.name]" group="tasks" @start="drag=true" @end="drag=false" >
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
            id: '0',
            name: 'Kubernetes',
            isEditing: false 
          },
          {
            id: '1',
            name: 'todo',
            isEditing: false
          },
          {
            id: '2',
            name: 'doing',
            isEditing: false
          },
          {
            id: '3',
            name: 'done',
            isEditing: false
          },
          {
            id: '4',
            name: 'issue',
            isEditing: false
          },
          {
            id: '5',
            name: 'solved',
            isEditing: false
          }
        ],
        tasks: {
          Kubernetes: [
            {
              id: 'task_1',
              title: 'Commands',
              description: '\
              \n ##### Pod\
              \n\n`kubectl get pods`\
              \n`kubectl get pod < pod name >`\
              \n`kubectl get pod < pod name > -o wide`\
              \n`kubectl get pod < pod name > -o yaml`\
              \n`kubectl description pod < pod name >`\
              \n`kubectl delete pods < pod name >`\
              \n\n ##### Deployment\
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
              \n #### 本番環境\
              \n - ##### クラウド管理サーバ\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`\
              \n - ##### APIDB\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`',
              finished: false,
              group: 'todo'
            },
            {
              id: 'task_5',
              title: '仮想サーバログインコマンド',
              description: '\
              \n #### ステージング\
              \n - ##### クラウド管理サーバ\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`\
              \n - ##### APIDB\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`',
              finished: false,
              group: 'todo'
            },
          ],
          doing: [
            {
              id: 'task_3',
              title: 'ConfigMap実機反映コマンド',
              description: '\
              \n #### コマンド\
              \n - ##### 本番環境\
              \n\n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `\
              \n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `\
              \n - ##### ステージング環境\
              \n\n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `\
              \n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `\
              \n - ##### 検証環境\
              \n\n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `\
              \n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `\
              \n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `\
              \n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `\
              \n`oc create configmap < configmap name> -f path/to/file.env --dry-run -o yaml | oc create comfigmap -f - `',
              finished: false,
              group: 'doing'
            }
          ],
          done: [
            {
              id: 'task_5',
              title: '仮想サーバログインコマンド',
              description: '\
              \n ### VPC\
              \n - クラウド管理サーバ\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`\
              \n - APIDB\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`',
              finished: false,
              group: 'done'
            }
          ],
          issue: [
            {
              id: 'task_7',
              title: '仮想サーバログインコマンド',
              description: '\
              \n ### VPC\
              \n - クラウド管理サーバ\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`\
              \n - APIDB\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`',
              finished: false,
              group: 'issue'
            }
          ],
          solved: [
            {
              id: 'task_8',
              title: '仮想サーバログインコマンド',
              description: '\
              \n ### VPC\
              \n - クラウド管理サーバ\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`\
              \n - APIDB\
              \n\n`ssh -i ~/.ssh/id_rsa hostname01`',
              group: 'solved'
            }
          ],
        }  
      }
    },
    methods: {
    openDialog (task) {
      this.$refs.isShow.isShow(task)
    },
    save (task, isNew) {
      if(!isNew){
        this.tasks[task.group][0].title = task.title
        this.tasks[task.group][0].description = task.description
      }else{
        const newCard = {
        id: 'testid',
        title: task.title,
        description: task.description,
        group: task.group
        }
        if(task.title){
          console.log(task.group)
          console.log(this.tasks[task.group])
          this.tasks[task.group].push(newCard)
        }
      }
    },
    updateCheckbox (task) {
      console.log(task)
      this.tasks[task.group].finished = !task.finished
      console.log(this.tasks[task.id])
    },
  },
    components: {
      Cardv2,
      Dialog,
      draggable
    }
  }
</script>