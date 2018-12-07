const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const birdModel = require('../models/Bird');
const Bird = mongoose.model('Bird', birdModel);
const productModel = require('../models/Product');
const Product = mongoose.model('Product', productModel);
const adminModel = require('../models/Admin');
const Admin = mongoose.model('Admin', adminModel);
const filterByCategory = require('./filters/filters').filterByCategory;
const filterByPrice = require('./filters/filters').filterByPrice;
const sort = require('./filters/sort').sort;

// Access control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('alert alert-danger', 'You Must Be Logged In To Access This Page');
    res.status(401).redirect('/login');
  }
}

// Home Page
router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Home'
  });
});

// Admin Panel Page
router.get('/admin-panel', ensureAuthenticated, (req, res) => {
  Admin.find({}, (err, admins) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/admin-panel', {
        title: 'Admins',
        admins: admins
      });
    }
  });
});

// Admins Page
router.get('/admins', ensureAuthenticated, (req, res) => {
  Admin.find({}, (err, admins) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/admins', {
        title: 'Admins',
        admins: admins
      });
    }
  });
});

// About Page
router.get('/about', (req, res) => {
  res.render('pages/about', {
    title: 'About'
  });
});

// Birds Page
router.get('/birds', (req, res) => {
  let test = ['hello', 'world'];
  // {} for all results
  Bird.find({})
    // .limit(5)
    .sort({ breed: 1 })
    .then(birds => {
      if (req.query.categories) birds = filterByCategory(req.query.categories, birds);

      if (req.query.price) birds = filterByPrice(req.query.price.split(' '), birds);

      if (req.query.sortby) birds = sort(req.query.sortby.split(' '), birds);

      res.render('pages/birds', {
        title: 'Birds',
        birds: birds,
        numPages: Math.ceil(birds.length / 5),
        test: JSON.stringify(test),
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404);
    });;
});

// Products Page
router.get('/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/products', {
        title: 'Products',
        products: products
      });
    }
  });
});

// Contact Page
router.get('/contact', (req, res) => {
  res.render('pages/contact', {
    title: 'Contact'
  });
});

// Login Page
router.get('/login', (req, res) => {
  res.render('pages/login', {
    title: 'Login'
  });
});

// Render bird information page
router.get('/birds_:id', (req, res) => {
  Bird.findById(req.params.id, (err, bird) => {
    res.render('object-info/bird', {
      title: bird.breed,
      bird: bird,
      isEditing: false
    });
  });
});

// Render product information page
router.get('/products_:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render('object-info/product', {
      title: product.name,
      product: product,
      isEditing: false
    });
  });
});

// Render admin information page
router.get('/admins_:id', ensureAuthenticated, (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    res.render('object-info/admin', {
      title: admin.name,
      admin: admin,
      isEditing: false
    });
  });
});

// Edit bird page
router.get('/edit-bird_:id', ensureAuthenticated, (req, res) => {
  Bird.findById(req.params.id, (err, bird) => {
    res.render('object-info/bird', {
      title: bird.breed,
      bird: bird,
      isEditing: true
    });
  });
});

// Edit product page
router.get('/edit-product_:id', ensureAuthenticated, (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render('object-info/product', {
      title: product.name,
      product: product,
      isEditing: true
    });
  });
});

// Edit admin page
router.get('/edit-admin_:id', ensureAuthenticated, (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    res.render('object-info/admin', {
      title: admin.name,
      admin: admin,
      isEditing: true
    });
  });
});

module.exports = router;
