<template>
  <v-card width="400" class="ma-2">
    <v-row justify="center" >                
      <template v-if="isEditting">
        <v-col cols='11' align-self="center">
          <v-text-field label="Main input" :rules="rules" hide-details="auto" @blur="switchEdit(); changeGroupName(group.name);" v-model="group.name"></v-text-field>
      </v-col>
      </template>
      <template v-else>
        <v-col cols='11' align-self="center" class="pa-0 pl-5" @click="switchEdit()">
          <v-card-title class="text-h6 pa-0 pt-2">{{ group.name }}</v-card-title>
        </v-col>
      </template>
    </v-row>
    
    <v-row justify="center" >
        <v-col cols='11' v-for="task in groupTasks(group.name)" :key="task.id">
          <Cardv2 :task="task"/>
        </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="11"><v-btn block color="#d8d8d8" elevation="0" @click="openDialog()">+ new card</v-btn></v-col>
      <div><Dialog ref="isShow" :group_name="group.name" :task="{}" :isNew="true"/></div>
    </v-row>

  </v-card>
</template>

<script>
import Dialog from '@/components/Dialog'
import Cardv2 from './Cardv2.vue'
import { mapGetters } from 'vuex'

export default {
  props:['group'],
  data () {
    return {
      isEditting: false,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }
  },
  components: {
   Cardv2,
   Dialog
  },
  methods: {
    switchEdit () {
      console.log('EDIT Fire')
      this.isEditting = !this.isEditting
      console.log(this.isEditting)
    },
    // changeGroupName (group_name) {
    //   console.log('change Fire')
    //   const tasks = this.$store.getters.groupTasks(group_name)
    //   console.log(this.$store.state.groups)
    // },
    // openDialog (id) {
    //   console.log('Fire')
    //   console.log(this.$refs.isShow)
    //   this.$refs.isShow[id].isShow()
    //   },
    openDialog () {
      console.log('Fire')
      console.log(this.$refs.isShow)
      this.$refs.isShow.isShow()
    }
  },
  computed: mapGetters([
    'groupTasks'
  ])
}
</script>