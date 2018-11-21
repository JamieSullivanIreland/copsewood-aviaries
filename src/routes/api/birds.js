const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const birdModel = require('../../models/Bird');
const Bird = mongoose.model('Bird', birdModel);

// Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/birds');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

// Filter images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Init multer uploads
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// @route        GET api/birds
// @description   Get all birds
router.get('/', (req, res) => {
  Bird.find()
    .sort({breed: 1})
    .then(birds => res.status(200).send(birds))
    .catch(err => res.status(404));
});

// @route        GET api/birds/:id
// @description   Get a single bird
router.get('/:id', (req, res) => {
  Bird.findById(req.params.id)
    .then(bird => res.status(200).send(bird))
    .catch(err => res.status(404).json({success: false}));
});

// @route        POST api/birds
// @description   Create a Bird
router.post('/', upload.any('images'), (req, res) => {
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
    const newBird = new Bird({
      images: req.files,
      breed: req.body.breed,
      price: req.body.price,
      category: req.body.category
    });

    newBird.save()
      .then(bird => {
        req.flash('alert alert-success', 'Bird was Created Successfully');
        res.status(200).redirect('/birds');
      })
      .catch(err => console.log(err));
  }
});

// @router        POST api/birds/:id
// @description   Update a bird
router.post('/:id', (req, res) => {
  const updatedBird = {
    breed: req.body.breed,
    price: req.body.price,
    category: req.body.category
  };

  Bird.findByIdAndUpdate(req.params.id, updatedBird)
    .then(bird => {
      req.flash('alert alert-success', 'Bird was Updated Successfully');
      res.status(200).redirect('/admin-panel')
    })
    .catch(err => res.status(404));
});

// @route        DELETE api/birds/:id
// @description   Delete a bird
router.delete('/:id', (req, res) => {
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

      bird.remove().then(() => res.status(200).json({success: true}))
    })
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
