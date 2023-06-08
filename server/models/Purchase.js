const mongoose = require('mongoose');
const Car = require('./Car');

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  car: [Car.schema]
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
