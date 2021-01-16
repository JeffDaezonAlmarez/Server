const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const UserRoute = require('./routes/User.routes');
const RecipeRoute = require('./routes/Recipe.routes');

const app = express();
const dbURI = process.env.dbURI;
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Middlewares
app.use('/api', UserRoute);
app.use('/api', RecipeRoute);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(dbURI, options).then((res) => {
  console.log('Connected to', res.connections[0].name);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
