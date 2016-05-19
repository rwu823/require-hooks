import test from 'ava'
import requireHooks from '../src'
import fs, {readFileSync} from 'fs'

requireHooks(({ext, rawPath, mod, requirePath})=> {
  switch (ext) {
    case '.css':
      return 'css'
    case '.raw':
      return readFileSync(rawPath).toString()
    case '.md':
      return null
  }
})


test('require raw file', assert => {
  const raw = require('./require/require.raw')

  assert.is(raw, 'raw file!\n')
})

test('require css file', assert => {
  const css = require('./require/require.css')
  assert.is(css, 'css')
})


test('require normal js file', assert => {
  const js = require('./require/require.js')
//  console.log(js)
})

test('require nothing', assert => {
  const md = require('../README.md')
  assert.is(md, null)
})

test('throws error if not found module', assert => {
  assert.throws(()=> {
    require('../README')
  })
})

test('require module for not relative path', assert => {
  const css = require('foo.css')
  assert.is(css, 'css')
})

test('require module for not relative path throws error', assert => {
  assert.throws(()=> {
    const css = require('bar.css')
  })
})
