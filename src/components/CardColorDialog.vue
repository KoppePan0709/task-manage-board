<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        
        <v-list-item-title
        class='green--text'
      ><v-icon dense small color="green" class="pr-2">mdi-palette</v-icon>Edit Color</v-list-item-title>
      </v-list-item>
    </template>

    <v-card
      class="pa-2"
      color="#e9e9e9"
    >
    <v-card-title>Select Card Color</v-card-title>
    <v-card-actions>
      <v-color-picker
        dot-size="13"
        hide-canvas
        hide-inputs
        hide-sliders
        show-swatches
        swatches-max-height="300"
        v-model="task.color"
        width="360"
      ></v-color-picker>
    </v-card-actions>
    
    <v-card-actions>
      <v-btn
        @click="changeColor"
        color="green"
        dark
      >Apply</v-btn>
    </v-card-actions>

      
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props:['task'],
    data () {
      return {
        dialog: false,
      //   swatches: [
      //   ['#EF5350', '#D81B60', '#7E57C2'],
      //   ['#5C6BC0', '#64B5F6', '#00838F'],
      //   ['#4DB6AC', '#00AA00', '#005500'],
      //   ['#00FFFF', '#00AAAA', '#005555'],
      //   ['#0000FF', '#0000AA', '#000055'],
      // ],
      }
    },
    methods: {
      changeColor() {
        console.log('change Fire')
        this.dialog = !this.dialog
        this.$store.dispatch('updateTasks', this.task)
      }
    }
  }
</script>