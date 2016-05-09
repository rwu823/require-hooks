import Module from 'module'
import path from 'path'
import fs from 'fs'
import isRelativePath from './is-relative-path'
import closestModule from './closest-module'

const _require = Module.prototype.require
const requireHook = function(context, modulePath) {
  return _require.call(context, modulePath)
}

const isFunction = (o)=> {
  return typeof o === 'function'
}

module.exports = (callback)=> {
  Module.prototype.require = function(requirePath) {
    const ext = path.extname(requirePath)
    const isRelative = isRelativePath(requirePath)
    const {paths, filename} = this

    if (isFunction(callback) && (ext && ext !== '.js')) {
      let isExists = true
      let rawPath = path.join(filename, '../', requirePath)

      if (!isRelative) {
        rawPath = closestModule(paths, requirePath)
      }

      const raw = isExists ? fs.readFileSync(rawPath).toString() : null
      const hasHook = callback({ext, mod: this, raw, requirePath})
      if (hasHook !== undefined) return hasHook
    }

    return requireHook(this, requirePath)
  }
}
