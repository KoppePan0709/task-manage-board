<template>
  <div>
    <v-chip
    v-for="tag in activeTags"
    :key="tag.id"
    :color="tag.color"
    dark
    close
    class="ma-1"
    @click:close="removeTags(tag)"
    >{{ tag.name }}</v-chip>
  
    <div class="d-inline">
      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
    
        <template v-slot:activator="{ on, attrs }">

          <v-icon
          v-bind="attrs"
          v-on="on"
          class="ml-2"
          >mdi-plus</v-icon>

        </template>

        <v-card v-if="!editting" width="300">

          <v-toolbar flat dense color="#e9e9e9" class="text-h6"></v-toolbar>

          <v-card-text>
            <!-- <v-chip-group column> -->
            <v-chip
            v-for="tag in tags" :key="tag.id"
            :color="tag.color"          
            label
            dark
            close
            @click:close="deleteTags(tag)"
            @click="activate(tag)"
            class="ma-1"
            >{{ tag.name }}</v-chip>
            <!-- </v-chip-group> -->
            
            <v-btn
            @click="editting = !editting"
            color="#e9e9e9"
            elevation="0"
            block
            small
            right
            >
              <v-icon small>
                mdi-plus
              </v-icon>
              add new tag
            </v-btn>
          </v-card-text>
      </v-card>

      <v-card v-else width="300">
        <v-toolbar flat dense color="#e9e9e9" class="text-h6">
          <v-btn icon @click=" editting = !editting"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <!-- <v-toolbar-title>New Tag</v-toolbar-title> -->
        </v-toolbar>

        <v-card-actions>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
           >
          <v-layout column >
          
          <v-text-field
            label="tag name"
              color="grey"
              class="ma-0 pa-0"
              :rules="rules"
              v-model="tagName"
              dense
              required
              outlined
             ></v-text-field>

             <v-color-picker
              dot-size="13"
              
              hide-canvas
              hide-inputs
              hide-sliders
              show-swatches
              swatches-max-height="300"
              :swatches="swatches"
              v-model="color"
              width="360"
          ></v-color-picker>

          <v-btn small right @click="addNewTag()" elevation="0" block color="#e9e9e9"><v-icon small>mdi-plus</v-icon>add new tag</v-btn>
            </v-layout>
          </v-form>


        </v-card-actions>
        
          
            
      </v-card>
      
    </v-menu>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props:['task'],
  data () {
    return {
      editting: false,
      valid: true,
      color: "",
      tagName: "",
      rules: [
          v => !!v || 'Name is required',
        ],
      swatches: [
        ['#E53935','#D81B60','#8E24AA'],
        ['#5E35B1','#3949AB','#1E88E5'],
        ['#039BE5','#00ACC1','#00897B'],
        ['#43A047','#7CB342','#C0CA33'],
        ['#FDD835','#FFB300','#FB8C00']
      ],
      tagIDs: this.task.tags
    }
  },
  computed: {
    ...mapState([
      'tags',
    ]),
    activeTags () {
      const tags = []
      if (this.tagIDs.length > 0){
        this.tagIDs.forEach( id => {
        const activeTag = this.$store.state.tags.filter( tag => tag.id === id)
        tags.push(activeTag[0])
      })
      console.log('HHHHH',tags)
      return tags
      }
      return []
    }
  },
  methods: {
    activate (tag) {
      const index = this.tagIDs.indexOf(tag.id)
      if (index === -1){
        this.tagIDs.push(tag.id)
      }else{
        this.tagIDs.splice(index, 1)
      }
      this.$emit('input', this.tagIDs)
    },
    validate () {
      if(this.$refs.form.validate() === true){
        console.log('validate')
      }else {
        console.log(this.$refs.form.validate())
      }
    },
    addNewTag () {
      if (this.$refs.form.validate() === true) {
        this.dialog = !this.dialog 
        const tag = {
          id: getUniqueID(),
          user_id: this.$store.state.user_id,
          name: this.tagName,
          color: this.color
        }
        
        console.log(tag)
        this.$store.dispatch('createTags', tag)
        this.$refs.form.reset()
        this.color = ""
      }else {
        console.log('input is invalid')
      }
    },
    deleteTags (tag) {
      console.log('DELETE', tag)
      const index = this.tagIDs.indexOf(tag.id)
      this.tagIDs.splice(index, 1)
      this.$store.dispatch('deleteTags', tag)
    },
    removeTags (tag) {
      const index = this.tagIDs.indexOf(tag.id)
      this.tagIDs.splice(index, 1)
    }
  }
}

function getUniqueID(myStrong){
  /* ToDoのIDを作成 */
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}
</script>