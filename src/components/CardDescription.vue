<template>
  <v-card-text
    class="pa-1 markdown"
    v-html="code.innerHTML"
    v-clipboard:copy="code.innerText"
    v-clipboard:success="onCopy"
    v-clipboard:error="onError"></v-card-text>
</template>

<script>

export default ({
  props: ['code'],
  methods: {
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function () {
      alert('Failed to copy texts')
    },
    test: function () {
      alert('REACH')
    }
  },
})
</script>

