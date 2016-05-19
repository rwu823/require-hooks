[![version](https://img.shields.io/npm/v/require-hooks.svg?label=version)](https://www.npmjs.org/package/rwu823/require-hooks) [![Build Status](https://img.shields.io/travis/rwu823/require-hooks.svg?branch=master)](https://travis-ci.org/rwu823/require-hooks) [![Coverage](https://img.shields.io/coveralls/rwu823/require-hooks.svg)](https://coveralls.io/github/rwu823/require-hooks)

# Node Require Hooks

In browser's world we have `webpack` and many great loaders let us require everything not only `.js` file,  on the contrary you only can require `.js` in Node.



## Usage

```javascript
// include in main file
import requireHooks from 'require-hooks'
import fs, {readFileSync} from 'fs'
  
requireHooks(({ext, rawPath, mod, requirePath})=> {
  switch (ext) {
    case '.css': // require('./[everything].css') will as 'css'
      return 'css'
    case '.raw': // return file raw body
      return readFileSync(rawPath).toString()
    case '.md': // do nothing
      return null
  }
})
```



## Examples

Without require hooks

```javascript
// react-tab.js
import React, {Component} from 'react'

// this will get exception in Node test environment
require('./react-tab.css') 

class Tab extends Component {
  ...
}

module.export = Tab
```



```javascript
// test.spec.js

import Tab from '../components/react-tab' // OOPS, throws exception :(
  
describe('#Test react tab component', ()=> {
	...
})
```



Includes require hooks to fix this

```javascript
require('require-hooks')(({ext, mod, requirePath})=> {
  switch (ext) {
    case '.css': // do nothing
      return null
  }
})

import Tab from '../components/react-tab' // Congratulation, pass the require :)    
               
describe('#Test react tab component', ()=> {
	...
})
```



## API

### requireHooks({ext, raw, mod, requirePath})

If doesn't have any `return` it will uses original require function

- `ext` get filename extension
- `mod`  export as module
- `requirePath` get relative require path
- `rawPath` get full raw path

###  
