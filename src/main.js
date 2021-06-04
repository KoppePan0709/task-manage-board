import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueClipboard from 'vue-clipboard2'
import firebase from 'firebase'

// import VueHighlightJS from 'vue-highlightjs'
// import hljs from 'highlightjs'
import store from './store';

import router from './router'

Vue.use(VueClipboard)
// Vue.use(VueHighlightJS)
// Vue.use(hljs);
Vue.config.productionTip = false


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-analytics.js"></script>

// {/* <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional */}
const firebaseConfig = {
    apiKey: "AIzaSyB32F_V8KeQTCOPboeLzF2ClXSWGPr4ldE",
    authDomain: "task-manage-board.firebaseapp.com",
    projectId: "task-manage-board",
    storageBucket: "task-manage-board.appspot.com",
    messagingSenderId: "350137294218",
    appId: "1:350137294218:web:35c9fca222e8263fd87c73",
    measurementId: "G-L994Y2XVZ9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>


new Vue({
  vuetify,
  store,
  render: h => h(App),
  router,
  // created () {
  //   console.log('created: ', this.$store.state.user_id)
  //   this.$store.dispatch('initGroups', this.$store.state.user_id)
  //   this.$store.dispatch('initTasks', this.$store.state.user_id)
  // }
}).$mount('#app')
