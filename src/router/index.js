import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import TopPage from '@/components/TopPage'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import firebase from 'firebase'
import store from '@/store'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/',
      name: 'TopPage',
      component: TopPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

router.beforeEach( function (to, from, next) {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // ログイン状態時、uidをstateに保存
        store.commit('signInUser', user.uid)
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router