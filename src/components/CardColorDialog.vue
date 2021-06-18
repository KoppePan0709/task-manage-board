<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
    @input="v => v || close()"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" @click.stop="">mdi-palette</v-icon>
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
        :swatches="swatches"
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
        swatches: [
        // ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722'],
        // ['#EF9A9A','#F48FB1','#CE93D8','#B39DDB','#9FA8DA','#90CAF9','#81D4FA','#80DEEA','#80CBC4','#A5D6A7','#C5E1A5','#E6EE9C','#FFF59D','#FFE082','#FFCC80','#FFAB91'],
        ['#E57373','#F06292','#BA68C8','#9575CD','#7986CB','#64B5F6','#4FC3F7','#4DD0E1','#4DB6AC','#81C784','#AED581','#DCE775','#FFF176','#FFD54F','#FFB74D','#FF8A65'],
        ['#EF5350','#EC407A','#AB47BC','#7E57C2','#5C6BC0','#42A5F5','#29B6F6','#26C6DA','#26A69A','#66BB6A','#9CCC65','#D4E157','#FFEE58','#FFCA28','#FFA726','#FF7043'],
        ['#E53935','#D81B60','#8E24AA','#5E35B1','#3949AB','#1E88E5','#039BE5','#00ACC1','#00897B','#43A047','#7CB342','#C0CA33','#FDD835','#FFB300','#FB8C00','#F4511E'],
        ['#D32F2F','#C2185B','#7B1FA2','#512DA8','#303F9F','#1976D2','#0288D1','#0097A7','#00796B','#388E3C','#689F38','#AFB42B','#FBC02D','#FFA000','#F57C00','#E64A19'],
        ['#C62828','#AD1457','#6A1B9A','#4527A0','#283593','#1565C0','#0277BD','#00838F','#00695C','#2E7D32','#558B2F','#9E9D24','#F9A825','#FF8F00','#EF6C00','#D84315'],
        ['#B71C1C','#880E4F','#4A148C','#311B92','#1A237E','#0D47A1','#01579B','#006064','#004D40','#1B5E20','#33691E','#827717','#F57F17','#FF6F00','#E65100','#BF360C'],
        // ['#FF8A80','#FF80AB','#EA80FC','#B388FF','#8C9EFF','#82B1FF','#80D8FF','#84FFFF','#A7FFEB','#B9F6CA','#CCFF90','#F4FF81','#FFFF8D','#FFE57F','#FFD180','#FF9E80'],
        ['#FF5252','#FF4081','#E040FB','#7C4DFF','#536DFE','#448AFF','#40C4FF','#18FFFF','#64FFDA','#69F0AE','#B2FF59','#EEFF41','#FFFF00','#FFD740','#FFAB40','#FF6E40'],
        ['#FF1744','#F50057','#D500F9','#651FFF','#3D5AFE','#2979FF','#00B0FF','#00E5FF','#1DE9B6','#00E676','#76FF03','#C6FF00','#FFEA00','#FFC400','#FF9100','#FF3D00'],
        ['#D50000','#C51162','#AA00FF','#6200EA','#304FFE','#2962FF','#0091EA','#00B8D4','#00BFA5','#00C853','#64DD17','#AEEA00','#FFD600','#FFAB00','#FF6D00','#DD2C00'],
        ['#795548','#607D8B','#9E9E9E','#8D6E63','#455A64','#616161','#4E342E'],
        // ['#EFEBE9','#B0BEC5','#EEEEEE'],
        // ['#D7CCC8','#90A4AE','#E0E0E0'],
        ['#BCAAA4','#78909C','#BDBDBD','#6D4C41','#37474F','#424242','#3E2723'],
        ['#A1887F','#546E7A','#757575','#5D4037','#263238','#212121'],        
      ],
      }
    },
    methods: {
      changeColor() {
        console.log('change Fire')
        this.dialog = !this.dialog
        this.$store.dispatch('updateTasks', this.task)
      },
      close () {
      this.$store.dispatch('updateTasks', this.task)
    }
    }
  }
</script>