<template>
  <div class="post">
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.body }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Post',
  computed: {
    ...mapState(['posts'])
  }
}
</script>