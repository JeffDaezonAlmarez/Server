const express = require('express');

const router = express.Router();
const verify = require('../controllers/Verify.token');

const RecipeControllers = require('../controllers/Recipe.controllers');

router.post('/add/recipe', RecipeControllers.addRecipe);
router.get('/recipes', RecipeControllers.getRecipe);
router.put('/recipe/update/:Recipe_id', RecipeControllers.updateRecipe);
router.delete('/recipe/delete/:Recipe_id',RecipeControllers.deleteRecipe);

module.exports = router;
