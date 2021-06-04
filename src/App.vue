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
    <v-main class="pa-0">
      <router-view/>
    </v-main>
    
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


