<template>
  <v-container fluid>
        <v-textarea
          name="input-7-1"
          label="Description"
          :value="description"
        ></v-textarea>
  </v-container>
</template>

<script>
  export default {
    props: {
      taskDesc: String
    },
    computed: {
      description: {
        get () {
          return this.taskDesc
        },
        set (newDesc) {
          this.$emit('input', newDesc)
        }
      }
    }
  }
</script>