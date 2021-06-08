import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import store from './store';
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueClipboard from 'vue-clipboard2'

// import VueHighlightJS from 'vue-highlightjs'
// import hljs from 'highlightjs'

Vue.use(VueClipboard)
Vue.config.productionTip = false
// Vue.use(VueHighlightJS)
// Vue.use(hljs);

/* Firebase Config */
const firebaseConfig = {
    apiKey: "AIzaSyB32F_V8KeQTCOPboeLzF2ClXSWGPr4ldE",
    authDomain: "task-manage-board.firebaseapp.com",
    projectId: "task-manage-board",
    storageBucket: "task-manage-board.appspot.com",
    messagingSenderId: "350137294218",
    appId: "1:350137294218:web:35c9fca222e8263fd87c73",
    measurementId: "G-L994Y2XVZ9"
  };

/* Initialize Firebase */
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  store,
  render: h => h(App),
  router,
}).$mount('#app')
