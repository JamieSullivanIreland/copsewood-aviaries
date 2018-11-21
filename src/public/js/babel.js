'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
  (0, _jquery2.default)('.delete-bird').on('click', function (e) {
    var $target = (0, _jquery2.default)(e.target);
    var id = $target.attr('id');
    _jquery2.default.ajax({
      type: 'DELETE',
      url: '/api/birds/' + id,
      success: function success(res) {
        window.location.href = '/birds';
      },
      error: function error(err) {
        console.log(err);
      }
    });
  });
});

(0, _jquery2.default)(document).ready(function () {
  (0, _jquery2.default)('.delete-product').on('click', function (e) {
    var $target = (0, _jquery2.default)(e.target);
    var id = $target.attr('id');
    _jquery2.default.ajax({
      type: 'DELETE',
      url: '/api/products/' + id,
      success: function success(res) {
        window.location.href = '/products';
      },
      error: function error(err) {
        console.log(err);
      }
    });
  });
});

(0, _jquery2.default)(document).ready(function () {
  (0, _jquery2.default)('.delete-admin').on('click', function (e) {
    var $target = (0, _jquery2.default)(e.target);
    var id = $target.attr('id');
    _jquery2.default.ajax({
      type: 'DELETE',
      url: '/api/admins/' + id,
      success: function success(res) {
        window.location.href = '/admins';
      },
      error: function error(err) {
        console.log(err);
      }
    });
  });
});
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Elements
var dropArea = void 0;
var inputLabel = void 0;
var imageInput = void 0;
var birdForm = void 0;
var uploadPlaceholder = void 0;
var submitBirdButton = void 0;

// Variables and Data
var imagesToSubmit = [];

// Check if admin-panel was loaded
(0, _jquery2.default)(document).ready(function () {
  if (window.location.href.indexOf("admin-panel") > -1) init();
});

// Initialise elements and event listeners
function init() {
  dropArea = document.querySelector('#dropArea');
  inputLabel = document.querySelector('#image-input-label');
  imageInput = document.querySelector('#image-input');
  birdForm = document.querySelector('#bird-form');
  uploadPlaceholder = document.querySelector('#image-upload');
  submitBirdButton = document.querySelector('#submit-bird');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(function (eventName) {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(function (eventName) {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  dropArea.addEventListener('drop', handleDrop, false);
  birdForm.addEventListener('submit', handleSubmit, false);
  imageInput.addEventListener('change', handleChange, false);
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

//  Highlight upload svg
function highlight(e) {
  uploadPlaceholder.classList.remove('unhighlight-upload');
  uploadPlaceholder.classList.add('highlight-upload');
  dropArea.style.backgroundColor = 'grey';
}

//  Unhighlight upload svg
function unhighlight(e) {
  uploadPlaceholder.classList.remove('highlight-upload');
  uploadPlaceholder.classList.add('unhighlight-upload');
  dropArea.style.backgroundColor = 'white';
}

// Get files when user selects from input
function handleChange(e) {
  preventDefaults(e);

  var files = imageInput.files;
  var filesArr = Array.from(files);

  for (var i = 0; i < filesArr.length; ++i) {
    // Check if image limit was reached
    if (limitIsReached()) {
      createErrorMessage('Limit of 4 Files!');
      break;
    }

    // Check file type
    if (!fileIsImage(filesArr[i])) {
      createErrorMessage('File Must be an Image!');
      break;
    }

    // Add images for submission
    imagesToSubmit.push(filesArr[i]);

    // Load images into DOM
    readAndPreview(filesArr[i]);
  }
}

// Get files when user selects drags and drops files
function handleDrop(e) {
  preventDefaults(e);

  var files = e.dataTransfer.files;
  var filesArr = Array.from(files);

  for (var i = 0; i < filesArr.length; ++i) {
    // Check if image limit was reached
    if (limitIsReached()) {
      createErrorMessage('Limit of 4 Files!');
      break;
    }

    // Check file type
    if (!fileIsImage(filesArr[i])) {
      createErrorMessage('File Must be an Image!');
      break;
    }

    // Add images for submission
    imagesToSubmit.push(filesArr[i]);

    // Load images into DOM
    readAndPreview(filesArr[i]);
  }
}

// Create formData and send for submission to server
function handleSubmit(e) {
  preventDefaults(e);

  // Create form data and remove inital images
  var formData = new FormData(birdForm);
  if (formData.get('images')) formData.delete('images');

  // Re-populate with images from the drop area
  for (var i = 0; i < imagesToSubmit.length; ++i) {
    formData.append('images', imagesToSubmit[i]);
  }

  sendData(formData);
}

// Remove any loaded files from DOM and array
function removeImage(e) {
  preventDefaults(e);

  // Get the div containing the image and the image's id
  var parent = e.target.parentElement;
  var selectedImageID = Number(e.target.parentElement.children[0].id);

  // Search for image that matches the image selected for removal
  imagesToSubmit.forEach(function (image, i) {
    if (image.id === selectedImageID) imagesToSubmit.splice(i, 1);
  });

  // Remove the div that contains the image and update input label
  parent.remove();
  changeInputLabel();
}

function changeInputLabel() {
  if (imagesToSubmit.length === 0) {
    inputLabel.innerHTML = 'Choose Image';
    uploadPlaceholder.style.display = 'block';
  } else if (imagesToSubmit.length === 1) {
    inputLabel.innerHTML = imagesToSubmit.length + ' Image Added';
  } else {
    inputLabel.innerHTML = imagesToSubmit.length + ' Images Added';
  }
}

function limitIsReached() {
  return imagesToSubmit.length === 4 ? true : false;
}

function fileIsImage(file) {
  return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' ? true : false;
}

function createErrorMessage(message) {
  var div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.innerHTML = message;
  birdForm.insertBefore(div, birdForm.childNodes[0]);

  setTimeout(function () {
    +div.remove();
  }, 2000);
}

// Create image div and load into the DOM
function readAndPreview(file) {
  var img = void 0;
  var reader = new FileReader();
  var div = document.createElement('div');
  var br = document.createElement("br");
  var removeButton = document.createElement('button');

  changeInputLabel();
  uploadPlaceholder.style.display = 'none';
  removeButton.innerHTML = 'X';
  removeButton.addEventListener('click', removeImage);

  // Set id of each image with the current timestamp
  // Will check this id when the remove button is clicked
  Object.defineProperty(file, 'id', {
    value: Date.now(),
    writable: true
  });

  // Set properties and create a div for each image that was loaded
  reader.addEventListener("load", function () {
    img = new Image(100, 100);
    img.className = 'output-image';
    img.src = reader.result;
    img.id = file.id;
    div.appendChild(img);
    div.appendChild(br);
    div.appendChild(removeButton);
    dropArea.appendChild(div);
  }, false);

  reader.readAsDataURL(file);
}

// POST data to server
function sendData(formData) {
  // console.log('\n\n\n\n\n\n');
  // for (let pair of formData.entries()) {
  //   console.log(pair);
  // }

  var XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener('load', function (e) {
    document.location.href = '/admin-panel';
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function (e) {
    console.log(e);
  });

  // Set up our request
  XHR.open('POST', '/api/birds');

  // Send our FormData object; HTTP headers are set automatically
  XHR.send(formData);
}
"use strict";

var messages = document.querySelector('#messages');

if (messages) {
  setTimeout(function () {
    messages.style.display = "none";
  }, 3000);
}
