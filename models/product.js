const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  category:{
    type: String, 
  },
  name: {
    type: String,
    required: true,
    minlength:1,
    trim:true,
  },
  img: {
    type: String,
    required:true
  },
  price:{
    type: Number,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(1).required(),
    img: Joi.string().required(),
    category:Joi.string().required(),
    price: Joi.number().min(0).required()
  };

  return Joi.validate(product, schema);
}

exports.productSchema = productSchema;
exports.Product = Product; 
exports.validate = validateProduct;