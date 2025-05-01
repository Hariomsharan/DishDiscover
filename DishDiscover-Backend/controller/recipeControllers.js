const { route } = require("../app");
const Recipe = require("../model/recipeSchema");
const User = require("../model/userSchema");
const { validationResult } = require("express-validator");

exports.createRecipeRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  const { dish, chef, description, image, ingredients } = req.body;
  const newRecipe = new Recipe({ dish, chef, description, image, ingredients });

  User.findOne({ username: req.user.username })
    .then((user) => {
      newRecipe.chef = user;
      user.recipes.push(newRecipe);
      user.save().then(() => {
        newRecipe.save().then(() => {
          res.status(200).json({ message: "New Recipe Created" });
        });
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal server problem", error: err })
    );
};

exports.editRecipeRoute = (req, res, next) => {
  const { dish, chef, description, image, ingredients } = req.body;
  const updatedRecipe = { dish, chef, description, image, ingredients };

  Recipe.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedRecipe },
    { new: true, useFindAndModify: false }
  )
    .then((revisedRecipe) => {
      res
        .status(200)
        .json({ message: "Recipe Updated", recipe: revisedRecipe });
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal server problem", error: err })
    );
};

exports.deleteRecipeRoute = (req, res, next) => {
  User.findOne({ username: req.user.username })
    .then((loggedInUser) => {
      Recipe.findOneAndDelete({ _id: req.params.id }).then((recipe) => {
        let recipeIndex = loggedInUser.recipes.indexOf(recipe._id);
        loggedInUser.recipes.splice(recipeIndex, 1);
        loggedInUser
          .save()
          .then(() => res.status(201).json({ message: "Recipie Deleted" }));
      });
    })
    .catch((error) =>
      res.status(501).json({ message: "Something went wrong", error })
    );
};

exports.getRecipesRoute = (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json({ message: "Found Recipes", recipes });
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server problem", error: err });
    });
};

exports.getRecipebyidRoute = (req, res, next) => {
  Recipe.findById({ _id: req.params.id })
    .then((recipe) => {
      res.status(200).json({ message: "Found Recipes", recipe });
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server problem", error: err });
    });
};


exports.getUserRecipes = (req, res, next) => {
  Recipe.find()
    .populate('chef')
    .then((recipes) => {
      const userRecipes = recipes.filter(recipe => recipe.chef._id.toString() === req.params.id);
      res.status(200).json({ message: "Found Recipes", recipes: userRecipes });
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server problem", error: err });
    });
};