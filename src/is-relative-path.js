const relativeRE = /^\.+\//

module.exports = (p)=> {
  return relativeRE.test(p)
}
