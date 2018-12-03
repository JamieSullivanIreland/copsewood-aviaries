const multer = require('multer');

// Multer storage engine
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/birds');
  },
  filename: (req, file, cb) => {
    file.originalname = file.originalname.replace(' ', '-')
    cb(null, Date.now() + file.originalname);
  }
});

// Filter images
export const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Init multer uploads
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
