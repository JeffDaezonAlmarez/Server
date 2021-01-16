const Recipe = require('../models/recipe.model');
const Joi = require('joi');

exports.addRecipe = async (req, res) => {
  try {
    const find = await Recipe.find({ recipeName: req.body.recipeName });
    const validationSchema = Joi.object({
      recipeName: Joi.string().required(),
      ingredients: Joi.string().required(),
      image: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if (find.length >= 1) {
      return res.status(403).send({ message: 'Recipe is already existing' });
    } else {
      const recipe = new Recipe({
        recipeName: req.body.recipeName,
        ingredients: req.body.ingredients,
        image: req.body.image,
      });
      const saverecipe = await recipe.save();
      return res.status(200).send(saverecipe);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const updateRecipe = await Recipe.updateMany(
      { _id: req.params.Recipe_id },
      {
        recipeName: req.body.recipeName,
        ingredients: req.body.ingredients,
        image: req.body.image,
      }
    );
    return res
      .status(200)
      .json({ data: updateRecipe, message: 'Recipe Updated', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const removeRecipe = await Recipe.remove({ _id: req.params.Recipe_id });
    return res
      .status(200)
      .json({ data: removeRecipe, message: 'Recipe Removed', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const Recipes = await Recipe.find();
    return res
      .status(200)
      .json({ data: Recipes, message: "Get Recipes", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
