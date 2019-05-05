import axios from 'axios'
// Each module can have its own state, getters, actions & mutations. (posts module, auth module, etc)


// App level state/data
const state = {
    todos: []
}
// Get pieces of state or computed values from state
const getters = {
    getAllTodos: (state) => state.todos
}
// Called from components to commit a mutation
const actions = {
    async fetchTodos ({ commit }) {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
        commit('setTodos', res.data)
    },
    async addTodo ({ commit }, title) {
        const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false})
        commit('newTodo', res.data)

    }
}
// Mutate the state (update data,etc)
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo)
}

export default {
    state,
    getters,
    actions,
    mutations
}