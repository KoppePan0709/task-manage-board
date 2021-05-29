import Vue from 'vue'
import Vuex from 'vuex'
import api from  './api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: 'userId_001',
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
    createTasks (state,task) {
      console.log('createTask',task)
      Vue.set(state.tasks[task.group_id],task.id, task)  
      console.log(state.tasks[task.group_id][task.id])
    },
    updateTasks (state,task) {
      console.log('updateTask',task)
      Vue.set(state.tasks[task.group_id],task.id, task)  
      console.log(state.tasks[task.group_id][task.id])
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
    },
    updateTasks ( { commit }, task ){
      api.updateTasks(task).then(results => {
        console.log(results)
      }).catch(err => console.log(err))
      commit('updateTasks', task)
    }
  }
});

