const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Recipe = require('../models/Recipe');
const RecipeController = require('../controllers/recipecontroller');

// const verify = require('./verifytoken'); // authorisointi eli vahvistetaan token

// Reseptien reitit

router.get('/', RecipeController.findAll);

router.get('/:id', RecipeController.findOneRecipe);

router.post('/', RecipeController.addNewRecipe);

router.delete('/:id', RecipeController.deleteRecipe);

router.put('/:id', RecipeController.updateRecipe);

module.exports = router;
