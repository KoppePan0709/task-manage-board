<template>
  <v-menu
  left
  bottom
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
      icon
      v-bind="attrs"
      v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    
    <v-list width="200" dense>
      <v-list-item
        v-for="list in lists"
        :key="list.name"
        @click="list.method"
      >
      <v-list-item-icon><v-icon>{{ list.icon }}</v-icon></v-list-item-icon>
      <v-list-item-title>{{ list.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import firebase from 'firebase'

export default {
    
    data() {
        return {
            lists: [
                { name: 'Setting', icon: 'mdi-cog', method: ''},
                { name: 'Account', icon: 'mdi-account', method: ''},
                { name: 'SignOut', icon: 'mdi-logout', method: this.signOut}
            ]
        }
    },
    methods: {
        signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
}
    
}
</script>
