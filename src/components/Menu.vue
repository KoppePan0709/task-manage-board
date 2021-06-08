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
    
    <v-list>
      <v-list-item
        v-for="list in lists"
        :key="list.name"
        @click="list.method"
      >
      <v-list-item-title><v-icon>{{ list.icon }}</v-icon> {{ list.name }}</v-list-item-title>
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
                { name: 'setting', icon: 'mdi-cog', method: ''},
                { name: 'account', icon: 'mdi-account', method: ''},
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
