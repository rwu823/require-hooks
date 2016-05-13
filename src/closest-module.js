import fs from 'fs'

const isExists = (p)=> {
  let exists = true
  try {
    fs.statSync(p)
  } catch (er) {
    exists = false
  }
  return exists
}


module.exports = (paths, requirePath)=> {
  let closestModule, closestPath

  paths.some((p)=> {
    if (!closestPath) closestPath = p
    closestModule = `${p}/${requirePath}`

    return isExists(closestModule)
  })

  if (isExists(closestModule)) {
    return closestModule
  } else {
    throw new Error(`can't found module ${requirePath} in ${closestPath}`)
  }
}
