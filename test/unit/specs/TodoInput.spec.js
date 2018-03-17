import Todo from '@/Todo'
import TodoInput from '@/components/TodoInput'
import {mount} from '@vue/test-utils'

describe('TodoInput', function () {
  describe('when user input title and push enter', function () {
    it('should trigger "addtodo" with todo object', function () {
      const cmp = mount(TodoInput)
      cmp.setData({title: 'test todo'})
      cmp.find('input[type=text]').trigger('keyup.enter')
      expect(cmp.emitted('addtodo')).toBeTruthy()
      expect(cmp.emitted('addtodo')[0][0]).toBeInstanceOf(Todo)
      expect(cmp.emitted('addtodo')[0][0].title).toEqual('test todo')
      expect(cmp.emitted('addtodo')[0][0].completed).toBeFalsy()
    })
  })
})
