let error404 = (res, message) => {
  res.writeHead(404)
  res.write(message)
  res.end()
}
let throwError = (error) => {
  throw error
}
module.exports = {
  error404,
  throwError
}
