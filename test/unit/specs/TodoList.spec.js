import TodoList from '@/components/TodoList'
import TodoItem from '@/components/TodoItem'
import Todos from '@/Todos'
import Todo from '@/Todo'
import {mount} from '@vue/test-utils'

describe('TodoList', function () {
  describe('Constructor', function () {
    describe('when Todos is empty ', function () {
      it('there is not todoItem', function () {
        const cmp = mount(TodoList, {propsData: {todos: new Todos()}})
        expect(cmp.contains(TodoItem)).toBeFalsy()
      })
    })
    describe('when Todos has item', function () {
      it('there is not todoItem', function () {
        const todos = new Todos()
        todos.addTodo(new Todo())
        const cmp = mount(TodoList, {propsData: {todos}})
        expect(cmp.contains(TodoItem)).toBeTruthy()
        expect(cmp.findAll(TodoItem).length).toEqual(1)
      })
    })
  })
  describe('.deleteTodo', function () {
    describe('when call deleteTodo', function () {
      let todos, todo, cmp, todoItem, stub
      beforeEach(function () {
        stub = jest.fn()
        todos = new Todos()
        todo = new Todo()
        todos.addTodo(todo)
        cmp = mount(TodoList, {propsData: {todos}})
        cmp.setMethods({deleteTodo: stub})
        todoItem = cmp.find(TodoItem)
      })
      it('should call "todos.deleteTodo(todo)"', function () {
        todoItem.vm.$emit('deletetodo', todo)
        expect(stub).toHaveBeenCalledWith(todo)
      })
    })
  })
  describe('.updateTodo', function () {
    describe('when call updateTodo', function () {
      let todos, todo, cmp, todoItem, stub
      beforeEach(function () {
        stub = jest.fn()
        todos = new Todos()
        todo = new Todo()
        todos.addTodo(todo)
        cmp = mount(TodoList, {propsData: {todos}})
        cmp.setMethods({updateTodo: stub})
        todoItem = cmp.find(TodoItem)
      })
      it('should call "todos.updateTodo(todo)"', function () {
        todoItem.vm.$emit('updatetodo', todo)
        expect(stub).toHaveBeenCalledWith(todo)
      })
    })
  })
})
