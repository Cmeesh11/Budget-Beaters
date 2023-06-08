const mongoose = require('mongoose');

const { Schema } = mongoose;

const carSchema = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  image: {
    type: Image,
    required: true
  }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;