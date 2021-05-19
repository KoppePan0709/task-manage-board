<template>
  <v-col  cols="12">
    <v-card color="#385F73" dark>
      <v-container>
        <v-row dense>
          <!-- <v-col cols="10" align-self="center"><v-layout><v-checkbox></v-checkbox><v-card-title >{{ task.title }}</v-card-title></v-layout></v-col> -->
          <v-col cols="10" align-self="center"><v-layout><v-checkbox></v-checkbox><CardTitle :task="task"/></v-layout></v-col>
          <v-col cols="2" align-self="center"><CardMenu/></v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12"><v-card-subtitle>{{ taskDesc }}</v-card-subtitle></v-col>
        </v-row>
        
      </v-container>
      
    </v-card>
  </v-col>
</template>

<script>
import CardTitle from '@/components/CardTitle'
import CardMenu from '@/components/CardMenu'

export default ({
  props: {
    task: Object
  },
  components: {
    CardTitle,
    CardMenu
  },
  computed: {
    taskDesc: {
      get () {
        return this.task.description
      },
      set (newDesc) {
        this.task.description = newDesc
      }
    }
  }
})
</script>