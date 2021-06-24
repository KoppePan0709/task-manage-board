<template>
  <div>
    <v-chip
    v-for="tag in activeTags"
    :key="tag.id"
    :color="tag.color"
    dark
    small
    class="ma-1"
    >{{ tag.name }}</v-chip>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props:['task'],
  data () {
    return {
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
      return tags
      }
      return []
    }
  }
}  
</script>