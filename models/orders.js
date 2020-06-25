const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require('joi');


const orderSchema = new mongoose.Schema({
  userId:[{ type: mongoose.Schema.ObjectId, ref: "User" ,required:true}],
  customerName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  customerPhone:{
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  product:[{ type: mongoose.Schema.ObjectId, ref: "Product" }]
});



const Order = mongoose.model("Order", orderSchema);


// function validateOrder(order) {
//   const schema = {
//     userId:Joi.ObjectId().required,
//     customerName: Joi.string()
//       .min(2)
//       .max(50)
//       .required(),
   
//     customerPhone:Joi.string().min(10).max(10).required(),
//   };
//   return Joi.validate(order, schema);
// }

exports.Order = Order;
//exports.validate = validateUser;
