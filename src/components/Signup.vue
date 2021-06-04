<template>
  <div class="signup">
      <v-card width="400px" class="mx-auto mt-5" dark color="#494949">
      <v-card-title>
        <h3 class="display-1">Sign Up</h3>
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
            <v-btn class="info" @click="signUp">Register</v-btn>
          </v-card-actions>
          <p>Do you have an account? 
            <router-link to="/signin">sign in now!!</router-link>
        </p>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      password: '',
      showPassword : false
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          alert('Create account: ', user.email)
        })
        .catch(error => {
          alert(error.message)
        })
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
  color: #494949;
}
.signup {
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
