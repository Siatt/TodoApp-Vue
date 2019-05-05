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

    },
    async deleteTodo ({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
        // Get event value
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        commit('setTodos', res.data)
    },
    async updateTodo({ commit }, updatedTodo) {
        const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo)
        commit('updateTodo', res.data)
    }
}
// Mutate the state (update data,etc)
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
        if (index !== -1) {
            state.todos.splice(index, 1, updatedTodo)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}