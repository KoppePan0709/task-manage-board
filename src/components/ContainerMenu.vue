<template>
  <v-menu
  transition="slide-y-transition"
  bottom
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      ><v-icon color="grey">mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" link >
        <v-list-item-title
          :class='`${item.color}--text`'
          @click="item.func()"
        >{{ item.title }}</v-list-item-title>
      </v-list-item>
      <confirm-dialog ref='ConfirmDialog' :group="group"/>
    </v-list>
  </v-menu>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog'

  export default {
    props: ['group'],
    data() {
      return {
        overlay: false,
        items: [
        { title: 'Edit Group', color: 'green', func: () => { console.log('function can be set here')}}
        ],
      }
    },
    components: {        
        ConfirmDialog
    },
  }
</script>