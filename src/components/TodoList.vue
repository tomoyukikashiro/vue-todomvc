<template>
  <ul class="todo-list">
    <li is="todoItem"
        :key="index"
        v-for="(todo, index) in todos.filtered"
        @deletetodo="deleteTodo"
        @updatetodo="updateTodo"
        :todo="todo"></li>
  </ul>
</template>

<script>
import TodoItem from './TodoItem'
import Todos from '../Todos'
export default {
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Todos,
      required: true
    }
  },
  methods: {
    deleteTodo (todo) {
      this.todos.deleteTodo(todo)
    },
    updateTodo (todo) {
      this.todos.updateTodo(todo)
    }
  }
}
</script>
