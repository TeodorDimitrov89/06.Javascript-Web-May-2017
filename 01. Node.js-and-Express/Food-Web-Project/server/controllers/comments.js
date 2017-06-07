const Recipe = require('mongoose').model('Recipe')
const Comment = require('mongoose').model('Comment')
module.exports = {
  commentGet: (req, res) => {
    res.render('comments/add')
  },
  commentPost: (req, res) => {
    let currentUser = req.user.username
    let commentBody = req.body.content
    let recipeId = req.params.id
    Comment.create({
      author: currentUser,
      comment: commentBody,
      recipeId: recipeId
    }).then(comment => {
      comment.save()
        .then(comments => {
          Recipe
            .findById(recipeId)
            .then(recipe => {
              recipe.comments.push(comments)
              recipe.save()
              res.redirect('/')
            })
        })
    })
  }
}
