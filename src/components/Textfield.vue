<template>
  <v-form v-model="valid">
    <v-container>
          <v-text-field
            v-model="title"
            :rules="nameRules"
            :counter="20"
            label="task title"
            required
          ></v-text-field>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    props: {
      taskTitle: String
    },
    data: () => ({
      valid: false,
      nameRules: [
        v => !!v || 'Title is required',
        v => v.length <= 20 || 'Title must be less than 20 characters',
      ]
    }),
    // watch: {
    //   title: function () {
    //     this.$emit('updateTitle', this.title)
    //   }
    // }
    computed: {
      title: {
        get () {
          console.log('textffiled', this.taskTitle)
          return this.taskTitle
        },
        set (newTitle) {
          this.$emit('input', newTitle)
        }
      }
    }
  }
</script>