<template>
  <v-card
    class="mx-auto overflow-hidden"
    max-width="1200"
  >
    <v-system-bar color="#507386"></v-system-bar>

    <v-app-bar color="#385F73" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Your Task</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-row>
      <v-col><CardContainer/></v-col>
      <v-col><CardContainer/></v-col>
      <v-col><CardContainer/></v-col>
    </v-row>
    
    
  </v-card>
</template>


<script>
import CardContainer from '@/components/CardContainer'
  export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
          {title: 'Foo'},
          {title: 'Bar'},
          {title: 'Fizz'},
          {title: 'Buzz'}
      ]   
    }),
    components: {
        CardContainer
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>