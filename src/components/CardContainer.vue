<template>
  <v-card width="400" class="ma-2">
    <v-row justify="center" >                
      <template v-if="isEditting">
        <v-col cols='11' align-self="center">
          <v-text-field label="Group Name" :rules="rules" hide-details="auto" autofocus @blur="offEditting(group); changeGroupName(group);" v-model="group.name"></v-text-field>
      </v-col>
      </template>
      <template v-else>
        <v-col cols='11' align-self="center" class="pa-0 pl-5" @click="onEditting(group)">
          <v-card-title class="text-h6 pa-0 pt-2">{{ group.name }}</v-card-title>
        </v-col>
      </template>
    </v-row>
    
    <v-row justify="center" >
        <v-col cols='11' v-for="task in tasksByGroupName(group.name)" :key="task.id">
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
      oldName: '',
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
    onEditting (group) {
      this.oldName = group.name
      this.isEditting = !this.isEditting
      this.$refs.groupName.focus();
      console.log(this.oldName)
    },
    offEditting () {
      this.isEditting = !this.isEditting
    },
    changeGroupName (group) {
      console.log('change Fire')
      this.$store.dispatch('updateGroups', group)
      // group名を変更するtaskを取得
      const tasks = this.$store.getters.tasksByGroupName(this.oldName)
      console.log('tasks', tasks)
      // task一つずつupdate
      tasks.forEach(task => {
        task.group_id = group.name
        console.log('changeGroupName', task)
        this.$store.dispatch('updateTasks', task)
      });
    },
    openDialog () {
      console.log('Fire')
      console.log(this.$refs.isShow)
      this.$refs.isShow.isShow()
    }
  },
  computed: mapGetters([
    'tasksByGroupName'
  ])
}
</script>