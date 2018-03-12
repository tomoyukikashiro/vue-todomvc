<template>
  <li class="todo" :class="{completed: todo.completed, editing: editing}">
    <div class="view">
      <input type="checkbox" v-model="todo.completed" class="toggle">
      <label @dblclick="editTodo">{{todo.title}}</label>
      <button type="button" class="destroy" @click.prevent="deleteTodo(todo)"></button>
    </div>
    <input type="text" class="edit" v-model="todo.title" @keyup.enter="doneEdit" @blur="doneEdit" v-todoFocus="editing">
  </li>
</template>

<script>
import Vue from 'vue'
import Todo from '../Todo'
export default {
  props: {
    todo: {
      type: Todo,
      required: true
    }
  },
  data () {
    return {
      editing: false
    }
  },
  directives: {
    todoFocus (el, value) {
      if (value) {
        Vue.nextTick(() => {
          el.focus()
        })
      }
    }
  },
  methods: {
    editTodo () {
      this.editing = true
    },
    doneEdit () {
      this.editing = false
    },
    deleteTodo (todo) {
      this.$emit('deletetodo', todo)
    }
  }
}
</script>
