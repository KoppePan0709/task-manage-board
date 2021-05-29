import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueClipboard from 'vue-clipboard2'
// import VueHighlightJS from 'vue-highlightjs'
// import hljs from 'highlightjs'
import store from './store';
 
Vue.use(VueClipboard)
// Vue.use(VueHighlightJS)
// Vue.use(hljs);
Vue.config.productionTip = false


new Vue({
  vuetify,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('initGroups', 'userId_001')
    this.$store.dispatch('initTasks', 'userId_001')
  },
}).$mount('#app')
