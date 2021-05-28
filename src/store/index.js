import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 3,
    posts: [
      { id: 1, body: 'test1' },
      { id: 2, body: 'test2' },
      { id: 3, body: 'test3' }
    ],
    groups: [
      {
        id: '0',
        name: 'Kubernetes',
        isEditing: false 
      },
      {
        id: '1',
        name: 'todo',
        isEditing: false
      },
      {
        id: '2',
        name: 'doing',
        isEditing: false
      }
    ],
    tasks: {
      Kubernetes: [
        {
          id: '0',
          title: 'title 1',
          description: 'this is a description 1\
          \n ### This is markdown sentences\
          \n You can change the style \
          \n like this `this is a code line`\
          \n ```this is a code block wirrten\
          \n $ curl -I hostname.com```\
          \n You can make a checkbox like this\
          \n - [ ] task 1 \
          \n - [x] task 2',
          finished: false,
          group: 'Kubernetes'
        },
        {
          id: '1',
          title: 'title 2',
          description: 'this is a description 2',
          finished: false,
          group: 'Kubernetes'
        }
      ],
      todo: [
        {
          id: '0',
          title: 'title 3',
          description: 'this is a description 3',
          finished: false,
          group: 'todo'
        }
      ],
      doing: [
        {
          id: '0',
          title: 'title 4',
          description: 'this is a description 4',
          finished: false,
          group: 'doing'
        }
      ]
    }     
  },
  mutations: {
    updateTask (state, task) {
      console.log(task)
      Vue.set(state.tasks[task.group],task.id, task)
    },
    createTask (state,task) {
      console.log(task)
      const id = state.tasks[task.group].length
      task.id = id
      Vue.set(state.tasks[task.group],id, task)  
      console.log(state.tasks[task.group][id])
    }
  }
});