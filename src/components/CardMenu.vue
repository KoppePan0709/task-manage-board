<template>
  <v-menu
  transition="slide-y-transition"
  bottom
  >
  <template v-slot:activator="{ on, attrs }">
    <v-btn dark icon v-bind="attrs" v-on="on"><v-icon>mdi-dots-vertical</v-icon></v-btn>
    </template>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" link >
          <v-list-item-title :class='`${item.color}--text`' @click="item.func(task)">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-overlay
          :absolute="absolute"
          :value="overlay"
        >
          <v-btn
            color="success"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>
    </v-menu>
</template>

<script>
  export default {
    props: ['task'],
    data() {
      return {
        overlay: false,
        items: [
        { title: 'Edit Tag', color: 'black', func: () => {this.overlay = true}},
        { title: 'Delete', color: 'red', func: (task) => {this.$store.dispatch('deleteTasks', task)}}
        ],
      }
    }
  }
</script>