import Vue from 'vue'
import Vuex from 'vuex'
import api from  './api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groups: [],
    tasks: {}
  },
  mutations: {
    initGroups (state, element) {
      console.log('intiGroups')
      const index = state.groups.length
      Vue.set(state.groups, index, element)
      Vue.set(state.tasks,element.name,[])
    },
    initTasks (state, element) {
      console.log(state.tasks[element.group_id])
      const index = state.tasks[element.group_id].length
      Vue.set(state.tasks[element.group_id], index, element)
      Vue.nextTick
    },
    updateTasks (state, task) {
      console.log(task)
      Vue.set(state.tasks[task.group],task.id, task)
    },
    createTasks (state,task) {
      console.log(task)
      const id = state.tasks[task.group].length
      task.id = id
      Vue.set(state.tasks[task.group],id, task)  
      console.log(state.tasks[task.group][id])
    }
  },
  actions: {
    initGroups ( { commit }, user_id){
      api.getAllGroups(user_id).then(elements => {
        elements.forEach(element => {
          commit('initGroups', element)  
          console.log(element)
        });
      })
      .catch(err => console.log(err))
    },
    initTasks ( { commit }, user_id){
      api.getAllTasks(user_id).then(elements => {
        elements.forEach(element => {
          commit('initTasks', element)  
          console.log(element)
        });
      })
      .catch(err => console.log(err))
    },
    createTasks ( { commit }, task ){
      api.createTasks(task).then(results => {
        console.log(results)
      }).catch(err => console.log(err))
      commit('createTasks', task)
    }
  }
});

