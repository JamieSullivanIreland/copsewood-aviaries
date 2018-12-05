const $ = require('jquery');

let checkboxes;
let radios;
let checkboxesLS = [];
let radiosLS = [];

$(document).ready(() => {
  const URL = window.location.href;
  const SPLIT_URL = URL.split('/');

  // If on bird list page initialise checkboxes and radio buttons
  // Page will always have a query, 6th character is ?
  // Else clear Local Storage
  if (SPLIT_URL[3][5] === '?') {
    initCheckboxes();
    initRadios();
  }

  if (!(URL.indexOf('birds') > -1)) localStorage.clear();
});

function initCheckboxes() {
  // Create checkboxes and  change their value to match Local Storage
  checkboxes = document.querySelectorAll("#filter-form input[type=checkbox]");
  checkboxesLS = createCheckboxesLS();

  checkboxes.forEach((checkbox, i) => {
    checkbox.addEventListener('change', handleChangeCheckbox);
    checkbox.checked = checkboxesLS[i].checked;
  });
}

function createCheckboxesLS() {
  // Check if checkboxes already exist in Local Storage
  // If there is none, then create them based on DOM elements
  let tempCheckboxes = [];

  if (!(JSON.parse(localStorage.getItem("checkboxes")))) {
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
  radios = document.querySelectorAll("#filter-form input[type=radio]");
  radiosLS = createRadiosLS();

  radios.forEach((radioBtn, i) => {
    radioBtn.addEventListener('change', handleChangeRadio);
    radioBtn.checked = radiosLS[i].checked;
  });
}

function createRadiosLS() {
  // Check if radio buttons already exist in Local Storage
  // If there is none, then create them based on DOM elements
  let tempRadios = [];

  if (!(JSON.parse(localStorage.getItem("radios")))) {
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
