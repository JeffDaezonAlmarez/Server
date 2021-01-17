const Recommend = require('../models/recommendations.model');
const Joi = require('joi');

exports.addRecommend = async (req, res) => {
  try {
    const validationSchema = Joi.object({
      recipeName: Joi.string().required(),
      rate: Joi.number().min(1).max(5).required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const recommendations = new Recommend({
      recipeName: req.body.recipeName,
      rate: req.body.rate,
    });
    const saverecommendations = await recommendations.save();

    return res.status(200).send(saverecommendations);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.createRecommend = async (req, res) => {
  try {
    // const validationSchema = Joi.object({
    //   recipeName: Joi.string().required(),
    //   rate: Joi.number().min(1).max(5).required(),
    // });
    // const { error } = validationSchema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const recommendations = new Recommend({
      label: req.body.label,
      image: req.body.image,
      rate: req.body.rate,
      ingredientLines: req.body.ingredientLines,
    });
    const saverecommendations = await recommendations.save();

    return res.status(200).send(saverecommendations);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
