import Vue from 'vue'
import Vuex from 'vuex'
import api from  './api.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: '',
    groups: [],
    tasks: [],
    tags: []
  },
  getters: {
    tasksByGroupId: (state) => (group_id) =>{
      console.log('getters: TaskByGroupId', state.tasks.filter( task => task.group_id === group_id))
      return state.tasks.filter( task => task.group_id === group_id)
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
    initTags (state, element) {
      const index = state.tags.length
      Vue.set(state.tags, index, element)
      console.log('initTags', element)
    },
    createTasks (state,task) {
      console.log('createTasks',task)
      const index = state.tasks.length
      Vue.set(state.tasks,index, task)  
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
    createGroups (state,group) {
      const index = state.groups.length
      Vue.set(state.groups,index, group)
    },
    updateGroups (state, group) {
      console.log('API updateGroups', group)
      const index = state.groups.findIndex( _group => _group.id === group.id)
      Vue.set(state.groups,index, group)
    },
    deleteGroups (state, group) {
      const index = state.groups.findIndex( _group => _group.id === group.id)
      Vue.delete(state.groups, index)
    },
    createTags (state, tag) {
      const index = state.tags.length
      Vue.set(state.tags,index, tag)
    },
    updateTags (state, tag) {
      console.log('API updateTags', tag)
      const index = state.tags.findIndex( _tag => _tag.id === tag.id)
      Vue.set(state.tags,index, tag)
    },
    deleteTags (state, tag) {
      const index = state.tags.findIndex( _tag => _tag.id === tag.id)
      Vue.delete(state.tags, index)
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
    initTags ( { commit }, user_id){
      api.getAllTags(user_id).then(elements => {
        elements.forEach(element => {
          commit('initTags', element)  
          console.log('initTags: api.getAllTags')
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
        console.log('API updateTasks succeed', results)
      }).catch(err => console.log(err))
      commit('updateTasks', task)
    },
    deleteTasks ( {commit }, task){
      api.deleteTasks(task).then( results => {
        console.log(results)
      }).catch( err => console.log(err))
      commit('deleteTasks', task)
    },
    createGroups ( { commit }, group ){
      console.log('createGroups Fire')
      api.createGroups(group).then(results => {
        console.log(results)
      }).catch(err => console.log(err))
      commit('createGroups', group)
    },
    updateGroups ( { commit }, group ){
      api.updateGroups(group).then(results => {
        console.log(results)
      }).catch(err => console.log(err))
      commit('updateGroups', group)
    },
    deleteGroups ( { commit }, group) {
      api.deleteGroups(group).then( results => {
        console.log(results)
      }).catch( err => console.log(err))
      commit('deleteGroups', group)
    },
    createTags ( { commit }, tag ){
      console.log('createTags Fire')
      api.createTags(tag).then(results => {
        console.log(results)
      }).catch(err => console.log(err))
      commit('createTags', tag)
    },
    updateTags ( { commit }, tag ){
      api.updateTags(tag).then(results => {
        console.log(results)
      }).catch(err => console.log(err))
      commit('updateTags', tag)
    },
    deleteTags ( { commit }, tag) {
      console.log('actions: deleteTags', tag)
      api.deleteTags(tag).then( results => {
        console.log(results)
      }).catch( err => console.log(err))
      commit('deleteTags', tag)
    }
  }
});

