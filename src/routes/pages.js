const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Models
const birdModel = require('../models/Bird');
const Bird = mongoose.model('Bird', birdModel);
const productModel = require('../models/Product');
const Product = mongoose.model('Product', productModel);
const adminModel = require('../models/Admin');
const Admin = mongoose.model('Admin', adminModel);

// Verify JWT
function verifyToken(req, res, next) {
  if (req.cookies['jwt']) {
    // Set the Token
    req.token = req.cookies['jwt'];
    // Next Middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

// Access control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('alert alert-danger', 'Please Login');
    res.redirect('/login');
  }
}

// Home Page
router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Home'
  });
});

// Admin Panel Page
router.get('/admin-panel', (req, res) => {
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
router.get('/admins', verifyToken, (req, res) => {
  // console.log(req.headers);
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
  // {} for all results
  Bird.find({}, (err, birds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/birds', {
        title: 'Birds',
        birds: birds
      });
    }
  });
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
router.get('/admins_:id', (req, res) => {
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
