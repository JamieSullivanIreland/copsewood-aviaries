const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const adminModel = require('../../models/Admin');
const Admin = mongoose.model('Admin', adminModel);

// FORMAT OF Token
// Authorization: Bearer <accesss_token>
// JSON Web Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the Token
    req.token = bearerToken;
    // Next Middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

router.get('/jwt', (req, res) => {
  // Mock User - we authenticate user - skips to getting user back
  const user = {
    id: 1,
    username: 'Jamie'
  }

  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({
      token
    })
  });
});

// Login Admin Process
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin-panel',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, createToken(req));
});

function createToken(req) {
  const user = {
    username: req.body.username,
    password: req.body.password
  }

  jwt.sign({ user }, 'secretkey', (err, token) => {
    console.log(token);
  });
}

// logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('alert alert-success', 'You are now logged out');
  res.redirect('/login');
});

// Register Admin Process
router.post('/register', (req, res) => {
  req.checkBody('username', 'Name is Required').notEmpty();
  req.checkBody('password', 'Password is Required').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    errors.forEach(error => {
      req.flash('alert alert-danger', error.msg);
    });
    res.status(404).redirect('/admin-panel');
  } else {
    let newAdmin = new Admin({
      username: req.body.username,
      password: req.body.password,
      addedBy: req.user.username
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          newAdmin.password = hash;
          newAdmin.save()
            .then(admin => {
              req.flash('alert alert-success', 'New Admin was Registered Successfully');
              res.status(200).redirect('/admin-panel');
            })
            .catch(err => {
              console.log(err);
              res.status(404).json({success: false})
            });
        }
      });
    });
  }
});

// Update Admin Process
router.post('/register/:id', (req, res) => {
  req.checkBody('username', 'Name is Required').notEmpty();
  req.checkBody('password', 'Password is Required').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    errors.forEach(error => {
      req.flash('alert alert-danger', error.msg);
    });
    res.status(404).redirect('back');
  } else {
    const updatedAdmin = {
      username: req.body.username,
      password: req.body.password,
      updatedBy: req.user.username
    };

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(updatedAdmin.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          updatedAdmin.password = hash;
          Admin.findByIdAndUpdate(req.params.id, updatedAdmin)
            .then(admin => {
              req.flash('alert alert-success', 'Admin was Updated Successfully');
              res.status(200).redirect('/admin-panel');
            })
            .catch(err => {
              console.log(err);
              res.status(404);
            });
        }
      });
    });
  }
});

// @router        GET api/admins
// @description   Get all admins
router.get('/', verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Admin.find()
        .sort({name: 1})
        .then(admins => res.status(200).json(admins))
        .catch(err => res.status(404));
    }
  });


});

// @router        GET api/admins/:id
// @description   Get a single admin
router.get('/:id', (req, res) => {
  Admin.findById(req.params.id)
    .then(admin => res.status(200).json(admin))
    .catch(err => res.status(404).json({success: false}));
});

// @router        DELETE api/admins/:id
// @description   Delete an admin
router.delete('/:id', (req, res) => {
  Admin.findById(req.params.id)
    .then(admin => admin.remove().then(() => res.status(200).json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
