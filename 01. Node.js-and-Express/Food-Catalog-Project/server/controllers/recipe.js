const Recipe = require('../models/Recipe')
const Category = require('../models/Category')
const Comments = require('../models/Comment')
const fs = require('fs')
module.exports = {
  addGet: (req, res) => {
    Category.find()
      .then((categories) => {
        res.render('recipes/add', { categories: categories })
      })
  },
  addPost: (req, res) => {
    let recipeObj = req.body
    let filePath = `images/${req.file.filename}`
    recipeObj.image = filePath
    Recipe.create(recipeObj)
      .then((recipe) => {
        Category
          .findById(recipeObj.category)
          .then(category => {
            category.recipe.push(recipe._id)
            category.save()
            res.redirect('/')
          })
      }).catch(err => {
        console.log(err)
      })
  },
  listGet: (req, res) => {
    Recipe.find({})
      .populate('category')
      .then((recipes) => {
        console.log(recipes)
        res.render('recipes/all', { recipes: recipes })
      })
  },
  detailsGet: (req, res) => {
    let recipeId = req.params.id
    Recipe
      .findById(recipeId)
      .populate('category')
      .populate('comments')
      .then((recipe) => {
        res.render('recipes/details', { recipe: recipe, comments: recipe.comments })
      })
  },
  editGet: (req, res) => {
    let recipeId = req.params.id
    Recipe.findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.sendStatus(404)
          return
        }
        Category.find()
          .then((categories) => {
            res.render('recipes/edit', {
              recipe: recipe,
              categories: categories
            })
          })
      })
  },
  editPost: (req, res) => {
    if (req.filename === undefined) {
      if (req.file === undefined) {
        res.redirect('/')
        return
      }
      let recipeId = req.params.id
      let recipeObj = req.body
      let filePath = `images/${req.file.filename}`
      Recipe
        .findById(recipeId)
        .then(currentRecipes => {
          currentRecipes.name = recipeObj.name
          currentRecipes.description = recipeObj.description
          if (req.file) {
            currentRecipes.image = filePath
          }
          let categoryId = recipeObj.category
          if (currentRecipes.category !== categoryId) {
            Category.findById(currentRecipes.category)
              .then(currentCategory => {
                Category.findById(categoryId)
                  .then(newCategory => {
                    let index = currentCategory.recipe.indexOf(currentRecipes._id)
                    if (index >= 0) {
                      currentCategory.recipe.splice(index, 1)
                    }
                    currentCategory.save()
                    newCategory.recipe.push(currentRecipes._id)
                    newCategory.save()
                    currentRecipes.category = recipeObj.category
                    currentRecipes.save()
                      .then(() => {
                        res.redirect('/')
                      })
                  })
              })
          }
        })
    }
  },
  deleteGet: (req, res) => {
    let recipeId = req.params.id
    Recipe.findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.sendStatus(404)
          return
        }
        Category.find()
          .then((categories) => {
            res.render('recipes/delete', {
              recipe: recipe,
              categories: categories
            })
          })
      })
  },
  deletePost: (req, res) => {
    let recipeID = req.params.id
    Recipe
      .findById(recipeID)
      .then((recipe) => {
        Category
          .findById(recipe.category)
          .then(category => {
            let index = category.recipe.indexOf(recipeID)
            if (index >= 0) {
              category.recipe.splice(index, 1)
            }
            category.save()
            // TODO: remove comments references!
            Comments.remove({ recipeId: recipeID }).catch(err => { console.log(err) })
            Recipe
              .findByIdAndRemove(recipeID)
              .then(recipeToDelete => {
                fs.unlink('public/' + recipeToDelete.image, (err) => {
                  if (err) {
                    console.log(err)
                  }
                  recipeToDelete.save()
                  res.redirect('/')
                })
              })
          })
      })
  }
}
