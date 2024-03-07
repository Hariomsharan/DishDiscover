var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { isLoggedIn } = require("./utility/verifyToken");
const {
  createRecipeRoute,
  editRecipeRoute,
  deleteRecipeRoute,
  getRecipesRoute,
  getRecipebyidRoute
} = require("../controller/recipeControllers");

/**
 * @route POST /createrecipe
 * @desc creating recipe
 * @access private
 */
router.post(
  "/createrecipe",
  [check("dish", "dish must have atleast four characters, space not allowed")],
  isLoggedIn,
  createRecipeRoute
);

/**
 * @route POST /editrecipe
 * @desc update recipe
 * @access private
 */
router.post("/editrecipe/:id", isLoggedIn, editRecipeRoute);
deleteRecipeRoute;

/**
 * @route DELETE /deleterecipe
 * @desc Delete recipe
 * @access private
 */
router.delete("/deleterecipe/:id", isLoggedIn, deleteRecipeRoute);

/**
 * @route GET /getRecipesRoute
 * @desc Find all recipes
 * @access private
 */
router.get("/getRecipesRoute", isLoggedIn, getRecipesRoute);

/**
 * @route GET /getRecipeRoute
 * @desc Find recipe by Id
 * @access private
 */
router.get("/getRecipeRoute/:id", isLoggedIn, getRecipebyidRoute);

module.exports = router;
