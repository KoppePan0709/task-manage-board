<template>
  <v-menu
  transition="slide-y-transition"
  bottom
  close-on-content-click
  close-on-click
  >
  <template v-slot:activator="{ on, attrs }">
    <v-btn
      dark
      icon
      v-bind="attrs"
      v-on="on"
      ><v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    </template>
    <v-card width="140">
    <v-list>
        <CardColorDialog :task="task"/>
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-title
            :class='`${item.color}--text`'
            @click="item.func(task)"
          ><v-icon dense small :color="item.color" v-text="item.icon" class="pr-2"></v-icon>{{ item.title }}</v-list-item-title>
        </v-list-item>

      </v-list>
      </v-card>
    </v-menu>
</template>

<script>
  import CardColorDialog from '@/components/CardColorDialog'

  export default {
    props: ['task'],
    data() {
      return {      
        items: [       
        { title: 'Delete', color: 'red', icon: "mdi-delete",func: (task) => {this.$store.dispatch('deleteTasks', task)}},
        ],
      }
    },
    components: {
      CardColorDialog
    }
  }
</script>