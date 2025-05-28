const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,

  description: String,

  dateTime: Date,

  location: String,

  totalSeats: Number,

  availableSeats: Number,
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Event', eventSchema);
