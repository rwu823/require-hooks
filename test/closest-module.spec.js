import test from 'ava'
import closestModule from '../src/closest-module'

test('should get test/node_modules/foo.css', assert => {
  const modulePath = closestModule(module.paths, 'foo.css')

  assert.true(modulePath.endsWith('require-hooks/test/node_modules/foo.css'))
})

test('should be expecting error cannot found module', assert => {
  assert.throws(()=> {
    closestModule(module.paths, 'bar.css')
  })
})
