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
        
          <v-col cols='3' v-for='group in groups' :key='group.id' class="mt-3">
            <card-container :group="group"/>
          </v-col>
          
          
          <v-col cols="3"><v-btn block color="#4c758a" dark elevation="0" @click="openDialog()">+ add group</v-btn></v-col>
          <addGroupDialog ref="openDialog"/>
          
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
import AddGroupDialog from './components/addGroupDialog.vue'


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
    CardContainer,
    AddGroupDialog
  },
  computed: {
    ...mapState([
      'groups',
      'tasks'
    ]),
  },
  methods: {
    openDialog () {
      this.$refs.openDialog.openDialog()
      }
  }
}
</script>