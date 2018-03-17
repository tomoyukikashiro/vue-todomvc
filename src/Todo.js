
const getId = () => (
  Math.random() * Date.now()
)

export default class Todo {
  constructor (title = '', completed = false) {
    this.title = title
    this.completed = completed
    this.id = getId()
  }
}
