module.exports = (map = {})=> {
  Module.prototype.require = function(modulePath) {
    const ext = path.extname(modulePath)

    if (isFunction(map[ext])) {
      const raw = fs.readFileSync(path.join(this.filename, '../', modulePath)).toString()

      return map[ext]({raw, mod: this})
    } else if (map[ext] !== undefined) {
      return map[ext]
    }

    if (map['*'] && isFunction(map['*'])) {
      map['*']({mod: this})
    }

    return requireHook(this, modulePath)
  }
}
