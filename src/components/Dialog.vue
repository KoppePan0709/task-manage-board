<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
        <v-card class="pa-4" >
            <v-container>
                <v-row>
                    <v-col cols="12" align="center"><v-text-field v-model="task.title" label="task title" required></v-text-field></v-col>
                    <v-col cols="12" align="center"><v-textarea name="input-7-1" label="Description"  v-model="task.description" rows="20"></v-textarea></v-col>
                    <v-col cols="12" align="center">
                        <v-btn elevation="2" rounded color="#385F73" dark v-on:click="save">Save</v-btn>
                    </v-col>
                </v-row>
            </v-container> 
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script scoped>
  export default {
    data () {
        return {
            dialog: false,
            isNew: false,
            task: {
                id: '',
                title: '',
                description: '',
                finished: '',
                group: ''
            },
            isable_to_save: false
        }
    },
    methods: {
        isShow (task) {
            if (typeof task == 'object') {
                this.isNew = false
                this.dialog = !this.dialog
                this.task.id = task.id
                this.task.title = task.title
                this.task.description = task.description
                this.task.group = task.group
            }else{
                this.isNew = true
                this.dialog = !this.dialog
                this.task.id = ''
                this.task.title = ''
                this.task.description = ''
                this.task.group = task
            }
        },
        save () {            
            this.dialog = !this.dialog
            this.$emit('save', this.task, this.isNew)
        }
    }
  }
</script>