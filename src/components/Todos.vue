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
      <input type="checkbox" class="toggle-all" v-model="todos.alldone">
      <TodoList :todos="todos"></TodoList>
    </section>
    <footer class="footer" v-show="todos.exist">
      <span class="todo-count">
        <strong>{{remaining}}</strong> {{remaining | pluralize}} left
      </span>
      <ul class="filters">
        <li :key="key" v-for="(func, key) in filters"><a :href="`#/${key}`" :class="{selected: todos.filter === func}" @click="todos.filter = func">{{key}}</a></li>
      </ul>
      <button class="clear-completed" v-show="completed" @click.prevent="deleteCompleted">Clear Completed</button>
    </footer>
  </section>
</template>

<script>
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import Todos, {filters} from '../Todos'

export default {
  components: {
    TodoInput,
    TodoList
  },
  data () {
    return {
      todos: new Todos(),
      filters: filters
    }
  },
  filters: {
    pluralize (n) {
      return n === 1 ? 'item' : 'items'
    }
  },
  methods: {
    addTodo (todo) {
      this.todos.addTodo(todo)
    },
    deleteCompleted () {
      this.todos.deleteCompleted()
    }
  },
  computed: {
    remaining () {
      return this.todos.filteredActive.length
    },
    completed () {
      return this.todos.filteredCompleted.length
    }
  }
}
</script>

<style src="./todo.css"></style>
