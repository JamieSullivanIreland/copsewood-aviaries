const $ = require('jquery');

let checkboxes;
let radios;
let checkboxesLS = [];
let radiosLS = [];

$(document).ready(() => {
  const URL = window.location.href;
  const SPLIT_URL = URL.split('/');

  // If on bird list page with query or on single bird page 6th character is ?
  // Initialise checkboxes and radio buttons
  // Else clear Local Storage
  if (SPLIT_URL[3][5] === '?') {
    createFilterElements();
    initCheckboxes();
    initRadios();
  }

  // Check if on birds page without query, navigated to page by navbar
  // Create empty local storage items and repopulate with default elements
  if (URL.indexOf('birds') > -1 && SPLIT_URL[3][5] !== '_') {
    createFilterElements();
    localStorage.setItem('checkboxes', JSON.stringify([]));
    localStorage.setItem('radios', JSON.stringify([]));
    checkboxesLS = createCheckboxesLS();
    radiosLS = createRadiosLS();
  }

  if (!(URL.indexOf('birds') > -1)) localStorage.clear();
});

function createFilterElements() {
  checkboxes = document.querySelectorAll("#filter-form input[type=checkbox]");
  radios = document.querySelectorAll("#filter-form input[type=radio]");

  radios.forEach(radioBtn => {
    radioBtn.addEventListener('change', handleChangeRadio);
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleChangeCheckbox);
  });
}

function initCheckboxes() {
  // Create checkboxes and change their value to match Local Storage
  checkboxesLS = createCheckboxesLS();

  checkboxes.forEach((checkbox, i) => {
    checkbox.checked = checkboxesLS[i].checked;
  });
}

function createCheckboxesLS() {
  // Check if checkboxes already exist in Local Storage
  // If there is none, then create them based on DOM elements
  let tempCheckboxes = [];
  let tempCheckboxesLS = JSON.parse(localStorage.getItem("checkboxes"));

  if (typeof tempCheckboxesLS === 'undefined' || tempCheckboxesLS.length === 0) {
    checkboxes.forEach(checkbox => {
      tempCheckboxes.push({ key: checkbox.id, checked: checkbox.checked });
    });

    localStorage.setItem('checkboxes', JSON.stringify(tempCheckboxes));
  }

  return JSON.parse(localStorage.getItem("checkboxes"));
}

function handleChangeCheckbox(e) {
  // When checkbox is clicked change Local Storage value
  let i = e.target.id.split('-')[2];
  checkboxesLS[i].checked = e.target.checked;
  localStorage.setItem('checkboxes', JSON.stringify(checkboxesLS));
}

function initRadios() {
  // Create radio buttons and  change their value to match Local Storage
  radiosLS = createRadiosLS();

  radios.forEach((radioBtn, i) => {
    radioBtn.checked = radiosLS[i].checked;
  });
}

function createRadiosLS() {
  // Check if radio buttons already exist in Local Storage
  // If there is none, then create them based on DOM elements
  let tempRadios = [];
  let tempRadiosLS = JSON.parse(localStorage.getItem("radios"));

  if (typeof tempRadiosLS === 'undefined' || tempRadiosLS.length === 0) {
    radios.forEach(radioBtn => {
      tempRadios.push({ key: radioBtn.id, checked: radioBtn.checked });
    });

    localStorage.setItem('radios', JSON.stringify(tempRadios));
  }

  return JSON.parse(localStorage.getItem("radios"));
}

function handleChangeRadio(e) {
  // When radio is clicked change Local Storage value
  let i = e.target.id.split('-')[2];

  radiosLS.forEach(radioBtn => {
    radioBtn.checked = false;
  });

  radiosLS[i].checked = e.target.checked;
  localStorage.setItem('radios', JSON.stringify(radiosLS));
}
