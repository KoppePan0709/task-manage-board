<template>
  <div id="app">
    <v-app id="inspire">
    <v-app-bar
      app
      shrink-on-scroll
      dense
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="signOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content class="pt-20">
      <router-view/>
    </v-content>
    <v-footer>
      This is footer
    </v-footer>
    
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>


