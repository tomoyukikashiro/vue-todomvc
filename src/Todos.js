
export const filters = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed
}

const clone = (org) => {
  return Object.assign(Object.create(Object.getPrototypeOf(org)), org)
}

const cloneAll = (orgs) => {
  return orgs.map(todo => clone(todo))
}

export default class TodoList {
  constructor (todos = [], filter = filters.all) {
    this.todos = todos
    this.filter = filter
  }
  addTodo (todo) {
    this.todos = [...this.todos, todo]
  }
  updateTodo (newTodo) {
    this.todos = this.todos.map(todo => todo.id === newTodo.id ? newTodo : todo)
  }
  deleteCompleted () {
    this.todos = this.todos.filter(filters.active)
  }
  deleteTodo (todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id)
  }
  get filtered () {
    return cloneAll(this.todos.filter(this.filter))
  }
  get filteredActive () {
    return cloneAll(this.todos.filter(filters.active))
  }
  get filteredCompleted () {
    return cloneAll(this.todos.filter(filters.completed))
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
