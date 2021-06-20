<template>
<div>
    <!-- Button to open Dialog -->
  <v-btn
    block
    elevation="0"
    @click="openDialog"
    @keydown.stop=""
  >
    <v-icon color="grey">
      mdi-plus-circle-outline
    </v-icon>
  </v-btn>

  <!-- Dialog -->
  <v-dialog
    v-model="dialog"
    max-width="600px"
    eager
    @keydown.stop="keydown"
    @input="v => v || closeDialog()"
  >

    <!-- dialog contents -->
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
                :counter="33"
                :rules="nameRules"
                label="New Group Name"
                required
                color="green"
              ></v-text-field>
            
            </v-form>
          
          </v-col>
          
          <v-col cols="12">
          
            <v-btn
            :disabled="!valid"
            color="#4c758a"
            class="mr-4 white--text"
            @click="validate"
            >
            Create
            </v-btn>

          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog> 
</div>
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
          v => (v && v.length <= 33) || 'Name must be less than 33 characters',
        ]
      }
      
    },
    methods: {
      validate () {
        if(this.$refs.form.validate() === true){
          
          this.dialog = !this.dialog 
          console.log('dialog',this.dialog)
          const group = {
            id: getUniqueID(),
            user_id: this.$store.state.user_id,
            name: this.groupName,
            active: true
          }
          this.$store.dispatch('createGroups', group)
          this.$refs.form.reset()
          
        }else {
          console.log(this.$refs.form.validate())
        }
      },
      openDialog () {
        this.dialog = !this.dialog

      },
      closeDialog () {
        this.$refs.form.reset()
      },
      keydown (e) {
        if (e.keyCode === 13) {
          this.validate()
        }else{
          console.log('else', e)
        }
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
