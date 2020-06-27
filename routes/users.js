const auth = require("./../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("./../models/user");
const { Cart} = require("./../models/cart");
const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").populate('cart');
  res.send(user);
});


router.get("/cart", auth, async (req, res) => {
  const user =await User.findById(req.user._id).populate('cart.product',"-__v");

  if(user.cart.length)
  res.send(user.cart);

  else
  res.status(400).send('Cart is empty')
});

router.get("/orders", auth, async (req, res) => {
  const user =await User.findById(req.user._id).populate('orders.product','-__v');

  if(user.orders.length)
  res.send(user.orders);

  else
  res.status(400).send('No orders yet')
});


//register new user
router.post("/", async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phone: req.body.phone });
  if (user) return res.status(400).send("User already registered.");

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "phone","location"]));
});


//add products to cart
router.post("/cart/:id",[auth], async (req, res) => {

  var sig=0;
  let user=await User.findById(req.params.id);
  if(user.cart.length)
  user.cart.forEach(async (element)  => {
    if(element.product==req.body.id)
    {
      sig=1;
      element.quantity+=1;
      await user.save();
      return;
    }
  });

  if(sig)
  return res.send(user.cart);
  user.cart = user.cart.concat([ { product:req.body.id,quantity:1 } ]);
  await user.save();  

  res.send(user.cart);
});


//add products to all orders
router.post("/orders",[auth], async (req, res) => {
  let user=await User.findById(req.user._id);
  if(user.cart.length==0)
  return res.status(400).send('Cart is empty');

  user.cart.forEach((element)=>{
    user.orders=user.orders.concat([{product:element.product,quantity:element.quantity}])
  })

  await user.save();  
  res.send(user.orders);
});


//update status of product in all orders
router.patch("/orders/:id",[auth], async (req, res) => {
  let user=await User.findById(req.user._id);
  if(user.orders.length==0)
  return res.status(400).send('No orders till now');

  user.orders.forEach((element)=>{
    if(element.completed==false && element.product==req.params.id)
    {
      element.completed=true;
      return;
    }
    })

  await user.save();  
  res.send(user.orders);
});

//delete product from cart
router.delete("/cart/:id",[auth], async (req, res) => {

  var sig=0;
  let user=await User.findById(req.user._id);
  if(user.cart.length)
 { user.cart.forEach(async (element)  => {
    if(element.product==req.params.id)
    {
      sig=1;
      if(element.quantity>1)
      element.quantity-=1;

      else
      {
        element.quantity=0;
        user.cart.splice(user.cart.indexOf(element), 1)
      }
      await user.save();
      return res.send(user.cart);
    }
  });


  if(!sig)
  return res.status(400).send('Product with the given Id could not be found in the cart');
}
 
  else
  res.status(400).send('Cart is empty');
});

//Empty the cart
router.delete("/cart/empty", auth, async (req, res) => {
  let user=await User.findById(req.user._id);
  user.cart.splice(0, user.cart.length)
  await user.save()
  res.send(user.cart)
});

module.exports = router;
