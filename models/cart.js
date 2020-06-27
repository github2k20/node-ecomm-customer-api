// const Joi = require('joi');
// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({

// //     userId:
// //     {
// //         type: mongoose.Schema.Types.ObjectId, 
// //         ref: 'User'
// //     },
// //     cart:[
// // {
   
//     product:
//     {
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Product'
//     },
//     quantity:
//     {
//         type:Number,
//         default: 1
//     } 
// // }   ]
// }
// )
// const Cart = mongoose.model('Cart', cartSchema);

// function validateProduct(product) {
//   const schema = {
//    quantity: Joi.number().min(1).required()
//   };

//   return Joi.validate(product, schema);
// }

// exports.cartSchema = cartSchema;
// exports.Cart = Cart; 
// exports.validate = validateProduct;