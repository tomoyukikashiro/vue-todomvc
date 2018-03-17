import Todos, {filters} from '@/Todos'
import Todo from '@/Todo'

const clone = (org) => {
  return Object.assign(Object.create(Object.getPrototypeOf(org)), org)
}

describe('Todos', function () {
  it('should have these properties', function () {
    const target = new Todos()
    expect(target).toHaveProperty('todos', [])
    expect(target).toHaveProperty('filter', filters.all)
  })

  describe('.addTodo', function () {
    const list = new Todos()
    expect(list.todos).toHaveLength(0)
    it('should add new Todo', function () {
      list.addTodo(new Todo())
      expect(list.todos).toHaveLength(1)
    })
  })

  describe('.updateTodo', function () {
    const org = new Todo('before')
    const update = clone(org)
    const list = new Todos()
    update.title = 'after'
    list.addTodo(org)
    it('should replace with new Todo', function () {
      expect(list.todos[0].title).toBe('before')
      list.updateTodo(update)
      expect(list.todos[0].title).toBe('after')
    })
  })

  describe('.deleteCompleted', function () {
    const list = new Todos()
    const todo = new Todo('not completed')
    const completedTodo = new Todo('completed', true)
    list.addTodo(todo)
    list.addTodo(completedTodo)
    it('should not contain completed todo in todos', function () {
      list.deleteCompleted()
      expect(list.todos).toContain(todo)
      expect(list.todos).not.toContain(completedTodo)
    })
  })

  describe('.deleteTodo', function () {
    const list = new Todos()
    const todo1 = new Todo()
    const todo2 = new Todo()
    list.addTodo(todo1)
    list.addTodo(todo2)
    it('should delete the todo', function () {
      expect(list.todos).toHaveLength(2)
      list.deleteTodo(todo2)
      expect(list.todos).toContain(todo1)
      expect(list.todos).not.toContain(todo2)
    })
  })

  describe('filter getters', function () {
    const activeTodo = new Todo()
    const completedTodo = new Todo('', true)
    const list = new Todos()
    list.addTodo(activeTodo)
    list.addTodo(completedTodo)

    describe('.filtered', function () {
      describe('when all filter is used', function () {
        it('should return all todos', function () {
          list.filter = filters.all
          expect(list.filtered).toHaveLength(2)
        })
      })
      describe('when active filter is used', function () {
        it('should return active todo only', function () {
          list.filter = filters.active
          expect(list.filtered).toHaveLength(1)
          expect(list.filtered[0].id).toEqual(activeTodo.id)
        })
      })
      describe('when completed filter is used', function () {
        it('should return completed todo only', function () {
          list.filter = filters.completed
          expect(list.filtered).toHaveLength(1)
          expect(list.filtered[0].id).toEqual(completedTodo.id)
        })
      })
    })
    describe('.filteredActive', function () {
      it('should return active todo only', function () {
        list.filter = filters.all
        expect(list.filteredActive).toHaveLength(1)
        expect(list.filteredActive[0].id).toEqual(activeTodo.id)
      })
    })
    describe('.filteredCompleted', function () {
      it('should return completed todo only', function () {
        list.filter = filters.all
        expect(list.filteredCompleted).toHaveLength(1)
        expect(list.filteredCompleted[0].id).toEqual(completedTodo.id)
      })
    })
  })

  describe('.exist', function () {
    let list
    beforeEach(function () {
      list = new Todos()
    })
    describe('when there is todo', function () {
      it('should return true', function () {
        list.addTodo(new Todo())
        expect(list.exist).toBeTruthy()
      })
    })
    describe('when there is not todo', function () {
      it('should return true', function () {
        expect(list.exist).toBeFalsy()
      })
    })
  })

  describe('.allDone', function () {
    let list
    beforeEach(function () {
      list = new Todos()
    })
    describe('when there is a active todo', function () {
      it('should return false', function () {
        list.addTodo(new Todo())
        expect(list.allDone).toBeFalsy()
      })
    })
    describe('when there is not active todo', function () {
      it('should return false', function () {
        list.addTodo(new Todo('', true))
        expect(list.allDone).toBeTruthy()
      })
    })
  })

  describe('.allDone =', function () {
    let list
    beforeEach(function () {
      list = new Todos()
    })
    describe('where false is set', function () {
      it('should make all todos active', function () {
        list.addTodo(new Todo('', true))
        list.addTodo(new Todo('', true))
        expect(list.filteredCompleted).toHaveLength(2)
        list.allDone = false
        expect(list.filteredCompleted).toHaveLength(0)
        expect(list.filteredActive).toHaveLength(2)
      })
    })
    describe('where true is set', function () {
      it('should make all todos completed', function () {
        list.addTodo(new Todo('', false))
        list.addTodo(new Todo('', false))
        expect(list.filteredActive).toHaveLength(2)
        list.allDone = true
        expect(list.filteredActive).toHaveLength(0)
        expect(list.filteredCompleted).toHaveLength(2)
      })
    })
  })
})
