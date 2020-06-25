const { Product, validate } = require("./../models/product");
const { Category } = require("./../models/category");
const auth = require("./../middleware/auth");
//const admin = require("../middleware/admin");
const validateObjectId = require("./../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find()
    .select("-__v")
    .sort("name");
  res.send(products);
});


router.get("/category/:id", async (req, res) => {
  const products = await Product.find({category:req.params.id})
    .select("-__v")
    .sort("name");
  res.send(products);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product({
    category:req.body.category,
    name: req.body.name,
    img: req.body.img,
    price: req.body.price,
  });
  await product.save();

  res.send(product);
});

router.patch("/:id", [auth,validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
    category:req.body.category,
    name: req.body.name,
    img: req.body.img,
    price: req.body.price,
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.delete("/:id", [auth,validateObjectId], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const product = await Product.findById(req.params.id).select("-__v");

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;
