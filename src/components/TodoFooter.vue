<template>
  <footer class="footer">
      <span class="todo-count">
        <strong>{{remaining}}</strong> {{remaining | pluralize}} left
      </span>
    <ul class="filters">
      <li :key="key" v-for="(func, key) in filters"><a :href="`#/${key}`" :class="{selected: todos.filter === func}" @click="todos.filter = func">{{key}}</a></li>
    </ul>
    <button class="clear-completed" v-show="completed" @click.prevent="deleteCompleted">Clear Completed</button>
  </footer>
</template>

<script>
import Todos, {filters} from '../Todos'

export default {
  props: {
    todos: {
      type: Todos,
      required: true
    }
  },
  data () {
    return {
      filters: filters
    }
  },
  methods: {
    deleteCompleted () {
      this.todos.deleteCompleted()
    }
  },
  filters: {
    pluralize (n) {
      return n === 1 ? 'item' : 'items'
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
