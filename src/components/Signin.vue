<template>
<v-app>
  <div class="signin" >
     <v-card width="700px" class="mx-auto mt-5" rounded="xl">
       <v-container>
         <v-row justify="center" align-content="center">
           <v-col cols="6">
             <v-card-title class="justify-center text-h4 cyan--text text--darken-4" >
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
                    <v-btn  @click="signIn" color="#4c758a" dark>Sign in</v-btn>
                  </v-card-actions>
                  <p>You don't have an account? 
                    <router-link to="/signup">create account now!!</router-link>
                  </p>
                </v-form>
              </v-card-text>
           </v-col>
           <v-divider vertical></v-divider>
           <v-col cols="6" align-self="center">
             <v-card-title class="justify-center text-h4 cyan--text text--darken-4">
               Hello My Friend
               </v-card-title>
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

#app {
  background: url('https://picsum.photos/1920/1080?random')
    no-repeat center center fixed !important;
  background-size: cover;
}

</style>