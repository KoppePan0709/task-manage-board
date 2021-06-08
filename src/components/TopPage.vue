<template>
  <v-app id="inspire">

    <v-app-bar app shrink-on-scroll dense>
    
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="signOut"
      >
      <v-icon>mdi-logout</v-icon></v-btn>
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
      
      <v-container fluid class="pt-3 pb-0">
      
        <v-row dense>
          
          <v-col
            cols='3'
            v-for='group in activeGroups'
            :key='group.id'
            class="mt-3"
          >
            <CardContainer :group="group"/>
          </v-col>
                    
        </v-row>
      </v-container>

      <v-btn
        color="#4c758a"
        absolute
        bottom
        right
        fab
        dark
        elevation="3"
        @click="openDialog()"
      >
      <v-icon>mdi-plus</v-icon>
      </v-btn>
      <addGroupDialog ref="openDialog"/>

    </v-content>
    
    <v-footer>
      This is footer
    </v-footer>
    
    </v-app>

</template>

<script>
import { mapState } from 'vuex'
import CardContainer from '@/components/CardContainer'
import AddGroupDialog from '@/components/addGroupDialog.vue'
import Navigation from '@/components/Navigation'
import firebase from 'firebase'


export default {
  data () {
    return {
      drawer: false,
      showDialog: false,
      // isEditting: false
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
    Navigation
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
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>