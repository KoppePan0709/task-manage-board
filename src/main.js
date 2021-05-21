import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueClipboard from 'vue-clipboard2'
import VueHighlightJS from 'vue-highlightjs'
 
Vue.use(VueClipboard)
Vue.use(VueHighlightJS)

Vue.config.productionTip = false

const todos = [
  {id: 0, title: '夕ご飯の買い物', description: 'じゃがいも　にんじん　たまねぎ'},
  {id: 1, title: '病院に行く', description: '薬受け取り'},
  {id: 2, title: '宿題をやる', description: '数学　英語'}
]

const storage = sessionStorage

for (const todo of todos){
  storage[todo.id] = JSON.stringify({
    id: todo.id,
    title: todo.title,
    description: todo.description
  })
}

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
