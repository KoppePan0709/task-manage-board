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
      <v-container fluid class="pt-3 pb-0">
        <v-row dense>
          <v-col cols='3' v-for='group in groups' :key='group.id'>
            <card-container :group="group"/>
<!--             
            <v-card width="400" class="ma-2">

              <v-row justify="center">                
                <template v-if="isEditting">
                  <v-col cols='11' align-self="center">
                    <v-text-field label="Solo" solo></v-text-field>
                </v-col>
                </template>
                <template v-else>
                  <v-col cols='11' align-self="center" class="pa-0 pl-5" @click="isEditting = !isEditting">
                    <v-card-title class="text-h6 pa-0 pt-2">{{ group.name }}</v-card-title>
                  </v-col>
                </template>
              </v-row>

              <v-row justify="center" >
                <draggable v-model="tasks[group.name]" group="tasks" @start="drag=true" @end="drag=false" >
                  <v-col cols='12' v-for="task in tasks[group.name]" :key="task.id">
                    <Cardv2 :task="task"/>
                  </v-col>
                </draggable>
              </v-row>

              <v-row justify="center">
                <v-col cols="11"><v-btn block color="#d8d8d8" elevation="0" @click="openDialog(group.id)">+ new card</v-btn></v-col>
                <div><Dialog ref="isShow" :group_name="group.name" :task="{}" :isNew="true"/></div>
              </v-row>
            </v-card>
             -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import Cardv2 from '@/components/Cardv2'
// import Dialog from '@/components/Dialog'
// import draggable from 'vuedraggable'
import { mapState } from 'vuex'

import CardContainer from '@/components/CardContainer'


export default {
  data () {
    return {
      showDialog: false,
      // isEditting: false
    }
  },
  components: {
    // Cardv2,
    // Dialog,
    // draggable,
    CardContainer
  },
  computed: {
    ...mapState([
      'groups',
      'tasks'
    ]),
  },
  // methods: {
  //   openDialog (id) {
  //     console.log('Fire')
  //     console.log(this.$refs.isShow)
  //     this.$refs.isShow[id].isShow()
  //     }
  // }
}
</script>