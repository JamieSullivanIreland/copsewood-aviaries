const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const birdModel = require('../../models/Bird');
const Bird = mongoose.model('Bird', birdModel);
const verifyToken = require('../../config/jwt').verifyToken;
const createCategoriesQuery = require('../filters/queries').createCategoriesQuery;
const createPriceQuery = require('../filters/queries').createPriceQuery;
const createSortQuery = require('../filters/queries').createSortQuery;
const createDateInfo = require('../date/date').createDateInfo;
const storage = require('../multer/images').storage;
const fileFilter = require('../multer/images').fileFilter;
const upload = require('../multer/images').upload;

// @route         GET api/birds
// @description   Get all birds
router.get('/', (req, res) => {
  let query = '';
  console.log(req.query);

  if (req.query.categories) query = createCategoriesQuery(req.query.categories);

  if (req.query.price) query += createPriceQuery(req.query.price, query);

  if (req.query.sort) {
    let split = req.query.sort.split(' ');
    query += createSortQuery(split[0], split[1], query);
  }

  Bird.find({})
    .then(birds => {
      res.status(200).redirect('/birds' + query);
    })
    .catch(err => {
      console.log(err);
      res.status(404);
    });;
});

// @route         GET api/birds/:id
// @description   Get a single bird
router.get('/:id', verifyToken, (req, res) => {
  Bird.findById(req.params.id)
    .then(bird => res.status(200).send(bird))
    .catch(err => res.status(404).json({success: false}));
});

// @route         POST api/birds
// @description   Create a Bird
router.post('/', upload.any('images'), verifyToken, (req, res) => {
  req.checkBody('breed', 'Breed is Required').notEmpty();
  req.checkBody('price', 'Price is Required').notEmpty();
  req.checkBody('category', 'Category is Required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    errors.forEach(error => {
      req.flash('alert alert-danger', error.msg);
    });
    res.status(404).redirect('/admin-panel');
  } else {
    let dateInfo = createDateInfo();

    const newBird = new Bird({
      images: req.files,
      breed: req.body.breed,
      price: req.body.price,
      category: req.body.category,
      addedBy: req.user.username,
      timestamp: dateInfo['timestamp'],
      date: dateInfo['date'],
      time: dateInfo['time']
    });

    newBird.save()
      .then(bird => {
        req.flash('alert alert-success', `${newBird.breed} Was Created Successfully`);
        res.status(200).redirect('/');
      })
      .catch(err => console.log(err));
  }
});

// @router        POST api/birds/:id
// @description   Update a bird
router.post('/:id', verifyToken, (req, res) => {
  const updatedBird = {
    breed: req.body.breed,
    price: req.body.price,
    category: req.body.category
  };

  Bird.findByIdAndUpdate(req.params.id, updatedBird)
    .then(bird => {
      req.flash('alert alert-success', `${bird.breed} Was Updated Successfully`);
      res.status(200).redirect('/birds');
    })
    .catch(err => res.status(404));
});

// @route        DELETE api/birds
// @description   Delete all birds
router.delete('/', verifyToken, (req, res) => {
  Bird.find({})
    .then(birds => {
      birds.forEach(bird => {
        bird.remove()
        .then(() => {
          req.flash('alert alert-success', `All Birds Were Deleted Successfully`);
          res.status(200).redirect('/birds');
        })
        .catch(err => {
          console.log(err);
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.json({success: false});
    });;
});

// @route        DELETE api/birds/:id
// @description   Delete a bird
router.delete('/:id', verifyToken, (req, res) => {
  let path;

  Bird.findById(req.params.id)
    .then(bird => {
      // Delete images if they exist
      if (bird.images.length > -1) {
        for (let i = 0; i < bird.images.length; ++i) {
          // Assign image path
          path = bird.images[i].path;

          if (fs.existsSync(path)) {
            fs.unlink(path, (err) => {
              if (err) console.log(err);
            });
          }
        }
      }

      bird.remove().then(() => {
        req.flash('alert alert-success', `${bird.breed} Was Deleted Successfully`);
        res.status(200).redirect('/birds');
      })
    })
  .catch(err => {
    console.log(err);
    res.status(404).json({success: false});
  });
});

module.exports = router;
