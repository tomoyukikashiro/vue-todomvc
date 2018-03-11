<template>
  <input type="text"
         autocomplete="off"
         v-model.trim="title"
         @keyup.enter="addTodo"/>
</template>

<script>
import Todo from '../Todo'
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    addTodo () {
      const todo = new Todo(this.title)
      this.$emit('addtodo', todo)
      this.title = ''
    }
  }
}
</script>
