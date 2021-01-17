const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  fullName: String,
  Address: String,
  Age: Number,
  phoneNumber: Number,
  Email: String,
  Password: String,
});
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;
