<template>
  <v-card width="600" class="ma-2" color="#e9e9e9" elevation="4">
    <v-row justify="center" class="pa-3 pb-0 pt-0">                
      <template v-if="isEditting">
        <v-col cols='10' align-self="center">
          <v-text-field label="Group Name" :rules="rules" hide-details="auto" autofocus @blur="offEditting(group); changeGroupName(group);" v-model="group.name"></v-text-field>
        </v-col>
      </template>
      <template v-else>
        <v-col cols='9' align-self="center" class="pa-0 pt-1 pl-5" @click="onEditting(group)">
          <v-card-text class="text-h6 font-weight-bold pa-0 pt-2">{{ group.name }}</v-card-text>
        </v-col>
        <v-col cols="3" align-self="center" class="pb-0 pt-1">
          <ContainerMenu :group="group"/>
        </v-col>
      </template>
    </v-row>
    
    <v-row justify="center" >
      <!-- <draggable v-model="tasksByGroupName" group="groups" @start="drag=true" @end="drag=false"> -->
          <v-col cols='11' v-for="task in tasksByGroupId" :key="task.id" class="pt-0"> 
          <Card :task="task"/>
        </v-col>
      <!-- </draggable> -->
    </v-row>

    <v-row justify="center">
      <v-col cols="11"><v-btn block color="#d8d8d8" elevation="0" @click="openDialog()">+ new card</v-btn></v-col>
      <div><CreateCardDialog ref="CreateCardDialog" :group_id="group.id"/></div>
    </v-row>

  </v-card>
</template>

<script>
import Card from '@/components/Card.vue'
import ContainerMenu from '@/components/ContainerMenu'
import CreateCardDialog from '@/components/CreateCardDialog'

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
   Card,
   ContainerMenu,
   CreateCardDialog,
  //  draggable
  },
  methods: {
    onEditting (group) {
      this.oldName = group.name
      this.isEditting = !this.isEditting
      // this.$refs.groupName.focus();
      console.log(this.oldName)
    },
    offEditting () {
      this.isEditting = !this.isEditting
    },
    changeGroupName (group) {
      console.log('change Fire')
      this.$store.dispatch('updateGroups', group)
      // group名を変更するtaskを取得
      // const tasks = this.$store.getters.tasksByGroupId(group.id)
      // console.log('tasks', tasks)
      // // task一つずつupdate
      // tasks.forEach(task => {
      //   task.group_id = group.name
      //   console.log('changeGroupName', task)
      //   this.$store.dispatch('updateTasks', task)
      // });
    },
    openDialog () {
      this.$refs.CreateCardDialog.openDialog()
    }
  },
  computed: {
    tasksByGroupId () {
      return this.$store.state.tasks.filter( task => task.group_id === this.group.id)
    }
  }
}
</script>
