import Vue from 'vue'
import Vuex from 'vuex'
import api from  './api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: 'userId_001',
    groups: [],
    tasks: []
  },
  getters: {
    groupTasks: (state) => (group_name) =>{
      console.log('getters', state.tasks.filter( task => task.group_id === group_name))
      return state.tasks.filter( task => task.group_id === group_name)
    }
  },
  mutations: {
    initGroups (state, element) {
      const index = state.groups.length
      Vue.set(state.groups, index, element)
      Vue.set(state.tasks,element.name,[])
    },
    initTasks (state, element) {
      const index = state.tasks.length
      Vue.set(state.tasks, index, element)
      console.log('init', state.tasks)
      Vue.nextTick
    },
    createTasks (state,task) {
      console.log('createTask',task)
      Vue.set(state.tasks,task.id, task)  
    },
    updateTasks (state,task) {
      console.log('updateTask',task)
      Vue.set(state.tasks,task.id, task)
    },
    // updateGroupName (state, task) {
    //   Vue.set(state.tasks[task.group_id])
    // }
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

