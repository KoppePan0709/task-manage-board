import Vue from 'vue'
import Vuex from 'vuex'
import api from  './api.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: '',
    groups: [],
    tasks: []
  },
  getters: {
    tasksByGroupName: (state) => (group_name) =>{
      console.log('getters: TaskByGroupName', state.tasks.filter( task => task.group_id === group_name))
      return state.tasks.filter( task => task.group_id === group_name)
    },
    taskById: (state) => (id) =>{
      console.log('getters: taskById', state.tasks.filter( task => task.id === id))
      //return state.tasks.filter( task => task.group_id === group_name)
    }
  },
  mutations: {
    signInUser (state, element) {
      console.log('signInUser: uid = ', element)
      state.user_id = element
    },
    initGroups (state, element) {
      const index = state.groups.length
      Vue.set(state.groups, index, element)
      console.log('initGroups', state.groups)
      // Vue.set(state.tasks,element.name,[])
    },
    initTasks (state, element) {
      const index = state.tasks.length
      Vue.set(state.tasks, index, element)
      console.log('initTasks', element)
    },
    createTasks (state,task) {
      console.log('createTasks',task)
      const index = state.tasks.length
      Vue.set(state.tasks,index, task)  
    },
    createGroups (state,group) {
      const index = state.groups.length
      Vue.set(state.groups,index, group)
    },
    updateTasks (state,task) {
      console.log('updateTasks', task)
      const index = state.tasks.findIndex( _task => _task.id === task.id)
      Vue.set(state.tasks,index, task)
    },
    deleteTasks (state, task) {
      console.log('deleteTasks Fire')
      const index = state.tasks.findIndex( _task => _task.id === task.id)
      console.log(index)
      Vue.delete(state.tasks, index)
    },
    updateGroups (state, group) {
      console.log('API updateGroups', group)
      const index = state.groups.findIndex( _group => _group.id === group.id)
      Vue.set(state.groups,index, group)
    }
  },
  actions: {
    initGroups ( { commit }, user_id){
      api.getAllGroups(user_id).then(elements => {
        elements.forEach(element => {
          commit('initGroups', element)  
          console.log('initGroups: api.getAllGroups')
        });
      })
      .catch(err => console.log(err))
    },
    initTasks ( { commit }, user_id){
      api.getAllTasks(user_id).then(elements => {
        elements.forEach(element => {
          commit('initTasks', element)
          console.log('initTasks: api.getAllTasks')
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
    createGroups ( { commit }, group ){
      console.log('createGroups Fire')
      api.createGroups(group).then(results => {
        console.log(results)
      }).catch(err => console.log(err))
      commit('createGroups', group)
    },
    updateTasks ( { commit }, task ){
      api.updateTasks(task).then(results => {
        console.log('API updateTasks succeed', results)
      }).catch(err => console.log(err))
      commit('updateTasks', task)
    },
    updateGroups ( { commit }, group ){
      api.updateGroups(group).then(results => {
        console.log(results)
      }).catch(err => console.log(err))
      commit('updateGroups', group)
    },
    deleteTasks ( {commit }, task){
      api.deleteTasks(task).then( results => {
        console.log(results)
      }).catch( err => console.log(err))
      commit('deleteTasks', task)
    }
  }
});

