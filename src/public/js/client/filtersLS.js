let checkboxes;
let radios;
let checkboxesLS = [];
let radiosLS = [];

window.onload = () => {
  const URL = window.location.href;
  const SPLIT_URL = URL.split('/');

  // If on bird list page initialise checkboxes and radio buttons
  // Else clear LS of checkboxes and radio buttons
  if (URL.indexOf("/birds") > -1 && (SPLIT_URL[3].length === 5 || SPLIT_URL[3][5] === '?')) {
    initCheckboxes();
    initRadios();
  } else {
    localStorage.clear();
  }
}

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
  // If not, then create them based on DOM elements
  let tempCheckboxes = [];

  if (JSON.parse(localStorage.getItem("checkboxes"))) {
    tempCheckboxes = JSON.parse(localStorage.getItem("checkboxes"));
  } else {
    checkboxes.forEach(checkbox => {
      tempCheckboxes.push({ key: checkbox.id, checked: checkbox.checked });
    });

    localStorage.setItem('checkboxes', JSON.stringify(tempCheckboxes));
    tempCheckboxes = JSON.parse(localStorage.getItem("checkboxes"));
  }

  return tempCheckboxes;
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
  // If not, then create them based on DOM elements
  let tempRadios = [];

  if (JSON.parse(localStorage.getItem("radios"))) {
    tempRadios = JSON.parse(localStorage.getItem("radios"));
  } else {
    radios.forEach(radioBtn => {
      tempRadios.push({ key: radioBtn.id, checked: radioBtn.checked });
    });

    localStorage.setItem('radios', JSON.stringify(tempRadios));
    tempRadios = JSON.parse(localStorage.getItem("radios"));
  }

  return tempRadios;
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
