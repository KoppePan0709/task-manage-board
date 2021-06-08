<template>
<v-app>
  <div class="signin" >
     <v-card width="400px" class="mx-auto mt-5">
      <v-card-title class="justify-center text-h4">
        Sign In
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="mdi-account-circle" label="Username" v-model="username"/>
          <v-text-field 
            v-bind:type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            prepend-icon="mdi-lock" 
            append-icon="mdi-eye-off" 
            label="パスワード" 
            v-model="password"/> 
          <v-card-actions>
            <v-btn class="info" @click="signIn" color="green">Sign in</v-btn>
          </v-card-actions>
          <p>You don't have an account? 
            <router-link to="/signup">create account now!!</router-link>
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: '',
      showPassword : false,
      authMethods: [
        { text: 'email', icon: 'mdi-email', disabled: false ,color: "primary"},
        { text: 'GitHub', icon: 'mdi-github', disabled: true,  color: "black"},
        { text: 'Google', icon: 'mdi-google', disabled: true, color: "red"},
      ],
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        userCredential => {
          const uid = userCredential.user.uid
          console.log(uid)
          this.$store.commit('signInUser', uid)
          console.log('UID', this.$store.state.user_id)
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>