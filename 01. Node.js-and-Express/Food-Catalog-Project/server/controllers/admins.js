const User = require('mongoose').model('User')
module.exports = {
  addGet: (req, res) => {
    User.find({}).then(users => {
      res.render('admins/add', {users: users})
    })
  },
  addPost: (req, res) => {
    let role = req.body
    User.findByIdAndUpdate(role.id).then(user => {
      if (user.roles.indexOf(role.role) > -1) {
        res.redirect('/')
        return
      }
      user.roles = []
      user.roles.push(role.role)
      user.save()
      res.redirect('/')
    })
  },
  listGet: (req, res) => {
  }
}
