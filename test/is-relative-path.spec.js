import test from 'ava'
import isRelativePath from '../src/is-relative-path'

test('should be not a relative require path', assert => {
  assert.is(isRelativePath('README.md'), false)
})

test('should be a relative require path: ./', assert => {
  assert.is(isRelativePath('./README.md'), true)
})

test('should be a relative require path: .../', assert => {
  assert.is(isRelativePath('.../README.md'), true)
})

test('should be not a relative require path: /', assert => {
  assert.is(isRelativePath('/README.md'), false)
})

test('should be a relative require path: ../', assert => {
  assert.is(isRelativePath('../'), true)
})
