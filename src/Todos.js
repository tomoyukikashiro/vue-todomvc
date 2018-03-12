
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
  filtered () {
    return this.todos.filter(this.filter)
  }
  filterActive () {
    return this.todos.filter(filters.active)
  }
  filterCompleted () {
    return this.todos.filter(filters.completed)
  }
  get exist () {
    return this.todos.length > 0
  }
  get allDone () {
    return this.filterActive().length === 0
  }
  set allDone (value) {
    this.todos.forEach(todo => {
      todo.completed = value
    })
  }
}
