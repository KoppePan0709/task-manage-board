<template>
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
</template>

<script>
// import Cardv2 from '@/components/Cardv2'
// import Dialog from '@/components/Dialog'
// import draggable from 'vuedraggable'
import { mapState } from 'vuex'

import CardContainer from '@/components/CardContainer'
import AddGroupDialog from '@/components/addGroupDialog.vue'


export default {
  data () {
    return {
      showDialog: false,
      // isEditting: false
    }
  },
  created () {
    console.log('topPage Rendering')
    this.$store.dispatch('initGroups', this.$store.state.user_id)
    this.$store.dispatch('initTasks', this.$store.state.user_id)
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