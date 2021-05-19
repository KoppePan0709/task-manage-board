<template>
  <v-col  cols="12">
    <v-card color="#385F73" dark>
      <v-container class="pt-0">
        <v-row no-gutters>
          <v-layout wrap>
          <v-col cols="1" >
            <v-checkbox
              :input-value="task.finished"
              @click.stop
              @change="updateCheckbox"
              class="pt-pb-1"
            ></v-checkbox>
          </v-col>
          <v-col cols="9"><v-card-title class="pt-pb-1">{{ task.title }}</v-card-title></v-col>
          <v-col cols="2" align-self="center"><CardMenu/></v-col>
          </v-layout >
          <v-col cols="12"><v-card-subtitle class="pa-2 markdown" v-html="description" ></v-card-subtitle></v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import CardMenu from '@/components/CardMenu'
// import marked from 'marked'

export default ({
  props: {
    task: Object
  },
  components: {
    CardMenu,
    // marked
  },
  methods: {
    updateCheckbox () {
      this.$emit('updateCheckbox', this.task)
    }
  },
  computed: {
    description: function() {
      // return marked(this.task.description)
      return 'description'
    }
  }
})
</script>