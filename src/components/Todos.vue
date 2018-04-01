<template>
  <section class="todoapp">
    <header class="header">
      <h1>Todos</h1>
      <TodoInput
        class="new-todo"
        placeholder="What needs to be done?"
        @addtodo="addTodo"
        autofocus/>
    </header>
    <section class="main" v-show="todos.exist" v-cloak>
      <input type="checkbox" class="toggle-all" v-model="todos.allDone">
      <TodoList :todos="todos"></TodoList>
    </section>
    <footer is="TodoFooter" v-show="todos.exist" :todos="todos"></footer>
  </section>
</template>

<script>
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import Todos from '../Todos'

export default {
  components: {
    TodoInput,
    TodoList,
    TodoFooter
  },
  data () {
    return {
      todos: new Todos()
    }
  },
  methods: {
    addTodo (todo) {
      this.todos.addTodo(todo)
    }
  }
}
</script>

<style src="./todo.css"></style>
