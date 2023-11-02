
module.exports = function (userAuthenticated, res, response) {
    return userAuthenticated ? res.status(200).json(response) : res.status(403).json(response)
  }