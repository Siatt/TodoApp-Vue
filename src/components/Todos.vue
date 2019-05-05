<template>
    <div class="container">
        <h3>Todos</h3>
        <div class="todos">
            <div v-for="todo in getAllTodos" :key="todo.id" class="todo">
                {{todo.title}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Todos",
    computed: mapGetters(['getAllTodos'])
}
</script>

<style>

</style>
