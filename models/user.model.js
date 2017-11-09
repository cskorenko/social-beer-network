const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  facebook: {
    id: String,
    username: String,
    publicRepo: Number
  }
});

module.exports = mongoose.model('User', userSchema);
