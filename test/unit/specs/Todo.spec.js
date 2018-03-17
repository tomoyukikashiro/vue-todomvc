import Todo from '@/Todo'

describe('Todo', function () {
  it('should have these properties', function () {
    const target = new Todo('test')
    expect(target).toHaveProperty('title', 'test')
    expect(target).toHaveProperty('completed', false)
    expect(target).toHaveProperty('id', expect.anything())
  })
})
