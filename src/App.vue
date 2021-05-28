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
            <div><Dialog ref="isShow" :task="{group: group.name}" :isNew="true"/></div>
            <v-card width="400" >
              <v-row justify="space-between">
                <v-col cols='10' align-self="center" class="pl-5"><v-card-title class="text-h6" > {{ group.name }} </v-card-title></v-col>
                <v-col cols='2' align-self="center" class="pa-1">
                  <v-btn color="#385F73" fab small dark >
                    <v-icon dark @click="openDialog(group.id)" >mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row justify="center" >
                <draggable v-model="tasks[group.name]" group="tasks" @start="drag=true" @end="drag=false" >
                  <v-col cols='12' v-for="task in tasks[group.name]" :key="task.id">
                    <Cardv2 :task="task"/>
                  </v-col>
                </draggable>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Cardv2 from '@/components/Cardv2'
import Dialog from '@/components/Dialog'
import draggable from 'vuedraggable'
import { mapState } from 'vuex'



export default {
  data () {
    return {
      showDialog: false
    }
  },
  components: {
    Cardv2,
    Dialog,
    draggable
  },
  computed: mapState([
    'count',
    'posts',
    'groups',
    'tasks'
  ]),
  methods: {
    openDialog (id) {
      console.log('Fire')
      console.log(this.$refs.isShow)
      this.$refs.isShow[id].isShow()
      }
    // openDialog (task) {
    //   console.log('openDialog', task)
    //   this.showDialog = !this.showDialog
    //   this.$refs.isShow.isShow(task)
  // },
    // save (task, isNew) {
    //   if(!isNew){
    //     this.tasks[task.group][0].title = task.title
    //     this.tasks[task.group][0].description = task.description
    //   }else{
    //     const newCard = {
    //     id: 'testid',
    //     title: task.title,
    //     description: task.description,
    //     group: task.group
    //     }
    //     if(task.title){
    //       console.log(task.group)
    //       console.log(this.tasks[task.group])
    //       this.tasks[task.group].push(newCard)
    //     }
    //   }
    // },
    // updateCheckbox (task) {
    //   console.log(task)
    //   this.tasks[task.group].finished = !task.finished
    //   console.log(this.tasks[task.id])
    // },
  }
}
</script>