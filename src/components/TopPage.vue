<template>
  <v-app id="inspire">

    <v-app-bar
      app
      shrink-on-scroll
      dense
      src="https://picsum.photos/id/384/1920/1080"
      dark
      height="50px"
      >
    
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title >Markdown Note</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <Menu/>
    </v-app-bar>
    

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
    <Navigation/>
    </v-navigation-drawer>

    <v-content class="pt-20">
      
      <v-container fluid class="pt-3 pb-0" >
        <v-row dense>    
          <v-col
            cols="2"
            v-for='group in activeGroups'
            :key='group.id'
            class="mt-3"
          >
            <CardContainer :group="group"/>
          </v-col>
                    
        </v-row>
      </v-container>

    </v-content>
    
    
    <v-footer
      app
      color="white"
      height="50px"
    >
      <v-btn
        color="#4c758a"
        absolute
        large
        top
        right
        fab
        dark
        elevation="3"
        @click="openDialog()"
      >
      <v-icon>mdi-plus</v-icon>
      </v-btn>
      <addGroupDialog ref="openDialog"/>
    </v-footer>
    
    </v-app>

</template>

<script>
import { mapState } from 'vuex'
import CardContainer from '@/components/CardContainer'
import AddGroupDialog from '@/components/addGroupDialog.vue'
import Navigation from '@/components/Navigation'
import Menu from '@/components/Menu'

export default {
  data () {
    return {
      drawer: false,
      showDialog: false,
      lists: [
        { name: 'setting', icon: 'mdi-cog'},
        { name: 'account', icon: 'mdi-account'},
        { name: 'SignOut', icon: 'mdi-logout'}
      ]
    }
  },
  created () {
    console.log('topPage Rendering')
    this.$store.dispatch('initGroups', this.$store.state.user_id)
    this.$store.dispatch('initTasks', this.$store.state.user_id)
  },
  components: {
    CardContainer,
    AddGroupDialog,
    Navigation,
    Menu
  },
  computed: {
    ...mapState([
      'groups',
      'tasks'
    ]),
    activeGroups() {
      console.log('TopPage.computed.activeGroups', this.$store.state.groups.filter( group => group.active === true))
      return this.$store.state.groups.filter( group => group.active === true)
    }
  },
  methods: {
    openDialog () {
      this.$refs.openDialog.openDialog()
    },
  }
}
</script>
