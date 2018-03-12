
export const filters = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed
}

export default class TodoList {
  constructor (todos = [], filter = filters.all) {
    this.todos = todos
    this.filter = filter
  }
  addTodo (todo) {
    this.todos.push(todo)
  }
  deleteCompleted () {
    this.todos = this.todos.filter(filters.active)
  }
  deleteTodo (todo) {
    this.todos = this.todos.filter(t => t !== todo)
  }
  get filtered () {
    return this.todos.filter(this.filter)
  }
  get filteredActive () {
    return this.todos.filter(filters.active)
  }
  get filteredCompleted () {
    return this.todos.filter(filters.completed)
  }
  get exist () {
    return this.todos.length > 0
  }
  get allDone () {
    return this.filteredActive.length === 0
  }
  set allDone (value) {
    this.todos.forEach(todo => {
      todo.completed = value
    })
  }
}
