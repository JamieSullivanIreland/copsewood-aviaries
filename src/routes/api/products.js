const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require('../../models/Product');
const Product = mongoose.model('Product', productModel);

// @router        GET api/products
// @description   Get all products
router.get('/', (req, res) => {
  Product.find()
    .sort({price: 1})
    .then(products => res.status(200))
    .catch(err => res.status(404));
});

// @router        GET api/products/:id
// @description   Get a single product
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.status(200))
    .catch(err => res.status(404).json({success: false}));
});

// @router        POST api/products
// @description   Create a Product
router.post('/', (req, res) => {
  req.checkBody('name', 'Name is Required').notEmpty();
  req.checkBody('price', 'Price is Required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    errors.forEach(error => {
      req.flash('alert alert-danger', error.msg);
    });
    res.status(404).redirect('/admin-panel');
  } else {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price
    });

    newProduct.save()
      .then(product => {
        req.flash('alert alert-success', 'New Product was Created Successfully');
        res.status(200).redirect('/admin-panel');
      })
      .catch(err => res.status(404).json({success: false}));
  }
});

// @router        POST api/products/:id
// @description   Update a product
router.post('/:id', (req, res) => {
  const updatedProduct = {
    name: req.body.name,
    price: req.body.price
  };

  Product.findByIdAndUpdate(req.params.id, updatedProduct)
    .then(product => {
      req.flash('alert alert-success', 'Product was Updated Successfully');
      res.status(200).redirect('/admin-panel');
    })
    .catch(err => res.status(404));
});

// @router        DELETE api/products/:id
// @description   Delete a product
router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.status(200).json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
