const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  userId:{
    type: String,
    required: true
  },
  company:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('products', productSchema);