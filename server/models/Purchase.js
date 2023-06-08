const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car'
  }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
