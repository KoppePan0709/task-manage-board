<template>
<v-chip-group column>
    <v-chip
    v-for="tag in activeTags"
    :key="tag.id"
    :color="tag.color"
    dark
    x-small
    class="mt-0 mb-1 pt-0 pb-0"
    >{{ tag.name }}</v-chip>
    </v-chip-group>
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