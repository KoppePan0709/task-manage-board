<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      
      <v-card color="#e9e9e9" >
        
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="pa-10"
        >
      
          <v-layout column >    
            
            <v-card-title class="pa-0">
              <v-icon class="pr-3">
                mdi-subtitles-outline
              </v-icon>
              Title
            </v-card-title>
          
            <v-text-field
              color="grey"
              :rules="rules"
              v-model="task.title"
              dense
              required
              outlined
            ></v-text-field>

            <v-card-title class="pa-0 ma-0 mb-1">
              <v-icon class="pr-3">
                mdi-tag-outline
              </v-icon>Tags
            </v-card-title>
            
            <div>
            
              <tagAddButton :task="{tags:[]}" @input="tagSelect($event)"/>

            </div>

            <v-card-title class="pa-0">

              <v-icon class="pr-3">
                mdi-language-markdown
              </v-icon>
              Description
            </v-card-title>
            
            <v-textarea
              name="input-7-1"
              color="grey"
              v-model="task.description"
              rows="15"
              outlined
            ></v-textarea>

            <v-btn
              :disabled="!valid"           
              @click="validate"
              outlined
            >
            <v-icon>
                mdi-plus
              </v-icon>
              CREATE
            </v-btn>

          </v-layout>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script scoped>
import tagAddButton from '@/components/tagAddButton'

export default {
  props: ['group_id'],
  data () {
    return {
        dialog: false,
        valid: true,
        task: { title: '', description: ''},
        tags: [],
        rules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 33) || 'Name must be less than 33 characters',
        ],
    }
  },
  components: {
    tagAddButton
  },
  methods: {
    openDialog () {
      this.dialog = !this.dialog
    },
    validate () {
      if(this.$refs.form.validate() === true){
        this.dialog = !this.dialog 
        const task = {
        id: getUniqueID(),
        user_id: this.$store.state.user_id,
        group_id: this.group_id,
        title: this.task.title,
        description: this.task.description,
        color: "#4c758a",
        tags: this.tags
      }
      this.$store.dispatch('createTasks', task)

      this.$refs.form.reset()
      
      }else {
        console.log(this.$refs.form.validate())
      }
    },
    tagSelect (event) {
      this.tags = event
      console.log('event', event)
    }
  },
  // computed: {
  //   selectedTags () {
  //     state.tasks.filter( task => task.group_id === group_id)
  //   }
  // }
}

function getUniqueID(myStrong){
  /* ToDoのIDを作成 */
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

</script>
