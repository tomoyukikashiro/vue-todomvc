import Vue from 'vue'
import Todo from '@/Todo'
import TodoItem from '@/components/TodoItem'
import {mount} from '@vue/test-utils'

describe('TodoItem', function () {
  let Constructor, todo
  beforeEach(function () {
    Constructor = Vue.extend(TodoItem)
    todo = new Todo('test todo')
  })

  describe('should represent Todo based on Todo props', function () {
    describe('wrapper class', function () {
      describe('when todo is not completed', function () {
        it('should not have "completed class"', function () {
          const cmp = new Constructor({propsData: {todo}}).$mount()
          expect(Array.from(cmp.$el.classList)).not.toEqual(expect.arrayContaining(['completed']))
        })
      })
      describe('when todo is completed', function () {
        it('should have "completed class"', function () {
          todo.completed = true
          const cmp = new Constructor({propsData: {todo}}).$mount()
          expect(Array.from(cmp.$el.classList)).toEqual(expect.arrayContaining(['completed']))
        })
      })
      describe('when it is editing', function () {
        it('should have "editing" class', function () {
          const cmp = new Constructor({propsData: {todo}, data: {editing: true}}).$mount()
          expect(Array.from(cmp.$el.classList)).toEqual(expect.arrayContaining(['editing']))
        })
      })
      describe('when it is not editing', function () {
        it('should not have "editing" class', function () {
          const cmp = new Constructor({propsData: {todo}, data: {editing: false}}).$mount()
          expect(Array.from(cmp.$el.classList)).not.toEqual(expect.arrayContaining(['editing']))
        })
      })
    })
    describe('input[type=checkbox]', function () {
      describe('when todo is not completed', function () {
        it('should not checked', function () {
          const cmp = new Constructor({propsData: {todo}}).$mount()
          expect(cmp.$el.querySelector('input[type=checkbox]').checked).toBeFalsy()
        })
      })
      describe('when todo is completed', function () {
        it('should not checked', function () {
          todo.completed = true
          const cmp = new Constructor({propsData: {todo}}).$mount()
          expect(cmp.$el.querySelector('input[type=checkbox]').checked).toBeTruthy()
        })
      })
    })
    describe('label', function () {
      it('should have todo.title text', function () {
        const cmp = new Constructor({propsData: {todo}}).$mount()
        expect(cmp.$el.querySelector('label').textContent).toEqual('test todo')
      })
    })
    describe('input[type=text]', function () {
      it('should have todo.title text', function () {
        const cmp = new Constructor({propsData: {todo}}).$mount()
        expect(cmp.$el.querySelector('input[type=text]').value).toEqual('test todo')
      })
    })
  })
  describe('.editTodo', function () {
    describe('when call editTodo', function () {
      it('should "editing" is gonna be true', function () {
        const cmp = new Constructor({propsData: {todo}}).$mount()
        expect(cmp.editing).toBeFalsy()
        cmp.editTodo()
        expect(cmp.editing).toBeTruthy()
      })
    })
  })
  describe('.doneEdit', function () {
    let cmp
    beforeEach(function () {
      cmp = new Constructor({propsData: {todo}}).$mount()
    })
    it('should "editing" is gonna be false', function () {
      cmp.editTodo()
      expect(cmp.editing).toBeTruthy()
      cmp.doneEdit()
      expect(cmp.editing).toBeFalsy()
    })
    it('should trigger updatetodo', function () {
      const stub = jest.fn()
      cmp.$on('updatetodo', stub)
      cmp.doneEdit()
      expect(stub).toHaveBeenCalledWith(cmp.todo)
    })
  })
  describe('.deleteTodo', function () {
    it('should trigger "deletetodo" ', function () {
      const cmp = new Constructor({propsData: {todo}}).$mount()
      const stub = jest.fn()
      cmp.$on('deletetodo', stub)
      cmp.deleteTodo()
      expect(stub).toHaveBeenCalledWith(cmp.todo)
    })
  })
  describe('.updateTodo', function () {
    it('should trigger "updatetodo" ', function () {
      const cmp = new Constructor({propsData: {todo}}).$mount()
      const stub = jest.fn()
      cmp.$on('updatetodo', stub)
      cmp.updateTodo()
      expect(stub).toHaveBeenCalledWith(cmp.todo)
    })
  })
  describe('when label is double clicked', function () {
    it('should call editTodo', function () {
      const cmp = mount(TodoItem, {propsData: {todo}})
      const stub = jest.fn()
      cmp.setMethods({editTodo: stub})
      cmp.find('label').trigger('dblclick')
      expect(stub).toHaveBeenCalled()
    })
  })
})
