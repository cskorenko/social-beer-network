const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  id: String,
  userId: String,
  userFirstname: String,
  eventDate: String,
  eventTime: Number,
  eventName: String,
  eventLocation: String
});

module.exports = mongoose.model('Event', eventSchema);
