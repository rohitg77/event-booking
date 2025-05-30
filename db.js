const mongoose = require('mongoose');


const connectDB = async () => {
    
  try {

    await mongoose.connect('mongodb://127.0.0.1:27017/event-booking');
    console.log('MongoDB Connected');
  } catch (err) {

    console.error('DB Connection Failed:', err.message);
     
  }
};

module.exports = connectDB;
