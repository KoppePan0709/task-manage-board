<template>
<v-app>
  <div class="signup">
      <v-card width="700" class="mx-auto mt-5" dark color="#4c758a" rounded="xl">
        <v-container>
          <v-row justify="center" align-content="center">
            <v-col cols="6" align-self="center">
              <v-card-title class="justify-center text-h4">
               Join us
               </v-card-title>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="6">
              <v-card-title class="justify-center text-h4" >
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
            <v-btn  @click="signUp" color="grey">Register</v-btn>
          </v-card-actions>
          <p>Do you have an account? 
            <router-link to="/signin">sign in now!!</router-link>
        </p>
        </v-form>
      </v-card-text>
              
            </v-col>
          </v-row>
        </v-container>
      
    </v-card>
  </div>
  </v-app>
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

<style scoped>

#app {
  background: url('https://picsum.photos/1920/1080?random')
    no-repeat center center fixed !important;
  background-size: cover;
}

</style>