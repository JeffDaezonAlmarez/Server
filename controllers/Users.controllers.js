const Users = require('../models/users.model');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.addUser = async (req, res) => {
  try {
    const find = await Users.find({ Email: req.body.Email });

    const validationSchema = Joi.object({
      fullName: Joi.string().min(4).required(),
      Address: Joi.string().min(5).required(),
      Age: Joi.number().min(10).required(),
      phoneNumber: Joi.number().min(10).required(),
      Email: Joi.string().min(8).required().email(),
      Password: Joi.string()
        .required()
        .pattern(new RegExp('^([A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    if (find.length >= 1) {
      return res.status(403).send({ message: 'Email is already existing' });
    } else {
      const user = new Users({
        fullName: req.body.fullName,
        Address: req.body.Address,
        Age: req.body.Age,
        phoneNumber: req.body.phoneNumber,
        Email: req.body.Email,
        Password: hashedPassword,
      });

      const saveUser = await user.save();
      return res.status(200).send(saveUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const validation = Joi.object({
      Email: Joi.string().required().min(2),
      Password: Joi.string().required(),
    });

    // Request Validations
    const { error } = validation.validate(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
        statusCode: 400,
      });

    // Check if username exists
    const user = await Users.findOne({ Email: req.body.Email });
    if (!user)
      return res.status(404).send({
        message: `User not found`,
        statusCode: 404,
      });

    // Check if password valid
    const validPass = await bcrypt.compare(req.body.Password, user.Password);
    if (!validPass)
      return res.status(403).send({
        message: `Invalid email or password`,
        statusCode: 403,
      });

    // Create and assign token
    const payload = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).header('authToken', token).send({
      token: token,
      _id: user._id,
      logged_in: 'Yes',
      message: `User verified`,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const getInfo = await Users.findById(req.params._id);
    return res
      .status(200)
      .json({ message: 'User Retrived', data: getInfo, statusCode: 200 });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const User = await Users.find();
    return res
      .status(200)
      .json({ data: User, message: "Get Users", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};