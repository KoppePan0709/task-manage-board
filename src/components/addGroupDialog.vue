<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"     
  >
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="groupName"
              :counter="10"
              :rules="nameRules"
              label="New Group Name"
              required
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col cols="12">
          <v-btn
          :disabled="!valid"
          color="#4c758a"
          dark
          class="mr-4"
          @click="validate"
          >
          Create
          </v-btn>
        </v-col>
      </v-row>
      </v-container>
    </v-card>
  </v-dialog> 
</template>

<script>
  export default {
    data (){
      return {
        dialog: false,
        valid: true,
        groupName: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        ]
      }
      
    },
    methods: {
      validate () {
        if(this.$refs.form.validate() === true){
          this.dialog = !this.dialog 
          const group = {
            id: getUniqueID(),
            user_id: this.$store.state.user_id,
            name: this.groupName,
            active: true
          }
          this.$store.dispatch('createGroups', group)
        }else {
          console.log(this.$refs.form.validate())
        }
      },
      openDialog () {
        this.dialog = !this.dialog
      }
    },
  }

  function getUniqueID(myStrong){
  /* ToDoのIDを作成 */
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}
</script>
